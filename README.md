# MeshContinuum

**MeshContinuum (MECON)** is a cloud-hosted or locally hosted overlay for [MeshCore](https://github.com/meshcore-dev/MeshCore). It adds an online web experience, packet aggregation and remote management of supported Companions and Repeaters while keeping offline operation standards compatible and independent of MECON.

> MeshContinuum is in early public development. This repository currently establishes the public architecture and documentation; there is no generally supported release yet.

## Cloud service — Invitation Only

[mecon.cloud](https://mecon.cloud) is the MECON cloud service, deployed on Render. Access is **Invitation Only**; there is no public self-service registration.

The hosted service is one deployment of MeshContinuum, not a mandatory dependency for MeshCore or self-hosted MECON installations. Its availability does not imply a generally supported public software release. Multi-user invitation and magic-link login workflows are planned; do not assume those workflows are already available.

## Why MECON?

MeshCore's strength is independent RF communication. MECON preserves that model and adds optional assistance:

- read messages and channels through a web Reader;
- combine observations from several gateways, repeaters and MQTT sources;
- retain history independently of one phone or powered-on Companion;
- inspect RF paths, receivers, RSSI and SNR;
- enroll owned Companion identities for authorized online decryption;
- configure and manage supported devices;
- operate as a hosted service, locally, or as cooperating local and cloud installations.

If MECON, MQTT or the internet is unavailable, normal MeshCore radio and stock-client operation should continue.

## Components

| Component | Purpose |
|---|---|
| Backend | Packet ingestion, reconciliation, authorized decryption, jobs and APIs |
| Reader | Web inbox, channels, diagnostics, enrollment and management |
| MQTT broker | Transport between devices, sources and backends |
| Firmware | MECON integration for supported MeshCore Companions and Repeaters |

Compatible third-party repeaters and MQTT aggregators are packet sources handled by Backend ingestion adapters; they are not separate MECON components.

The default first-party gateway target is the **Heltec V3**. BLE, Heltec V4, managed OTA and Raspberry Pi deployments are backlog work.

## Deployment model

MECON is intended to support:

- hosted Backend + Reader + broker;
- local Backend + Reader + broker;
- hybrid hosted/local deployments;
- several independently useful local installations;
- backend cooperation using versioned, authenticated and idempotent domain events.

No hosting provider is part of the product contract, and backend cooperation must not require direct database replication.

## Documentation

- [Documentation index](docs/README.md)
- [Why MeshContinuum](docs/WHY_MESHCONTINUUM.md)
- [Components](docs/COMPONENTS.md)
- [Deployment modes](docs/DEPLOYMENT_MODES.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Project status](docs/PROJECT_STATUS.md)
- [Contributing](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

## Naming and domains

- Product: **MeshContinuum**
- Shorthand: **MECON**
- Future primary domain: [MeshContinuum.info](https://meshcontinuum.info)
- Cloud service: [mecon.cloud](https://mecon.cloud) — **Invitation Only**, hosted on Render

Private deployments may use their own instance names. Those names are configuration, not part of the MECON product or protocol.

## Independence

MeshContinuum is an independent project. It does not modify the basic requirement that MeshCore devices and clients must remain able to operate without MECON.
