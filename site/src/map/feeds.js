// Feeds for the front-page activity map.
//
// Both feeds give the map the same thing, shaped like the anonymous public
// projection (draft):
//
//   catalogue: [{public_node_id, name, type, location: {lat, lon}, last_heard}]
//   observation: {event_id, kind, public_node_id, occurred_at, expires_at,
//                 activity_class, links: [{ref, lat, lon}]}
//   revocation: a public_node_id to remove at once
//
// and report the stream's state as "live", "reconnecting" or "offline".
// The map never learns which feed it is drawing.
//
// `fixtureFeed` is synthetic, served with the page, and is what every build
// uses today. `pollFeed` (polled events) and `streamFeed` (server-sent
// events) read the public feed on the same origin; nothing selects either
// until the feed exists and its use on the live page is approved.

const HERE = new URL(".", import.meta.url);
const PULSE_MS = 15000;
const CATALOGUE_REFRESH_MS = 15 * 60 * 1000;
const HEARTBEAT_DEAD_MS = 50000;

async function fetchJSON(url) {
  const response = await fetch(url, { credentials: "omit", cache: "no-store" });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}

function finite(n) {
  return typeof n === "number" && Number.isFinite(n);
}

// Keeps only well-formed nodes with coordinates; anything else is dropped,
// never guessed at.
export function cleanCatalogue(doc) {
  const nodes = Array.isArray(doc?.nodes) ? doc.nodes : [];
  return nodes.filter(
    (n) =>
      n &&
      typeof n.public_node_id === "string" &&
      n.public_node_id.length > 0 &&
      finite(n.location?.lat) &&
      finite(n.location?.lon),
  );
}

export function cleanObservation(e) {
  if (!e || typeof e.event_id !== "string" || typeof e.public_node_id !== "string") return null;
  if (typeof e.expires_at !== "string") return null;
  const links = (Array.isArray(e.links) ? e.links : []).filter(
    (l) => l && typeof l.ref === "string" && l.ref.length > 0 && finite(l.lat) && finite(l.lon),
  );
  return { ...e, links };
}

function visibility(start, stop) {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start(true);
  });
}

// A synthetic feed. Fixture times are shifted so that its `as_of` is now.
// Each event has up to three lines to nearby radios that "heard" it; a pair
// keeps its line reference for the length of a pulse, as the public feed
// does. Now and then it repeats an event id and sends an already expired
// event, so deduplication and the no-replay rule are exercised, not only
// described.
export function fixtureFeed({ onStatus, onCatalogue, onObservation }) {
  let timer = null;
  let n = 0;
  let seed = 22;
  const random = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  let nodes = [];
  let last = null;
  const pairRefs = new Map();

  function nearby(node) {
    const { lat, lon } = node.location;
    return nodes.filter((o) => {
      if (o === node) return false;
      const dLat = o.location.lat - lat;
      const dLon = (o.location.lon - lon) * Math.cos((lat * Math.PI) / 180);
      return Math.hypot(dLat, dLon) < 1.3; // about 140 km
    });
  }

  function emit() {
    const now = Date.now();
    const node = nodes[Math.floor(random() * nodes.length)];
    const near = nearby(node);
    const links = [];
    const count = Math.min(near.length, Math.floor(random() * 4));
    for (let i = 0; i < count; i += 1) {
      const observer = near[Math.floor(random() * near.length)];
      const pair = `${node.public_node_id}>${observer.public_node_id}`;
      let held = pairRefs.get(pair);
      if (!held || held.until <= now) {
        held = { ref: `demo-l${(++n).toString(36)}`, until: now + PULSE_MS };
        pairRefs.set(pair, held);
      } else held.until = now + PULSE_MS;
      if (!links.some((l) => l.ref === held.ref)) {
        links.push({ ref: held.ref, lat: observer.location.lat, lon: observer.location.lon });
      }
    }
    for (const [pair, held] of pairRefs) if (held.until <= now) pairRefs.delete(pair);

    let event = {
      event_id: `demo-e${++n}`,
      kind: "transmission",
      public_node_id: node.public_node_id,
      occurred_at: new Date(now).toISOString(),
      expires_at: new Date(now + PULSE_MS).toISOString(),
      activity_class: random() < 0.3 ? "advert" : "packet",
      links,
    };
    // Fixed points in the sequence, so every few seconds of the demonstration
    // exercise both rules whatever the random draws were.
    if (last && n % 7 === 0) event = last; // duplicate delivery
    else if (n % 11 === 0) event = { ...event, expires_at: new Date(now - 1000).toISOString() }; // stale
    last = event;
    onObservation(event);
    timer = window.setTimeout(emit, 600 + random() * 1800);
  }

  function start(resumed) {
    if (timer !== null) return;
    if (resumed) {
      onStatus("reconnecting");
      timer = window.setTimeout(() => {
        onStatus("live");
        emit();
      }, 800);
    } else {
      onStatus("live");
      emit();
    }
  }
  function stop() {
    window.clearTimeout(timer);
    timer = null;
    onStatus("offline");
  }

  return {
    label: "Demonstration, synthetic data",
    async open() {
      const doc = await fetchJSON(new URL("fixtures/nodes.json", HERE));
      const shift = Date.now() - Date.parse(doc.as_of);
      nodes = cleanCatalogue(doc).map((node) => ({
        ...node,
        last_heard: new Date(Date.parse(node.last_heard) + shift).toISOString(),
      }));
      onCatalogue(nodes);
      visibility(start, stop);
      if (!document.hidden) start(false);
      else onStatus("offline");
    },
  };
}

