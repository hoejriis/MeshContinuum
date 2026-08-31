# Why MeshContinuum?

MeshCore is useful because it works without cloud infrastructure. MeshContinuum extends that experience without changing that foundation.

## User benefits

MeshContinuum is intended to provide:

- one web Reader across owned Companions, channels and packet sources;
- message history that is not tied to one powered-on phone or Companion;
- decryption for enrolled Companion identities, even while the physical Companion is offline;
- packet and RF-path diagnostics using observations from several sources;
- browser-based setup and management of supported Companions and Repeaters;
- remote delivery assistance when the normal RF path misses a message;
- local, hosted or combined deployments;
- continued standards-compatible MeshCore operation during internet, backend or Reader outages.

## What it does not replace

MECON is not a new radio protocol and is not required for ordinary MeshCore operation.

A configured Companion or Repeater must continue to behave as a normal MeshCore device when:

- the Reader is closed;
- the configured MQTT broker is unavailable;
- a local backend is disconnected from a hosted backend;
- the internet is unavailable;
- the MECON service is stopped permanently.

## Design principles

1. **Offline first.** RF messaging remains useful without MECON.
2. **Standards compatible.** MECON functionality is an overlay around standard MeshCore roles and packets.
3. **Graceful degradation.** Losing one service removes only the assistance provided by that service.
4. **User controlled.** Identities, channel keys, brokers and deployment locations are explicitly enrolled.
5. **Multiple sources.** A packet may be observed by first-party gateways, third-party repeaters or external MQTT aggregators.
6. **No single mandatory cloud.** A hosted service is an option, not a protocol dependency.
7. **Instance neutral.** Public MECON code and contracts contain no operator-specific names, domains or configuration.
