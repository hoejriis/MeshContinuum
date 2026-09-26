# MeshContinuum

**MeshContinuum (MECON)** is a hosted or self-hosted companion platform for [MeshCore](https://github.com/meshcore-dev/MeshCore). It adds a web Reader, packet aggregation, history, authorized decryption and remote device management while preserving independent MeshCore operation.

> This repository describes the **public release target**. Implementation is being prepared for migration from the private development repositories; documentation describes the intended supported release rather than temporary development limitations.

## Sister firmware project

[mecon-firmware](https://github.com/hoejriis/mecon-firmware) is the open firmware sister project. It is deliberately usable without MeshContinuum. MeshContinuum is its reference backend/Reader, while the canonical device-facing contracts live in `mecon-firmware` and may be implemented by other projects.

The release target starts with Heltec V3/V4 Companion and Repeater roles and a capability-based management model. Devices retain normal MeshCore operation when MECON infrastructure is unavailable.

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
- start with one small local installation and add Internet resilience or additional sites later.

If MeshContinuum, MQTT or the Internet is unavailable, normal MeshCore radio and local-client operation continues.

## Components

| Component | Purpose |
|---|---|
| Backend | Packet ingestion, reconciliation, authorized decryption, jobs and APIs |
| Reader | Web inbox, channels, diagnostics, enrollment and management; direct USB/BLE operation |
| MQTT broker | Transport between devices, sources and Backends |
| mecon-firmware | Independent sister project implementing the open device contract |

## Start small

The recommended first self-hosted deployment is deliberately simple: **one Docker host running Backend + Reader + a local MQTT broker**. A Raspberry Pi, NAS, small home server or ordinary Linux computer can be used.

The target installation experience is:

```bash
git clone <MeshContinuum repository>
cd MeshContinuum
docker compose up -d
```

Then open the local Reader, create the Deployment administrator and add the first Companion. MQTT credentials, local broker configuration and Deployment identity should be provisioned by MECON rather than requiring a new user to edit broker configuration manually.

A local-only installation is a complete supported MECON deployment. Cloud infrastructure is optional.

## Grow when you need resilience

A MECON **Deployment** belongs to one administrator/trust domain. It can grow without replacing the original local installation:

1. **Local** — Backend + Reader + local broker. No Internet dependency.
2. **Primary cloud broker** — adds an Internet rendezvous point for devices and local Backends.
3. **Secondary cloud broker** — adds an independent fallback transport.
4. **Additional Backends/sites** — add local sites and federated Backend instances as required.

Devices use one MQTT connection at a time and prefer **local broker → primary cloud broker → secondary cloud broker**. Backends can connect to both cloud brokers and, when deployed locally, their local broker.

The brokers replicate the defined operational MECON MQTT namespace so switching transport does not change device or Backend identity. Authoritative history and application state remain Backend/database responsibilities and synchronize separately between trusted Backend instances.

## Recommended resilient deployment

For a resilient self-hosted installation we recommend deliberately different failure domains:

- **Local site:** your Pi/NAS/server runs Backend + Reader + local broker.
- **Primary broker:** a VPS or other independently operated Internet host, normally offering secure MQTT/TCP and/or secure MQTT over WebSocket.
- **Secondary broker:** a lightweight Platform-as-a-Service deployment such as Render, using MQTT over secure WebSocket (WSS) behind the platform's managed HTTPS/TLS ingress.

The secondary broker does **not** need a Backend, Reader or database. It can be a small broker-only service. This makes it practical to add independent transport resilience without administering a second full VPS.

MQTT over TLS/TCP and MQTT over secure WebSocket are equivalent MECON transports. WSS is therefore a first-class option, not a browser-only feature.

A future supported deployment flow should make adding a secondary broker a guided operation from Reader/Admin, including a simple broker-only PaaS template where supported.

## Privacy and ownership

MeshContinuum does not require a shared public MQTT hub. Each self-hosting administrator owns their Deployment infrastructure and credentials.

MQTT brokers hold only the transport credentials/ACL information and retained/queued MQTT material required for their role. MeshCore private keys, channel/message decryption keys and the authoritative MECON trust graph are not broker requirements.

A Backend or Reader does not have to be publicly exposed. A valid hybrid installation may expose only its primary and secondary MQTT brokers while all application services and databases remain local/private.

## Deployment model

Readers normally use a Backend, but a desktop Chrome/Edge Reader can also operate a directly attached Companion without a reachable Backend and synchronize later.

No hosting provider is part of the protocol contract. Render-style WSS hosting is a recommended convenient secondary-broker option, not a product dependency. Generic VPS, local Docker and other compatible MQTT hosting remain valid.

Backend cooperation uses versioned application-level contracts rather than direct database replication. Broker replication and Backend federation are deliberately separate layers.

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