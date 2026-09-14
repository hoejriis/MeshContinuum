# MeshContinuum

**MeshContinuum (MECON)** is a hosted or self-hosted companion platform for [MeshCore](https://github.com/meshcore-dev/MeshCore). It adds a web Reader, packet aggregation, history, authorized decryption and remote device management while preserving independent MeshCore operation.

> This repository describes the **public release target**. Implementation is being prepared for migration from the private development repositories; documentation should describe the intended supported release rather than temporary development limitations.

## Sister firmware project

[mecon-firmware](https://github.com/hoejriis/mecon-firmware) is the open firmware sister project. It is deliberately usable without MeshContinuum. MeshContinuum is its reference backend/Reader, while the canonical device-facing contracts live in `mecon-firmware` and may be implemented by other projects.

The release target supports Heltec V3/V4 Companion and Repeater roles, three Wi-Fi profiles, two MQTT brokers, default USB/Wi-Fi connectivity, default BLE on Companion, managed OTA, and direct desktop Chrome/Edge Reader access over USB/BLE when Wi-Fi is unavailable. Companion builds use a deliberate 64-contact limit for connectivity memory headroom.

## Cloud service

[mecon.cloud](https://mecon.cloud) is a hosted MeshContinuum service. Access is **Invitation Only**. It is one deployment of MeshContinuum, not a mandatory dependency and not part of the firmware trust model.

## Why MECON?

MeshCore's strength is independent RF communication. MeshContinuum preserves that model and adds optional assistance:

- read messages and channels through a web Reader;
- combine observations from several devices and MQTT sources;
- retain history independently of one phone or powered-on Companion;
- inspect RF paths, receivers, RSSI and SNR;
- enroll Companion identities for authorized online decryption;
- configure, monitor and update supported devices;
- connect directly to a Companion over USB/BLE when infrastructure is unavailable;
- operate hosted, locally, offline-direct, or through cooperating installations.

If MeshContinuum, MQTT or the Internet is unavailable, normal MeshCore radio and local-client operation continues.

## Components

| Component | Purpose |
|---|---|
| Backend | Packet ingestion, reconciliation, authorized decryption, jobs and APIs |
| Reader | Web inbox, channels, diagnostics, enrollment and management; direct USB/BLE operation |
| MQTT broker | Transport between devices, sources and backends |
| mecon-firmware | Independent sister project implementing the open device contract |

## Deployment model

MeshContinuum targets hosted, local and hybrid deployments. Readers normally use a Backend, but a desktop Chrome/Edge Reader can also operate a directly attached Companion without a reachable backend and synchronize later.

No hosting provider is part of the product contract. Backend cooperation uses versioned application-level contracts rather than direct database replication.

## Documentation

- [Documentation index](docs/README.md)
- [Why MeshContinuum](docs/WHY_MESHCONTINUUM.md)
- [Components](docs/COMPONENTS.md)
- [Deployment modes](docs/DEPLOYMENT_MODES.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Project status / release target](docs/PROJECT_STATUS.md)
- [Contributing](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

## Naming

- Product: **MeshContinuum**
- Shorthand: **MECON**
- Firmware project: **mecon-firmware**
- Project domain: **MeshContinuum.info**
- Hosted service: **mecon.cloud**

Private deployments may use their own instance names. Instance names are configuration, not protocol identity.