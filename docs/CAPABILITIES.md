# Capability and maturity matrix

**Reviewed: 9 October 2026.** This is the shared public status reference for MeshContinuum and mecon-firmware. Architecture and protocol specifications describe the target; this page describes availability. No public software or firmware release is published in either repository yet.

## Status vocabulary

| Label | Meaning |
|---|---|
| **Available** | Publicly accessible now, with the scope stated. Today this covers documentation and contribution paths. |
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
| Public source, downloadable firmware and supported releases | Planned | Clean publication follows the staged migration roadmap. |
| Broader board portability and non-Heltec profiles | Experimental | Compilation or software tests alone do not prove a physical board. |

## Hardware

| Board / role | Current evidence class | Public release position |
|---|---|---|
| Heltec V3 Companion and Repeater | Private beta; acceptance is per build and role | Planned baseline after hardware gates |
| Heltec V4 Companion | Private beta; board revision matters | Planned baseline after hardware gates |
| Heltec V4 Repeater | Target; no blanket acceptance claim | Planned baseline after hardware gates |
| SenseCAP T1000-E Companion | Experimental; remaining end-to-end and stability acceptance | Outside the initial Heltec baseline |
| Other boards and revisions, including V4 R8 | Experimental candidates unless individually promoted | No support inferred from a build result |

The intended public Heltec baseline is V3/V4 Companion/Repeater, **not a statement that all four combinations are supported today**. Contact capacity, BLE support and update paths must come from the exact release manifest and hardware evidence. Historical 32/50/64-slot values are not a universal product promise.

## Basis and maintenance

This snapshot was checked against the private Backend/Reader beta release v0.192.1, firmware development release mecon-v0.76.0, current acceptance issues, and public target contracts. These identify reviewed evidence, **not a recommended installation pair**. A tagged asset or passing CI does not prove fleet rollout or hardware acceptance; the firmware release's bench gates were still pending for several variants at review time.

For each promoted capability, publish a public evidence summary with version, board/role, transport, date, result and remaining limits. Summaries must omit private identities, infrastructure and messages. If evidence conflicts or is incomplete, retain the lower maturity classification.

Keep this matrix canonical. The two READMEs, firmware hardware guide and mecon.cloud should link here rather than maintain independent feature promises.

See [roadmap](ROADMAP.md), [getting started](GETTING_STARTED.md) and [firmware hardware target](https://github.com/hoejriis/mecon-firmware/blob/main/docs/SUPPORTED_HARDWARE.md).
