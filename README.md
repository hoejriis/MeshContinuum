# MeshContinuum

## MeshCore, without the boundaries of a single device.

**Your mesh stays independent. MECON makes it more useful when connected.**

MeshContinuum (MECON) brings messages captured by your Companions and configured observer sources into one web Reader, with persistent history, reception details and management of supported devices. Standard [MeshCore](https://github.com/meshcore-dev/MeshCore) radio operation remains independent of MECON and the Internet.

> **Status — 9 October 2026:** working private beta; this public repository currently contains documentation and target contracts, with no application source or installable release. First external testing is expected to use **[mecon.cloud](https://mecon.cloud)**, which is invitation only. No opening date is announced. [What works, what is planned →](docs/CAPABILITIES.md)

[Follow development](https://github.com/hoejriis/MeshContinuum) · [Express beta interest](https://github.com/hoejriis/MeshContinuum/issues/new?template=beta-interest.yml) · [Read the roadmap](docs/ROADMAP.md)

## One Reader, more reception

At home, on the move or with several Companions: read traffic captured by the sources available to your deployment, rather than only by the radio beside your phone. Several observations of one packet become reception evidence, not several copies of the same message.

Enroll an identity or channel you are authorized to use to read its captured traffic. An enrolled Companion can be switched off while another configured observer hears a message for it. MECON cannot recover a packet that none of its sources received.

## Manage devices remotely

Check health and connectivity, inspect reception, and configure supported Companions and Repeaters. Send through an authorized Companion gateway. Firmware, board, role and advertised capabilities determine which actions are available; a Repeater is not a Companion sending identity.

These workflows exist in the private beta. Hardware acceptance and supported combinations are release-specific.

## Your infrastructure, your control

The product is free and intended for open-source release. Start by following the hosted beta, or help shape the self-hosted experience. Local, hosted and hybrid operation are part of the public design; public self-hosting packages are still to come.

Normal MeshCore RF operation continues when MECON is unavailable. The hosted Reader still needs a reachable Backend; a fully standalone Reader is planned.

## Two projects, one clear boundary

| Project | Responsibility | Public state today |
|---|---|---|
| **MeshContinuum** (this repo) | Backend, web Reader and broker/deployment integration | Documentation and target contracts |
| **[mecon-firmware](https://github.com/hoejriis/mecon-firmware)** | Optional MeshCore-derived firmware, device management and open device contracts | Documentation and target contracts |

MECON firmware is not required for ordinary MeshCore use or for reading captured traffic with authorized keys. Managed device features need compatible firmware or a supported bridge. The firmware contracts are backend-neutral: mecon.cloud is one deployment, not a required service.

## Get involved now

- **Future tester:** [tell us your use case](https://github.com/hoejriis/MeshContinuum/issues/new?template=beta-interest.yml). Interest is not an invitation or a waiting-list guarantee; no date is promised.
- **Mesh operator:** describe a reception, history or device-management problem MECON should solve.
- **Contributor:** improve documentation, review contracts or report an unclear claim. [Contribution guide](CONTRIBUTING.md).
- **Following along:** star the repository and use GitHub Watch for the updates you want.

Public issues are public. Do not post email addresses, private keys, private messages or credentials.

## Explore

- [Getting started and beta expectations](docs/GETTING_STARTED.md)
- [Capability and maturity matrix](docs/CAPABILITIES.md) — the shared status reference for both projects
- [Release roadmap](docs/ROADMAP.md)
- [Why MeshContinuum](docs/WHY_MESHCONTINUUM.md)
- [Trust and privacy](docs/TRUST_AND_PRIVACY.md)
- [Deployment modes](docs/DEPLOYMENT_MODES.md)
- [Technical documentation](docs/README.md)
- [Detailed product target](docs/PRODUCT_TARGET.md)
- [Security reporting](SECURITY.md)

## License and upstream

MeshContinuum documentation is licensed under [Apache-2.0](LICENSE), continuing the application's established licence. Public application source has not yet been published. [mecon-firmware](https://github.com/hoejriis/mecon-firmware) uses MIT separately.

MECON is an independent project built around MeshCore, not an official MeshCore service.
