# Availability

This is the one page that says what is available now. The other pages describe the product as it is meant to work. Firmware rows were reviewed on 8 November 2026, and private beta rows on 25 October 2026.

## Where things stand

| | Today |
|---|---|
| **Hosted beta** | [mecon.cloud](https://mecon.cloud) runs MECON as a private beta, by invitation only. First external testers are expected there. No opening date is announced. |
| **Public firmware** | [mecon-firmware](https://github.com/hoejriis/mecon-firmware) publishes its source under MIT, with pre-releases. The latest, [v0.3.0](https://github.com/hoejriis/mecon-firmware/releases/tag/v0.3.0), has signed images for 14 board variants: the standalone Companion, Repeater and Room server on the Heltec V3 and V4, and the BLE and USB Companion, Repeater and Room server on the Wio Tracker L1 and the T1000-E. None is a supported release. What has run on which board is in its [hardware verification record](https://github.com/hoejriis/mecon-firmware/blob/main/docs/HARDWARE_VERIFIED.md). |
| **Public Backend and Reader** | Not published. There is no source, image or installation guide yet. Self-hosting is described as a design in [deployment choices](DEPLOYMENT_MODES.md). Publishing the Backend is a separate decision, with no date. |
| **Later capabilities** | Planned work is in the [roadmap](ROADMAP.md), and known limits are in [limitations](LIMITATIONS.md). The firmware keeps its own [availability page](https://github.com/hoejriis/mecon-firmware/blob/main/docs/AVAILABILITY.md). |

The beta runs on private firmware. A beta feature does not prove the same feature on the public firmware, and the other way round.

The table below is the detail.

## Status vocabulary

| Label | Meaning |
|---|---|
| **Available** | Publicly accessible now, with the scope stated. Today this covers documentation, contribution paths and the public firmware source and pre-releases. |
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
| Public firmware source and pre-releases | Available | [mecon-firmware](https://github.com/hoejriis/mecon-firmware) under MIT. Pre-releases from v0.2.0 carry signed images; the latest is [v0.3.0](https://github.com/hoejriis/mecon-firmware/releases/tag/v0.3.0). None is a supported release. Its [hardware verification record](https://github.com/hoejriis/mecon-firmware/blob/main/docs/HARDWARE_VERIFIED.md) says what has run on which board. |
| Generic managed-device capabilities in the public firmware | Experimental · in pre-releases | Identity and authority, telemetry, managed operations, signed updates, management over LoRa, manager-requested send and outcomes, received-message collection, contact and channel administration, local delivery and standing instructions; in the pre-releases since v0.2.0, with limits. v0.3.0 adds device reset by scope, region scopes, and the read of identity and clock on the device interface; later MECON-specific work is on the [roadmap](ROADMAP.md). What has been proven is on the firmware's [availability page](https://github.com/hoejriis/mecon-firmware/blob/main/docs/AVAILABILITY.md). |
| This Backend and Reader using those public capabilities | Planned | The beta runs on private firmware. A beta feature here does not prove the same feature on the public firmware, and the other way round. |
| Supported firmware releases and public Backend source | Planned | Separate decisions with no date; see the [roadmap](ROADMAP.md). |
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

The private beta rows were checked on 25 October 2026 against the private Backend/Reader beta release v0.236.1 and the private firmware release mecon-v0.90.29. The firmware rows were checked on 11 November 2026 against the public mecon-firmware release v0.3.0, its main branch, its hardware verification record and its contracts. These identify reviewed evidence, **not a recommended installation pair**. A tagged asset or passing CI does not prove fleet rollout or hardware acceptance.

For each promoted capability, publish a public evidence summary with version, board/role, transport, date, result and remaining limits. Summaries must omit private identities, infrastructure and messages. If evidence conflicts or is incomplete, retain the lower maturity classification.

Keep this matrix canonical for MeshContinuum and mecon.cloud: they link here rather than maintain independent feature promises. mecon-firmware describes its finished product in its own documentation, and states what each firmware release contains in that release's notes.

See [roadmap](ROADMAP.md), [getting started](GETTING_STARTED.md) and [firmware hardware target](https://github.com/hoejriis/mecon-firmware/blob/main/docs/SUPPORTED_HARDWARE.md).
