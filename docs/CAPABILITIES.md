# Availability

This is the one page that says what is available now. The other pages describe the product as it is meant to work. **As of 25 November 2026.** Release links below go to the release pages, which carry the notes and verification for each release; this page does not restate them.

## Where things stand

| | Today |
|---|---|
| **Hosted beta** | [mecon.cloud](https://mecon.cloud) runs MECON as a private beta, by invitation only. First external testers are expected there. No opening date is announced. |
| **Public firmware** | [mecon-firmware](https://github.com/hoejriis/mecon-firmware) publishes its source under MIT, with pre-releases. The latest, [v0.3.20](https://github.com/hoejriis/mecon-firmware/releases/tag/v0.3.20) (25 November 2026), is a signed pre-release with images and signed manifests for 14 board variants; its release notes list them. None is a supported release. What has run on which board is in its [hardware verification record](https://github.com/hoejriis/mecon-firmware/blob/main/docs/HARDWARE_VERIFIED.md). |
| **Public Reader** | [mecon-backend](https://github.com/hoejriis/mecon-backend) publishes the source of the new web Reader under Apache-2.0, with [releases](https://github.com/hoejriis/mecon-backend/releases). The restricted deployment at `reader.mecon.cloud` serves [v0.9.2](https://github.com/hoejriis/mecon-backend/releases/tag/v0.9.2); the newest tag, v0.9.3, is a build-only release. The deployment is restricted to the existing mecon.cloud users and connected to the hosted beta's Backend. It is the separate, five-tab Device User Reader, not the hosted beta's own Reader. The encrypted offline cache with time-limited leases, safe updates and USB access are implemented and served there, but none has been accepted yet; see the cached Reader row below. Bluetooth to a Companion is tested in simulation only. This is not a public beta. Its [availability record](https://github.com/hoejriis/mecon-backend/blob/main/docs/DEPLOYMENTS.md#restricted-reader-deployment-and-availability) has the detail. |
| **Public Backend** | A complete, self-hostable public Backend is **not released**: there are no images or installation guide, and there is no cutover from the hosted beta. The [mecon-backend](https://github.com/hoejriis/mecon-backend) repository does contain, as of v0.9.2, the public Reader, a Reader-API facade (`reader-backend`), a capture service and a processing service. Public capture is in a bounded 7-day shadow trial beside the hosted Backend and has received no traffic yet. The full replacement remains a documented [target](https://github.com/hoejriis/mecon-backend/blob/main/docs/TARGET_ARCHITECTURE.md). |
| **Later capabilities** | Planned work is in the [roadmap](ROADMAP.md), and known limits are in [limitations](LIMITATIONS.md). The firmware keeps its own [availability page](https://github.com/hoejriis/mecon-firmware/blob/main/docs/AVAILABILITY.md). |

The beta runs mostly on earlier beta firmware. Since late October 2026 it can also enrol, update and read devices running the public firmware pre-releases, on the project's test boards and with limits. A feature working on one firmware does not prove it on the other.

The table below is the detail.

## Status vocabulary

| Label | Meaning |
|---|---|
| **Available** | Publicly accessible now, with the scope stated. Today this covers documentation, contribution paths, the public firmware source and pre-releases, and the public Reader source and releases. |
| **Implemented, awaiting acceptance** | Built and, where stated, served in a restricted deployment, but not yet accepted. It is not generally available, and the limits of what was checked are stated beside it. |
| **Beta** | Implemented in the private beta; access, compatible versions and test coverage remain limited. This is not a supported public release. |
| **Planned** | A documented target or release gate, not a public availability claim. |
| **Experimental** | Prototype, candidate build or incomplete acceptance; do not infer hardware support. |

A beta feature can be implemented without being accepted for new external testers. Release-specific acceptance takes precedence over a generic feature description.

## Product capabilities

| Capability | State | What the claim means |
|---|---|---|
| Public architecture, device contracts and documentation contributions | Available | MeshContinuum, mecon-firmware and mecon-backend documentation can be read and discussed publicly. |
| mecon.cloud hosted service | Beta · invitation only | Existing private deployment. First external tests are expected here; timing and admission are unannounced. |
| The hosted beta's web Reader, authorized identity/channel decryption and history | Beta | Backend-based access to traffic actually captured by configured sources. |
| Several observation sources and packet/reception diagnostics | Beta | Combines authorized feeds; does not guarantee geographic coverage or complete delivery. |
| Sending through an enrolled Companion gateway | Beta | Requires an available authorized gateway. Submission and RF acknowledgement are distinct. |
| Device status, configuration, flashing and managed updates | Beta | Exact firmware, board, role, transport and capability restrictions apply. |
| Direct USB/BLE management and Reader bridge | Beta | Supported desktop browser/device combinations only; this does not imply backend-free Reader operation. |
| Backfill and reconnect catch-up | Beta / Experimental | Existing private-beta assistance paths. Release-specific acceptance is required; no delivery guarantee. The earlier beta firmware's sync channel and outage forwarding are retired and do not carry over to the public firmware. |
| Local and federated deployments | Beta implementation; public packaging Planned | Private deployments exist. Public images, installation guide and independent-operator acceptance remain release gates. |
| Automatic first-run Deployment creation and first-Companion handoff | Planned | A target workflow; not yet a complete public setup path. |
| Cached Reader: an encrypted local cache and a time-limited offline lease while the Backend is unreachable | Implemented, awaiting acceptance · restricted Reader only | The Backend stays the authority and first sign-in is online; see the [offline policy](DEPLOYMENT_MODES.md#the-offline-boundary). Tested with a virtual authenticator only; a real passkey on a phone is not yet verified, and physical Bluefy support is not verified. Not a standalone Reader. |
| Reader safe updates and direct USB access from a laptop browser | Implemented, awaiting acceptance · restricted Reader only | Served by the restricted deployment; neither is accepted yet, and the hardware acceptance session for USB is still open. |
| Public firmware source and pre-releases | Available | [mecon-firmware](https://github.com/hoejriis/mecon-firmware) under MIT. Pre-releases from v0.2.0 carry signed images; the latest is [v0.3.20](https://github.com/hoejriis/mecon-firmware/releases/tag/v0.3.20). None is a supported release. Its [hardware verification record](https://github.com/hoejriis/mecon-firmware/blob/main/docs/HARDWARE_VERIFIED.md) says what has run on which board. |
| Generic managed-device capabilities in the public firmware | Experimental · in pre-releases | Identity and authority, telemetry, managed operations, signed updates, management over LoRa, manager-requested send and outcomes, received-message collection, contact and channel administration, local delivery and standing instructions; in the pre-releases since v0.2.0, with limits. v0.3.0 adds device reset by scope, region scopes, and the read of identity and clock on the device interface. v0.3.1 adds the BLE bond count and their reset over the cable, the BLE PIN read and private-key export to a trusted caller, and stops the Wio Tracker L1 and T1000-E Companions offering Wi-Fi settings they have no radio for. v0.3.3 adds the remaining settings and actions of the stock CLI over the device interface, and the audit history; v0.3.2 and v0.3.4 give the Heltec V3 Companion enough heap in Wi-Fi mode; v0.3.5 lets a Heltec V3 take large requests over its cable and reports where a relayed LoRa reply was lost. v0.3.6 lets a Repeater transmit a packet a manager built (`packet.transmit`), stores the Deployment's continuity package, and counts events that could not be sent instead of losing them silently. v0.3.7 sends a request zero-hop first to a contact with no known path, which stops most lost first frames of multi-frame LoRa management replies on the point-to-point path; on the management channel, and after a target falls back to flood, a first frame can still be lost. Releases after v0.3.7 are described in their [release notes](https://github.com/hoejriis/mecon-firmware/releases), not restated here. Later MECON-specific work is on the [roadmap](ROADMAP.md). What has been proven is on the firmware's [availability page](https://github.com/hoejriis/mecon-firmware/blob/main/docs/AVAILABILITY.md). |
| Fleet Management Channel: one private channel per fleet for compact RF reports, signed management and a human-readable `ping` | Experimental · in pre-releases | The firmware side is released: management over LoRa since v0.2.0, and the human-readable `ping` on the Companion and Repeater since v0.3.9 and on the Room server since v0.3.10. The `ping` has not been checked with a stock app on a real device; see the firmware's [availability page](https://github.com/hoejriis/mecon-firmware/blob/main/docs/AVAILABILITY.md). The fleet-wide channel run by a manager is not released. |
| Delegated receive identities: up to four of the owner's other identities on a daily Companion | Planned | Judged feasible; stock-app conversation history and acknowledgements are still to be proven on real phones and boards. |
| The hosted beta using those public capabilities | Beta · test boards only | Enrolment through the Reader's cable, signed updates over USB, Bluetooth and the broker, set-up of Companions with no Wi-Fi, and receptions into the archive. Limited to the project's test boards; a feature working on one firmware does not prove it on the other. |
| Public Reader source and pre-releases | Available | The new web Reader's source in [mecon-backend](https://github.com/hoejriis/mecon-backend) under Apache-2.0, with [releases](https://github.com/hoejriis/mecon-backend/releases) from v0.1.0. None is a supported release. |
| Restricted public-Reader deployment at `reader.mecon.cloud` | Experimental · existing mecon.cloud users only | The separate, five-tab Device User Reader (serving [v0.9.2](https://github.com/hoejriis/mecon-backend/releases/tag/v0.9.2)), connected to the hosted beta's Backend. Bluetooth on real hardware is not verified (simulated only, including Bluefy on iPhone and iPad). Offline cache with leases, safe updates and USB access are implemented and served but not accepted. Its map and contacts are planned. Not a public beta, and not a replacement for the hosted beta's own Reader. The release notes give the verification of each release. |
| Privacy-filtered live observation feed and the front-page activity map | Available · partial coverage | The [mecon.cloud](https://mecon.cloud) front page maps public radios with an approved position, a pulse when one is heard or a repeater passes a message on, and a line to the radio that heard it or the next repeater. Sources: MECON's own receivers and the receivers that feed Meshat.se. Activity only, never message content; areas without a participating receiver look quiet. Updated every few seconds, not streamed; up to about half a minute behind. |
| Supported firmware and Reader releases, a complete self-hostable public Backend, and any cutover | Planned | Separate decisions with no date; see the [roadmap](ROADMAP.md). |
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

The private beta rows were last checked on 18 November 2026 against the hosted beta release then live and the earlier beta firmware release mecon-v0.90.29. The public Reader and Backend rows were updated on 25 November 2026 against mecon-backend releases v0.9.2 (served) and v0.9.3 and its [availability record](https://github.com/hoejriis/mecon-backend/blob/main/docs/DEPLOYMENTS.md#restricted-reader-deployment-and-availability) and [acceptance evidence](https://github.com/hoejriis/mecon-backend/blob/main/docs/MVP1_ACCEPTANCE.md). The firmware rows name the latest release, v0.3.20 (25 November 2026); the board-by-board detail was last reviewed against v0.3.7 on 15 November 2026, and the firmware's hardware verification record and contracts remain the authority. These identify reviewed evidence, **not a recommended installation pair**. A tagged asset or passing CI does not prove fleet rollout or hardware acceptance.

For each promoted capability, publish a public evidence summary with version, board/role, transport, date, result and remaining limits. Summaries must omit private identities, infrastructure and messages. If evidence conflicts or is incomplete, retain the lower maturity classification.

Keep this matrix canonical for MeshContinuum and mecon.cloud: they link here rather than maintain independent feature promises. mecon-firmware describes its finished product in its own documentation, and states what each firmware release contains in that release's notes.

See [roadmap](ROADMAP.md), [getting started](GETTING_STARTED.md) and [firmware hardware target](https://github.com/hoejriis/mecon-firmware/blob/main/docs/SUPPORTED_HARDWARE.md).