// The public feed as a stream: `<base>nodes` (JSON) and `<base>events`
// (server-sent events: observation, heartbeat, resync_required,
// node_revoked).
//
// - The catalogue is fetched at start and again at least every 15 minutes;
//   a node missing from a fresh catalogue is removed like a revoked one.
// - 50 seconds without a heartbeat or any event is a dead stream: it is
//   closed and reopened.
// - `resync_required`, or a stream the server refuses (for example HTTP 410
//   for an expired cursor), refetches the catalogue and reopens the stream
//   with no cursor.
// - While the page is hidden the stream is closed and the map is offline.
// - A failing stream is retried with a growing delay, up to a minute; after
//   three failures in a row the map says offline while it keeps trying.
export function streamFeed(base, { onStatus, onCatalogue, onObservation, onRevoked }) {
  const root = new URL(base, window.location.href);
  if (root.origin !== window.location.origin) throw new Error("the live feed must be same-origin");
  let source = null;
  let watchdog = null;
  let retry = null;
  let refresh = null;
  let failures = 0;
  let wanted = false;

  async function catalogue() {
    onCatalogue(cleanCatalogue(await fetchJSON(new URL("nodes", root))));
  }

  function close() {
    window.clearTimeout(watchdog);
    watchdog = null;
    if (source) source.close();
    source = null;
  }

  function alive() {
    window.clearTimeout(watchdog);
    watchdog = window.setTimeout(() => restart(false), HEARTBEAT_DEAD_MS);
  }

  function json(message) {
    try {
      return JSON.parse(message.data);
    } catch {
      return null;
    }
  }

  function open() {
    close();
    if (!wanted) return;
    source = new EventSource(new URL("events", root), { withCredentials: false });
    alive();
    source.onopen = () => {
      failures = 0;
      onStatus("live");
      alive();
    };
    source.addEventListener("heartbeat", alive);
    source.addEventListener("observation", (message) => {
      alive();
      const event = cleanObservation(json(message));
      if (event) onObservation(event);
    });
    source.addEventListener("node_revoked", (message) => {
      alive();
      const body = json(message);
      if (typeof body?.public_node_id === "string") onRevoked(body.public_node_id);
    });
    source.addEventListener("resync_required", () => restart(true));
    source.onerror = () => {
      if (!source) return;
      // CONNECTING: the browser retries by itself, keeping its cursor.
      // CLOSED: the server refused the stream; start again with no cursor.
      if (source.readyState === EventSource.CLOSED) restart(true);
      else onStatus("reconnecting");
    };
  }

  function restart(resync) {
    close();
    if (!wanted) return;
    failures += 1;
    onStatus(failures >= 3 ? "offline" : "reconnecting");
    const delay = Math.min(60000, 1000 * 2 ** Math.min(failures - 1, 6));
    window.clearTimeout(retry);
    retry = window.setTimeout(async () => {
      if (resync) {
        try {
          await catalogue();
        } catch {
          return restart(true);
        }
      }
      open();
    }, delay);
  }

  function start(resumed) {
    if (wanted) return;
    wanted = true;
    failures = 0;
    if (resumed) {
      onStatus("reconnecting");
      catalogue().then(open, () => restart(true));
    } else open();
  }
  function stop() {
    wanted = false;
    window.clearTimeout(retry);
    close();
    onStatus("offline");
  }

  return {
    label: "Live",
    async open() {
      await catalogue();
      refresh = window.setInterval(() => {
        if (wanted) catalogue().catch(() => {});
      }, CATALOGUE_REFRESH_MS);
      visibility(start, stop);
      if (!document.hidden) start(false);
      else onStatus("offline");
    },
  };
}

