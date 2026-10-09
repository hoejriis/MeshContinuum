# Project status and public release target

**Updated: 9 October 2026.**

- [Capability matrix](CAPABILITIES.md) is the shared authority for what is available, in beta, planned or experimental.
- [Roadmap](ROADMAP.md) records the hosted-test and public-release gates.
- [Getting started](GETTING_STARTED.md) explains how to follow or express interest today.

Both public repositories currently contain documentation and target contracts. Neither publishes installable application/firmware releases. The private beta is working; first external tests are expected on invitation-only [mecon.cloud](https://mecon.cloud), with no date announced.

## Release boundary

**MeshContinuum** provides Backend, web Reader and broker/deployment integration. **[mecon-firmware](https://github.com/hoejriis/mecon-firmware)** owns the independently implementable device contracts and firmware target. A hosted service is not required by the firmware contract.

Heltec V3/V4 Companion and Repeater are the intended first public hardware baseline, subject to per-board/role gates. Resource limits come from measured manifests, not a fixed historical contact count. Additional hardware is experimental until accepted.

## Target documents

The [detailed product target](PRODUCT_TARGET.md), [architecture](ARCHITECTURE.md) and [Backend contract](BACKEND_TARGET_CONTRACT_0.9.md) retain the broader design. They do not certify implementation or hardware readiness. Publication follows the firmware-first migration sequence in the roadmap.
