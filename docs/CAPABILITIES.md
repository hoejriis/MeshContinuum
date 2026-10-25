# Capability and maturity matrix

**Reviewed: 25 October 2026.** This is the shared public status reference for MeshContinuum and mecon-firmware. Architecture and protocol specifications describe the target; this page describes availability. mecon-firmware publishes its source and source-only pre-releases. Neither repository publishes binaries or a supported release.

## Status vocabulary

| Label | Meaning |
|---|---|
| **Available** | Publicly accessible now, with the scope stated. Today this covers documentation, contribution paths and the public firmware source. |
| **Beta** | Implemented in the private beta; access, compatible versions and test coverage remain limited. This is not a supported public release. |
| **Planned** | A documented target or release gate, not a public availability claim. |
| **Experimental** | Prototype, candidate build or incomplete acceptance; do not infer hardware support. |

A beta feature can be implemented without being accepted for new external testers. Release-specific acceptance takes precedence over a generic feature description.

## Product capabilities

| Capability | State | What the claim means |
|---|---|---|
| Public architecture, device contracts and documentation contributions | Available | Both repositories can be read and discussed publicly. |
| mecon.cloud hosted service | Beta · invitation only | Existing private deployment. First external tests are expected here; timing and admission are unannounced. |
| Web Reader, authorized identity/channel decryption and history | Beta | Backend-based access to traffic actually captured by configured sources. |
| Several observation sources and packet/reception diagnostics | Beta | Combines authorized feeds; does not guarantee geographic coverage or complete delivery. |
| Sending through an enrolled Companion gateway | Beta | Requires an available authorized gateway. Submission and RF acknowledgement are distinct. |
| Device status, configuration, flashing and managed updates | Beta | Exact firmware, board, role, transport and capability restrictions apply. |
| Direct USB/BLE management and Reader bridge | Beta | Supported desktop browser/device combinations only; this does not imply backend-free Reader operation. |
| Backfill and outage assistance | Beta / Experimental | Existing assistance paths plus evolving relay/reconnect work. Release-specific acceptance is required; no delivery guarantee. |
| Local and federated deployments | Beta implementation; public packaging Planned | Private deployments exist. Public images, installation guide and independent-operator acceptance remain release gates. |
| Automatic first-run Deployment creation and first-Companion handoff | Planned | A target workflow; not yet a complete public setup path. |
| Fully standalone direct Reader with later synchronization | Planned | The hosted Reader needs a reachable Backend. |
| Public firmware source and source-only pre-releases | Available | [mecon-firmware](https://github.com/hoejriis/mecon-firmware) under MIT. No binaries; not a supported release. Its [hardware verification record](https://github.com/hoejriis/mecon-firmware/blob/main/docs/HARDWARE_VERIFIED.md) says what has run on which board. |
| Generic managed-device capabilities in the public firmware | Planned · in progress | Identity and authority, telemetry, managed operations, signed updates, management over LoRa; see the [roadmap](ROADMAP.md). Present on mecon-firmware's main branch only where its documentation says so. |
| Downloadable firmware, supported releases and public Backend source | Planned | Separate decisions with no date; see the [roadmap](ROADMAP.md). |
| Broader board portability and non-Heltec profiles | Experimental | Compilation or software tests alone do not prove a physical board. |

## Hardware

| Board / role | Current evidence class | Public release position |
|---|---|---|
| Heltec V3 Companion and Repeater | Private beta; acceptance is per build and role | Planned baseline after hardware gates |
| Heltec V4 Companion | Private beta; board revision matters | Planned baseline after hardware gates |
| Heltec V4 Repeater | Target; no blanket acceptance claim | Planned baseline after hardware gates |
| SenseCAP T1000-E Companion | Experimental; remaining end-to-end and stability acceptance | One of the four public firmware verification boards |
| Seeed Wio Tracker L1 | Experimental | One of the four public firmware verification boards |
| Other boards and revisions, including V4 R8 | Experimental candidates unless individually promoted | No support inferred from a build result |

Hardware verification of the public firmware covers four boards: Heltec V3, Heltec V4, Wio Tracker L1 and SenseCAP T1000-E. Each feature is verified only where it applies; other boards get documented software verification only. **Being one of the four is not evidence that a feature passed there.** Contact capacity, BLE support and update paths must come from the exact release manifest and hardware evidence. Historical 32/50/64-slot values are not a universal product promise.

## Basis and maintenance

This snapshot was checked against the private Backend/Reader beta release v0.236.1, the private firmware release mecon-v0.90.29, the public mecon-firmware main branch and its hardware verification record, and the public target contracts. These identify reviewed evidence, **not a recommended installation pair**. A tagged asset or passing CI does not prove fleet rollout or hardware acceptance.

For each promoted capability, publish a public evidence summary with version, board/role, transport, date, result and remaining limits. Summaries must omit private identities, infrastructure and messages. If evidence conflicts or is incomplete, retain the lower maturity classification.

Keep this matrix canonical. The two READMEs, firmware hardware guide and mecon.cloud should link here rather than maintain independent feature promises.

See [roadmap](ROADMAP.md), [getting started](GETTING_STARTED.md) and [firmware hardware target](https://github.com/hoejriis/mecon-firmware/blob/main/docs/SUPPORTED_HARDWARE.md).
