# Components

MeshContinuum has three application components and one independent sister firmware project.

| Component | Responsibility |
|---|---|
| Backend | Ingests observations, reconciles packets/messages, performs authorized decryption, coordinates jobs and exposes APIs |
| Reader | Web reading, diagnostics, enrollment, configuration and direct device access |
| MQTT broker | Transport between devices, sources and backends |
| mecon-firmware | Independent MeshCore firmware project implementing the open MECON device contract |

## Backend

The Backend owns the application model: packets, observations, decrypted logical messages, device state, delivery jobs and synchronization. External MQTT feeds and compatible devices enter through validated ingestion adapters.

The Backend consumes the public device contract from [mecon-firmware](https://github.com/hoejriis/mecon-firmware). MeshContinuum must not maintain a competing private firmware protocol.

## Reader

The Reader provides:

- inbox/channels and message history;
- packet, route and reception diagnostics;
- device enrollment and flashing;
- configuration and health;
- managed firmware updates;
- Wi-Fi and MQTT profile management;
- direct Companion access over USB or BLE in desktop Chrome/Edge;
- direct Repeater USB management/observation;
- standalone direct operation when no Backend is reachable, with later synchronization.

Capabilities come from the device contract. The Reader must not infer an operation merely from role or firmware version.

## MQTT broker

MQTT is transport, not the system of record. A device may connect to up to two broker profiles, each with independent credentials, namespace and authority. Observation access does not imply message-send or device-management authority.

MeshContinuum may deploy its own broker or use a compatible MQTT service. `mecon.cloud` is one hosted deployment, not part of the protocol.

## mecon-firmware

The public firmware target supports Heltec V3 and V4 Companion/Repeater builds. It preserves native MeshCore operation while adding up to three Wi-Fi profiles, up to two MQTT brokers, remote management/observations, signed managed OTA and direct local access.

Companion builds enable USB and BLE and use a 64-contact resource profile. Repeaters preserve their native MeshCore role and expose direct USB management/observations; Repeater BLE is not required for the initial target.

Firmware contracts are canonical in the sister repository so other projects can build compatible backends and Readers without MeshContinuum.

## Third-party compatibility

MeshContinuum may ingest third-party packet sources when adapters exist. Ingestion compatibility never grants remote-management authority. Conversely, a third-party backend may manage mecon-firmware devices if it implements the public firmware contract and is explicitly provisioned with the required authority.