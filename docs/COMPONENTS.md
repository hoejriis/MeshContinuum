# Components

> **Target documentation:** this public repository has no installable release yet. See the [shared capability matrix](CAPABILITIES.md) for current availability and acceptance; specifications do not certify hardware or release readiness.

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

The public firmware's hardware test targets are the Heltec V3, Heltec V4, Seeed Wio Tracker L1 and SenseCAP T1000-E, each for the roles and transports it supports. Other boards get software verification only. It preserves native MeshCore operation while adding structured management and telemetry, signed updates, and on the Heltec boards up to 10 Wi-Fi profiles and 6 MQTT broker profiles. It also offers generic capabilities a manager asks for, such as sending messages with correlated outcomes and collecting received ones.

Contact capacity, BLE and update paths vary by board and role, and a device reports its own capabilities. See the firmware's [supported hardware](https://github.com/hoejriis/mecon-firmware/blob/main/docs/SUPPORTED_HARDWARE.md). Repeaters and Room servers have no BLE, by decision: their local management is the USB console.

Firmware contracts are canonical in the sister repository so other projects can build compatible backends and Readers without MeshContinuum.

## Third-party compatibility

MeshContinuum may ingest third-party packet sources when adapters exist. Ingestion compatibility never grants remote-management authority. Conversely, a third-party backend may manage mecon-firmware devices if it implements the public firmware contract and is explicitly provisioned with the required authority.