// Front-page activity map, in demonstration mode.
//
// Draws the public nodes of the anonymous observation projection and a
// short violet pulse each time one is heard. Until the public feed exists
// and its cutover is approved, the data comes from synthetic fixtures
// served with the page: no network request leaves this origin, and the
// map is labelled as a demonstration. The feed is behind `fixtureFeed`,
// so a live adapter can replace it without touching the drawing code.
//
// Rules carried from the approved specification:
// - only nodes with an approved location are drawn; unlocated nodes are
//   absent, not counted and not listed;
// - every node is the same turquoise dot, with no clustering or filters;
// - a pulse lasts 15 seconds, is refreshed by later activity, and is
//   never drawn for an event that has already expired (no replay);
// - events are deduplicated by event id;
// - when the feed is not live, every pulse is cleared;
// - with reduced motion, a pulse is a stationary highlight with the same
//   expiry.

const L = window.L;
const HERE = new URL(".", import.meta.url);
const PULSE_MS = 15000;
const SEEN_LIMIT = 2000;

const root = document.getElementById("live-map");
const statusEl = document.getElementById("map-status");

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initialView() {
  // Phones open closer on Denmark; wider screens include southern Sweden.
  return window.matchMedia("(max-width: 600px)").matches
    ? { center: [56.1, 10.6], zoom: 6 }
    : { center: [56.3, 12.0], zoom: 7 };
}

async function fetchJSON(rel) {
  const response = await fetch(new URL(rel, HERE), { credentials: "omit" });
  if (!response.ok) throw new Error(`${rel}: HTTP ${response.status}`);
  return response.json();
}

function relativeTime(iso, now) {
  const seconds = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (seconds < 90) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 90) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 36) return `${hours} hours ago`;
  return `${Math.round(hours / 24)} days ago`;
}

function tooltipContent(node) {
  // Built with text nodes only: a public label is never parsed as HTML.
  const box = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = node.label || node.public_id.slice(0, 8);
  const type = document.createElement("div");
  type.textContent = node.type || "Node";
  const heard = document.createElement("div");
  heard.textContent = `Last heard ${relativeTime(node.last_heard, Date.now())}`;
  box.append(name, type, heard);
  return box;
}

// A synthetic feed shaped like the public projection: a node catalogue,
// then activity events {event_id, kind, public_node_id, occurred_at,
// expires_at, activity_class, cursor}. Fixture times are shifted so that
// the fixture's `as_of` is now. Now and then it repeats an event id and
// sends an already expired event, so deduplication and the no-replay
// rule are exercised, not only described.
function fixtureFeed({ onStatus, onEvent }) {
  let timer = null;
  let n = 0;
  let seed = 22;
  const random = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  let located = [];
  let last = null;

  function emit() {
    const now = Date.now();
    const node = located[Math.floor(random() * located.length)];
    let event = {
      event_id: `demo-${++n}`,
      kind: "activity",
      public_node_id: node.public_id,
      occurred_at: new Date(now).toISOString(),
      expires_at: new Date(now + PULSE_MS).toISOString(),
      activity_class: "packet",
      cursor: `demo-${n}`,
    };
    const roll = random();
    if (last && roll < 0.08) event = last; // duplicate delivery
    else if (roll < 0.12) event = { ...event, expires_at: new Date(now - 1000).toISOString() }; // stale
    last = event;
    onEvent(event);
    timer = window.setTimeout(emit, 600 + random() * 1800);
  }

  function start() {
    if (timer === null) {
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
    async catalogue() {
      const doc = await fetchJSON("fixtures/nodes.json");
      const shift = Date.now() - Date.parse(doc.as_of);
      const nodes = doc.nodes.map((node) => ({
        ...node,
        last_heard: new Date(Date.parse(node.last_heard) + shift).toISOString(),
      }));
      located = nodes.filter((node) => node.location);
      return nodes;
    },
    connect() {
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stop();
        else {
          onStatus("reconnecting");
          window.setTimeout(start, 800);
        }
      });
      if (!document.hidden) start();
      else onStatus("offline");
    },
  };
}

async function main() {
  if (!root || !L) return;
  root.classList.add("live-map-ready");
  const view = initialView();
  const map = L.map(root, {
    center: view.center,
    zoom: view.zoom,
    minZoom: 5,
    maxZoom: 10,
    maxBounds: [
      [49, -6],
      [66, 30],
    ],
    // One finger scrolls the page on touch screens; two fingers zoom.
    dragging: !L.Browser.mobile,
    tap: false,
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true,
  });
  map.attributionControl.setPrefix("Leaflet · Natural Earth");

  const counts = { nodes: 0, pulses: 0, dropped_stale: 0, dropped_duplicate: 0 };
  const report = () => {
    for (const [key, value] of Object.entries(counts)) root.dataset[key] = String(value);
  };

  const basemap = await fetchJSON("basemap.json");
  L.geoJSON(basemap, {
    interactive: false,
    style: () => ({ className: "basemap-land", weight: 0.8, fillOpacity: 1 }),
  }).addTo(map);

  const markers = new Map();
  const pulses = new Map();
  const seen = new Set();
  let live = false;

  function clearPulses() {
    for (const { layer, timer } of pulses.values()) {
      window.clearTimeout(timer);
      layer.remove();
    }
    pulses.clear();
    counts.pulses = 0;
    report();
  }

  function setStatus(state) {
    live = state === "live";
    const words = { live: "Live", reconnecting: "Reconnecting", offline: "Offline" };
    statusEl.textContent = `Demonstration, synthetic data · ${words[state]}`;
    statusEl.dataset.state = state;
    if (!live) clearPulses();
  }

  function onEvent(event) {
    if (!live) return;
    if (seen.has(event.event_id)) {
      counts.dropped_duplicate += 1;
      return report();
    }
    seen.add(event.event_id);
    if (seen.size > SEEN_LIMIT) seen.delete(seen.values().next().value);
    const remaining = Math.min(PULSE_MS, Date.parse(event.expires_at) - Date.now());
    if (!(remaining > 0)) {
      counts.dropped_stale += 1;
      return report();
    }
    const marker = markers.get(event.public_node_id);
    if (!marker) return; // unknown or unlocated: nothing to draw

    const existing = pulses.get(event.public_node_id);
    if (existing) {
      window.clearTimeout(existing.timer);
      existing.layer.remove();
    }
    const layer = L.circleMarker(marker.getLatLng(), {
      radius: 11,
      interactive: false,
      className: reducedMotion() ? "map-pulse map-pulse-still" : "map-pulse",
    }).addTo(map);
    const timer = window.setTimeout(() => {
      layer.remove();
      pulses.delete(event.public_node_id);
      counts.pulses = pulses.size;
      report();
    }, remaining);
    pulses.set(event.public_node_id, { layer, timer });
    counts.pulses = pulses.size;
    report();
  }

  const feed = fixtureFeed({ onStatus: setStatus, onEvent });
  let nodes = [];
  try {
    nodes = await feed.catalogue();
  } catch {
    setStatus("offline");
    return;
  }
  for (const node of nodes) {
    if (!node.location) continue;
    const marker = L.circleMarker([node.location.lat, node.location.lon], {
      radius: 4.5,
      className: "map-node",
    })
      .bindTooltip(() => tooltipContent(node), { direction: "top", offset: [0, -4] })
      .addTo(map);
    markers.set(node.public_id, marker);
  }
  counts.nodes = markers.size;
  report();
  feed.connect();
}

main();
