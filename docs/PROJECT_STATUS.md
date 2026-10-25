# Project status and public release target

**Updated: 25 October 2026.**

- [Capability matrix](CAPABILITIES.md) is the shared authority for what is available, in beta, planned or experimental.
- [Roadmap](ROADMAP.md) records the hosted-test gates and the public firmware programme.
- [Getting started](GETTING_STARTED.md) explains how to follow or express interest today.

**MeshContinuum** (this repository) contains documentation and target contracts. It publishes no application source or installable release. **[mecon-firmware](https://github.com/hoejriis/mecon-firmware)** publishes its firmware source under MIT, with source-only pre-releases. It offers no binaries and no supported release. The private beta is working. First external tests are expected on invitation-only [mecon.cloud](https://mecon.cloud), with no date announced.

## Release boundary

**MeshContinuum** provides Backend, web Reader and broker/deployment integration. **[mecon-firmware](https://github.com/hoejriis/mecon-firmware)** owns the independently implementable device contracts and firmware. Its contracts work with any conforming manager: neither a hosted service nor this Backend is required.

Hardware verification of the public firmware covers four boards: Heltec V3, Heltec V4, Seeed Wio Tracker L1 and SenseCAP T1000-E. Each feature is to be verified on the boards and roles where it applies. Other boards get documented software verification only. Being in the list is not evidence that a feature passed on that board; the firmware's [hardware verification record](https://github.com/hoejriis/mecon-firmware/blob/main/docs/HARDWARE_VERIFIED.md) is.

## Target documents

The [detailed product target](PRODUCT_TARGET.md), [architecture](ARCHITECTURE.md) and [Backend contract](BACKEND_TARGET_CONTRACT_0.9.md) keep the broader design. They do not certify implementation or hardware readiness.
