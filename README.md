<picture>
  <source media="(prefers-color-scheme: dark)" srcset="brand/lockup-dark.svg">
  <img src="brand/lockup-light.svg" alt="MeshContinuum (MECON)" width="360">
</picture>

# MeshContinuum

## Your MeshCore network. More connected. Still yours.

Your MeshCore Companion works when the Internet does not. But one radio only knows what it hears, while it is awake and in range. What if your home Companion, the radio in your car, a Repeater on a hill and a community observation feed could each contribute to the bigger picture—**without changing how MeshCore works**?

**MeshContinuum (MECON)** connects the people, radios, observations and sites around a MeshCore network. It aims to make everyday messaging feel familiar, make missed traffic recoverable when it was heard elsewhere, and give fleet owners and administrators a clearer view of the infrastructure they look after. It is built for **individuals and small communities alike**, and is designed to be self-hosted.

MECON is an independent, non-commercial project. It is not an official MeshCore app, firmware or service. Radios continue to operate normally if MECON, its Backend or the Internet is unavailable.

> **Today:** [mecon.cloud](https://mecon.cloud) is an invitation-only private beta. Public [mecon-firmware](https://github.com/hoejriis/mecon-firmware) source and signed pre-releases exist. The public [mecon-backend](https://github.com/hoejriis/mecon-backend) repository currently contains **design documents and the first Reader MVP issues, not released application code**. See [availability](docs/CAPABILITIES.md).

## Start with something familiar: a better-connected Reader

The **first public application MVP** is a web Reader for **Device Users**, built first for iPhone and iPad in **Bluefy** with direct Bluetooth access to a supported Companion. It follows the stock MeshCore app's familiar concepts—**Chats, Channels, Contacts, Companion and Settings**—so changing between apps should not require learning a new messaging model. It uses MECON's own visual identity and interaction design, not a copy of the stock app.

Where authorized, the Reader can also use the existing private Backend for online history and messaging. Bluetooth and Backend are independent paths; connection and RF delivery are never treated as the same thing. Bluefy compatibility still requires real-device verification. This is a **planned MVP, not an available download**.

[Explore the Reader MVP](docs/P5_READER_MVP.md) · [Read the complete public product target](https://github.com/hoejriis/mecon-backend/blob/main/docs/TARGET_ARCHITECTURE.md)

## The bigger picture

### 1. One message, many opportunities to hear it

A message might be missed by the Companion in your pocket but heard by a gateway at home or another authorized observation source. MECON's Backend aims to retain reception evidence and show authorized history without pretending to have heard packets it did not receive. **Receiving a packet is not permission to decrypt it.**

### 2. See the network as it really behaves

A fleet owner can eventually inspect the health of their devices, reception evidence and the paths that carried traffic. Community observation sharing is opt-in and reciprocal, with anonymous participation available; administrator-added public sources remain separately available. Maps and diagnostics should explain what was actually observed, not invent coverage or locations.

### 3. Manage a fleet without taking over its users

Fleet Owners enroll, assign, configure and maintain their devices. Each device is assigned to one user, and a user may have up to five assigned devices. Fleet ownership **does not grant access to another user's private messages**. The future Reader gives Fleet Owners operational tools while Device Users keep a simple messaging experience.

### 4. Run it at home, across sites or as a community

A small installation can run Backend+Reader, an MQTT broker and an optional USB Connector on one machine. Later, trusted Backends in the same Deployment can cooperate across sites. A hosted service is a choice, not a protocol dependency. Administration manages infrastructure and accounts, **not a privileged private-message inbox**.

### 5. Keep MeshCore itself independent

The optional MECON firmware adds generic device management, telemetry, updates and connected operations. It is designed to be useful to other management systems as well. MECON does not replace native MeshCore radio messaging or require a special cloud to keep the mesh alive.

## Three public repositories, one product story

| Repository | Purpose | What you will find |
|---|---|---|
| **[MeshContinuum](https://github.com/hoejriis/MeshContinuum)** · this repository | The public-facing story | Product benefits, visual identity, conceptual architecture, roadmap, limitations, hosted-beta information and website |
| **[mecon-backend](https://github.com/hoejriis/mecon-backend)** | The application | Full target Backend/Reader architecture, user/Fleet Owner/Admin experiences, deployment and security design. **Only the Device User Reader MVP currently has implementation issues** |
| **[mecon-firmware](https://github.com/hoejriis/mecon-firmware)** | The radios | Independent public firmware, supported hardware, device-facing interfaces, conformance and releases |

The eventual application has three deployment units: **Backend with its served Reader**, **MQTT broker** and optional **transparent USB Connector**. Device-facing firmware contracts belong to mecon-firmware; application roles, history, sharing and federation belong to mecon-backend; the public explanation and visual brand live here.

## Trust matters

MECON separates the right to **observe traffic**, **read a message** and **manage a device**. Device Users receive public-channel messages and messages for identities/channels they are authorized to read; they do not browse raw fleet observations. Fleet Owners and Instance Admins cannot use their role to read another assigned user's private messages. A Backend that holds delegated keys can decrypt authorized traffic, so a hosted operator is not cryptographically blind to its own server: [read the trust model](docs/TRUST_AND_PRIVACY.md).

## Explore

- [What MECON adds](docs/WHY_MESHCONTINUUM.md), [how the pieces work](docs/COMPONENTS.md) and [deployment choices](docs/DEPLOYMENT_MODES.md)
- [P5 Reader-first plan](docs/P5_READER_MVP.md), [availability](docs/CAPABILITIES.md) and [roadmap](docs/ROADMAP.md)
- [Complete public Backend/Reader target](https://github.com/hoejriis/mecon-backend/blob/main/docs/TARGET_ARCHITECTURE.md) and [firmware documentation](https://github.com/hoejriis/mecon-firmware)
- [Documentation index](docs/README.md) and [contributing](CONTRIBUTING.md)

Public issues are public. Never post private messages, keys, credentials, personal locations or private deployment details.

MeshContinuum is licensed under [Apache-2.0](LICENSE). MECON is an independent project built around [MeshCore](https://github.com/meshcore-dev/MeshCore), not an official MeshCore service.