// The public feed, polled: `<base>nodes` (JSON) and
// `<base>events?since=<cursor>`, which answers
// {cursor, events: [observation | {kind: "node_revoked", public_node_id}],
//  poll_after_ms?}.
//
// - The first poll, and the first after a resync, has no cursor. Only events
//   whose expiry is still ahead are drawn (the map checks), so nothing old is
//   replayed.
// - Each batch is spread over the next poll interval in the order the events
//   happened, so a batch does not flash all at once; an event is never drawn
//   later than its own expiry.
// - HTTP 410 (an expired or unknown cursor) refetches the catalogue and polls
//   again with no cursor. 429 and 503 honour Retry-After. Other failures back
//   off, growing to a minute; after three in a row the map says offline while
//   it keeps trying. A poll that takes over 20 seconds is abandoned.
// - The catalogue is refetched at least every 15 minutes; a node missing from
//   it is removed like a revoked one.
// - While the page is hidden, polling stops and the map is offline.
export function pollFeed(base, { onStatus, onCatalogue, onObservation, onRevoked }) {
  const root = new URL(base, window.location.href);
  if (root.origin !== window.location.origin) throw new Error("the live feed must be same-origin");
  let cursor = null;
  let wanted = false;
  let timer = null;
  let generation = 0;
  let failures = 0;
  let interval = 5000;
  let lastCatalogue = 0;
  const staged = new Set();

  async function catalogue() {
    onCatalogue(cleanCatalogue(await fetchJSON(new URL("nodes", root))));
    lastCatalogue = Date.now();
  }

  function unstage() {
    for (const t of staged) window.clearTimeout(t);
    staged.clear();
  }

  function deliver(items, spread) {
    const events = [];
    for (const item of items) {
      if (item?.kind === "node_revoked") {
        if (typeof item.public_node_id === "string") onRevoked(item.public_node_id);
        continue;
      }
      const event = cleanObservation(item);
      if (event) events.push(event);
    }
    events.sort((a, b) => (Date.parse(a.occurred_at) || 0) - (Date.parse(b.occurred_at) || 0));
    const first = Date.parse(events[0]?.occurred_at) || 0;
    for (const event of events) {
      const offset = Math.max(0, (Date.parse(event.occurred_at) || first) - first);
      const room = Date.parse(event.expires_at) - Date.now() - 1000;
      const delay = Math.min(offset, spread, Math.max(0, room));
      if (delay <= 0) onObservation(event);
      else {
        const t = window.setTimeout(() => {
          staged.delete(t);
          onObservation(event);
        }, delay);
        staged.add(t);
      }
    }
  }

  function schedule(ms, mine) {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => poll(mine), ms);
  }

  function failed(mine, retryAfterMs) {
    if (mine !== generation) return;
    failures += 1;
    onStatus(failures >= 3 ? "offline" : "reconnecting");
    const backoff = Math.min(60000, 1000 * 2 ** Math.min(failures - 1, 6));
    schedule(Math.max(backoff, retryAfterMs || 0), mine);
  }

  async function poll(mine) {
    if (!wanted || mine !== generation) return;
    const url = new URL("events", root);
    if (cursor) url.searchParams.set("since", cursor);
    const abort = new AbortController();
    const guard = window.setTimeout(() => abort.abort(), 20000);
    let response;
    try {
      response = await fetch(url, { credentials: "omit", cache: "no-store", signal: abort.signal });
    } catch {
      window.clearTimeout(guard);
      return failed(mine);
    }
    window.clearTimeout(guard);
    if (mine !== generation) return;
    if (response.status === 410) {
      cursor = null;
      try {
        await catalogue();
      } catch {
        return failed(mine);
      }
      return schedule(0, mine);
    }
    if (!response.ok) {
      const seconds = Number(response.headers.get("retry-after"));
      return failed(mine, Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : 0);
    }
    let body;
    try {
      body = await response.json();
    } catch {
      return failed(mine);
    }
    if (mine !== generation) return;
    if (typeof body?.cursor !== "string" || !Array.isArray(body.events)) return failed(mine);
    cursor = body.cursor;
    failures = 0;
    const hint = Number(body.poll_after_ms);
    interval = Number.isFinite(hint) && hint > 0 ? Math.min(60000, Math.max(2000, hint)) : 5000;
    onStatus("live");
    deliver(body.events, interval);
    if (Date.now() - lastCatalogue > CATALOGUE_REFRESH_MS) catalogue().catch(() => {});
    schedule(interval, mine);
  }

  function start(resumed) {
    if (wanted) return;
    wanted = true;
    failures = 0;
    cursor = null;
    const mine = ++generation;
    if (resumed) {
      onStatus("reconnecting");
      catalogue().then(() => poll(mine), () => failed(mine));
    } else poll(mine);
  }
  function stop() {
    wanted = false;
    generation += 1;
    window.clearTimeout(timer);
    unstage();
    onStatus("offline");
  }

  return {
    label: "Live",
    async open() {
      await catalogue();
      visibility(start, stop);
      if (!document.hidden) start(false);
      else onStatus("offline");
    },
  };
}
