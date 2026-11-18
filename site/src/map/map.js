// Front-page activity map.
//
// Draws the public nodes of the anonymous observation projection, a short
// violet pulse each time one is heard, and a thin line to each radio that
// heard it. The data comes from a feed (feeds.js). Every build uses the
// synthetic fixture feed, labelled as a demonstration, so no request leaves
// this origin. A live adapter is selected only by `data-feed="poll"` or
// `data-feed="stream"` on the map element, which nothing sets until the
// public feed exists and its use on the live page is approved.
//
// Rules carried from the approved specification and the draft feed:
// - only nodes with an approved location are drawn; unlocated nodes are
//   absent, not counted and not listed;
// - every node is the same turquoise dot, with no clustering or filters;
// - a pulse and its lines last until the event's expiry, at most 15 seconds,
//   are refreshed by later activity, and are never drawn for an event that
//   has already expired (no replay);
// - a line is keyed by its short-lived reference: a repeated reference
//   refreshes the line instead of drawing a second one;
// - events are deduplicated by event id;
// - a revoked node, or one missing from a fresh catalogue, is removed at
//   once with its pulse and every line touching it;
// - when the feed is not live, every pulse and line is cleared;
// - with reduced motion, pulses and lines are still, with the same expiry.

import { fixtureFeed, pollFeed, streamFeed } from "./feeds.js";

const L = window.L;
const HERE = new URL(".", import.meta.url);
const PULSE_MS = 15000;
const SEEN_LIMIT = 2000;
const LINE_LIMIT = 400;
const TYPE_WORDS = { companion: "Companion", repeater: "Repeater", room: "Room server", sensor: "Sensor" };

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

function relativeTime(iso, now) {
  const seconds = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (!Number.isFinite(seconds)) return "unknown";
  if (seconds < 90) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 90) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 36) return `${hours} hours ago`;
  return `${Math.round(hours / 24)} days ago`;
}

function tooltipContent(node) {
  // Built with text nodes only: a public name is never parsed as HTML.
  const box = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = node.name || node.public_node_id.slice(0, 8);
  const type = document.createElement("div");
  type.textContent = TYPE_WORDS[node.type] || "Node";
  const heard = document.createElement("div");
  heard.textContent = `Last heard ${relativeTime(node.last_heard, Date.now())}`;
  box.append(name, type, heard);
  return box;
}

function sameSpot(a, lat, lon) {
  return Math.abs(a.lat - lat) < 1e-6 && Math.abs(a.lng - lon) < 1e-6;
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

  const counts = { nodes: 0, pulses: 0, lines: 0, dropped_stale: 0, dropped_duplicate: 0, revoked: 0 };
  const report = () => {
    counts.pulses = pulses.size;
    counts.lines = lines.size;
    counts.nodes = markers.size;
    for (const [key, value] of Object.entries(counts)) root.dataset[key] = String(value);
  };

  const response = await fetch(new URL("basemap.json", HERE), { credentials: "omit" });
  if (response.ok) {
    L.geoJSON(await response.json(), {
      interactive: false,
      style: () => ({ className: "basemap-land", weight: 0.8, fillOpacity: 1 }),
    }).addTo(map);
  }

  const markers = new Map(); // public_node_id -> {marker, node}
  const pulses = new Map(); // public_node_id -> {layer, timer}
  const lines = new Map(); // ref -> {layer, timer, from}
  const seen = new Set();
  let live = false;
  let label = "";

  function dropPulse(id) {
    const pulse = pulses.get(id);
    if (!pulse) return;
    window.clearTimeout(pulse.timer);
    pulse.layer.remove();
    pulses.delete(id);
  }
  function dropLine(ref) {
    const line = lines.get(ref);
    if (!line) return;
    window.clearTimeout(line.timer);
    line.layer.remove();
    lines.delete(ref);
  }
  function clearActivity() {
    for (const id of [...pulses.keys()]) dropPulse(id);
    for (const ref of [...lines.keys()]) dropLine(ref);
    report();
  }

  // Removes a node with everything drawn for it: its pulse, the lines it
  // sent, and the lines that end at its position.
  function removeNode(id) {
    const entry = markers.get(id);
    if (!entry) return false;
    const at = entry.marker.getLatLng();
    entry.marker.remove();
    markers.delete(id);
    dropPulse(id);
    for (const [ref, line] of lines) {
      if (line.from === id || sameSpot(line.end, at.lat, at.lng)) dropLine(ref);
    }
    return true;
  }

  function setStatus(state) {
    live = state === "live";
    const words = { live: "Live", reconnecting: "Reconnecting", offline: "Offline" };
    statusEl.textContent = label === "Live" ? words[state] : `${label} · ${words[state]}`;
    statusEl.dataset.state = state;
    if (!live) clearActivity();
  }

  function onCatalogue(nodes) {
    const fresh = new Set();
    for (const node of nodes) {
      fresh.add(node.public_node_id);
      const existing = markers.get(node.public_node_id);
      const latlng = [node.location.lat, node.location.lon];
      if (existing) {
        existing.node = node;
        const at = existing.marker.getLatLng();
        if (!sameSpot(at, latlng[0], latlng[1])) {
          // A moved node: its old lines and pulse point at the old spot.
          removeNode(node.public_node_id);
        } else continue;
      }
      const entry = { node, marker: null };
      entry.marker = L.circleMarker(latlng, { radius: 4.5, className: "map-node" })
        .bindTooltip(() => tooltipContent(entry.node), { direction: "top", offset: [0, -4] })
        .addTo(map);
      markers.set(node.public_node_id, entry);
    }
    for (const id of [...markers.keys()]) if (!fresh.has(id)) removeNode(id);
    report();
  }

  function onRevoked(id) {
    if (removeNode(id)) counts.revoked += 1;
    report();
  }

  function onObservation(event) {
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
    const entry = markers.get(event.public_node_id);
    if (!entry) return; // unknown, unlocated or revoked: nothing to draw
    const from = entry.marker.getLatLng();
    const still = reducedMotion();

    dropPulse(event.public_node_id);
    const pulse = L.circleMarker(from, {
      radius: 11,
      interactive: false,
      className: still ? "map-pulse map-pulse-still" : "map-pulse",
    }).addTo(map);
    const pulseTimer = window.setTimeout(() => {
      dropPulse(event.public_node_id);
      report();
    }, remaining);
    pulses.set(event.public_node_id, { layer: pulse, timer: pulseTimer });

    for (const link of event.links) {
      if (sameSpot(from, link.lat, link.lon)) continue;
      dropLine(link.ref);
      const layer = L.polyline([from, [link.lat, link.lon]], {
        interactive: false,
        className: still ? "map-line map-line-still" : "map-line",
      }).addTo(map);
      const timer = window.setTimeout(() => {
        dropLine(link.ref);
        report();
      }, remaining);
      lines.set(link.ref, { layer, timer, from: event.public_node_id, end: L.latLng(link.lat, link.lon) });
      if (lines.size > LINE_LIMIT) dropLine(lines.keys().next().value);
    }
    report();
  }

  const handlers = { onStatus: setStatus, onCatalogue, onObservation, onRevoked };
  let feed;
  try {
    const base = root.dataset.feedBase || "/api/observations/v1/public/";
    const kind = root.dataset.feed;
    feed =
      kind === "poll" ? pollFeed(base, handlers) : kind === "stream" ? streamFeed(base, handlers) : fixtureFeed(handlers);
    label = feed.label;
    await feed.open();
  } catch {
    label = label || "Map data";
    setStatus("offline");
  }
}

main();
