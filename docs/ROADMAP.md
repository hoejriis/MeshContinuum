# Release roadmap

MECON is free and intended for open-source release. Progress is expressed as evidence gates, not dates. This roadmap does not announce a launch or invite opening.

## Two related tracks

| Track | Next outcome | Completion evidence |
|---|---|---|
| Hosted external testing | A small, invitation-only mecon.cloud beta | Truthful front page, accepted beta configuration, private security-report route, clear onboarding and a new tester's first useful result |
| Public software release | Independently usable source, artifacts and documentation | Generic firmware capabilities verified on the four boards, clean Backend publication, licensing/provenance, security acceptance, reproducible packaging and independent setup |

Hosted testing may precede public source publication. It is not blocked on finishing every long-term deployment mode. Its date and admitted tester group remain undecided.

## Public firmware programme

The public firmware builds reusable, generic managed-device capabilities first. Any conforming manager can use them; none needs this Backend, a particular broker or a domain. MECON-specific behaviour then builds on them.

**Generic capabilities in the pre-releases.** These are in the signed pre-releases, with the limits on [availability](CAPABILITIES.md). None is a supported release yet.
- Device identity, management authority, replay protection and recovery ([#95](https://github.com/hoejriis/mecon-firmware/issues/95))
- Managed operations and configuration with safe recovery ([#109](https://github.com/hoejriis/mecon-firmware/issues/109))
- Signed firmware updates over IP, USB and BLE ([#110](https://github.com/hoejriis/mecon-firmware/issues/110))
- Native send with correlated outcomes, direct and channel ([#260](https://github.com/hoejriis/mecon-firmware/issues/260))
- Collecting received messages ([#262](https://github.com/hoejriis/mecon-firmware/issues/262))
- Native contact administration ([#264](https://github.com/hoejriis/mecon-firmware/issues/264))
- Supplying a message to the local app, with no RF retransmission ([#265](https://github.com/hoejriis/mecon-firmware/issues/265))
- Bounded standing instructions and periodic reports ([#266](https://github.com/hoejriis/mecon-firmware/issues/266))
- Private management channel and channel administration ([#114](https://github.com/hoejriis/mecon-firmware/issues/114), [#151](https://github.com/hoejriis/mecon-firmware/issues/151))

**Generic capabilities still being completed.** *Plans, not finished features.* Parts of each are already in the pre-releases; the Issue stays open until the whole is done.

| Capability | Firmware issue |
|---|---|
| Full telemetry and subscriptions over MQTT, USB and BLE | [#96](https://github.com/hoejriis/mecon-firmware/issues/96) |
| Authenticated management over direct and channel LoRa | [#115](https://github.com/hoejriis/mecon-firmware/issues/115) |
| Compact telemetry over LoRa | [#116](https://github.com/hoejriis/mecon-firmware/issues/116) |
| Conformance on Heltec V3, Heltec V4, Wio Tracker L1 and SenseCAP T1000-E | [#117](https://github.com/hoejriis/mecon-firmware/issues/117) |

Boundaries:
- A private management channel is generic. Membership of the channel and its encryption grant no command authority.
- Compact RF telemetry is a smaller, less frequent selection of the same telemetry catalogue, not a second one. RF health monitoring uses it with standing instructions, and adds no telemetry mechanism of its own.
- Firmware sends, collects and reports what a manager asks for. Choosing a gateway, deciding what to catch up on and carrying favourite channels between devices stay with the Backend. The firmware keeps no favourites database and no routing policy.
- Screen write-back is diagnostic telemetry from the device to its manager. It never writes to the display.
- The existing Reader needs a Backend and bridges USB and BLE. A fully offline Reader is later, undesigned work. Independent managers may implement the public contracts.

Release timing and publishing the Backend are separate decisions, with no date. Moving the fleet follows the stages below, also with no date. The private Backend keeps improving for beta users and is adapted to the public firmware as it lands.

## Moving the fleet to the public firmware

The aim is to run the whole MECON fleet on the public firmware. This is planned work, in four stages, each gated on the one before:

| Stage | Work | Owner |
|---|---|---|
| 1. Finish the foundations | Deployment mapping ([#118](https://github.com/hoejriis/mecon-firmware/issues/118)), connected messaging ([#119](https://github.com/hoejriis/mecon-firmware/issues/119)), backfill ([#120](https://github.com/hoejriis/mecon-firmware/issues/120)), RF health ([#122](https://github.com/hoejriis/mecon-firmware/issues/122)), Repeater-sent manager packets ([#537](https://github.com/hoejriis/mecon-firmware/issues/537)) and conformance on the four boards ([#117](https://github.com/hoejriis/mecon-firmware/issues/117)) | Firmware, with the Backend's halves |
| 2. Accept the integration | This Backend managing public-firmware devices on real hardware | Backend |
| 3. Fleet features | The Fleet Management Channel and its human-readable `ping` ([#557](https://github.com/hoejriis/mecon-firmware/issues/557), with Backend provisioning and screens), and delegated receive identities ([#552](https://github.com/hoejriis/mecon-firmware/issues/552), with Backend provisioning). Not started: these wait until stages 1 and 2 are fully closed | Firmware and Backend |
| 4. Migration acceptance | The fleet on the public firmware, with stock iOS and Android apps and separate fleets kept apart on one Backend | Firmware and Backend |

The device side of connected messaging, backfill and RF health is mapped in [MECON journeys](https://github.com/hoejriis/mecon-firmware/blob/main/docs/MECON_JOURNEYS.md). Firmware-image delivery over LoRa ([#123](https://github.com/hoejriis/mecon-firmware/issues/123)) is separate later work.

**The Fleet Management Channel.** Each fleet has one private Fleet Management Channel, and every enrolled device joins it: Companions, Repeaters and Room servers, including those with no IP link. It is the public firmware's existing bound management channel, not a new protocol. It carries scheduled and on-demand compact RF reports, signed management from the Backend to devices that only radio can reach, and a human-readable `ping`, which any member can send from a stock app to get a short status from each device. Being on the channel grants no authority: management stays signed by the Deployment. One Backend can serve several independent fleet owners, and no channel key, command or data crosses from one fleet to another.

**Delegated receive identities.** A daily Companion keeps its own primary identity, and can also hold up to four other identities belonging to its owner, such as a car, cabin or spare Companion. It receives messages for them and sends the native acknowledgement, but never sends an ordinary message as one of them. The messages must appear in the stock iOS and Android apps' normal conversation history. A feasibility review found this possible, with four identities. Building it, and checking it against the stock apps and acknowledgements, is stage 3 work. A Repeater never holds these keys. As on any device, a copied private key can be used to impersonate its owner.

**Messages sent from a Repeater.** In stage 1, a Repeater transmits a native packet that the manager built, on a signed request. The Repeater holds no Companion's private key, and this does not make the Repeater a messaging user with an identity of its own. Stock MeshCore devices receive the packet as normal traffic. It needs a reachable manager. It is in the v0.3.6 pre-release; using it from this Backend is still stage 1 work.

**Retired.** Two items earlier listed as planned are cancelled: autonomous outage forwarding and the private firmware's sync channel ([#121](https://github.com/hoejriis/mecon-firmware/issues/121), and its Backend counterpart). The Fleet Management Channel, Repeater-sent packets, normal message catch-up and delegated receive identities replace them. Radio operation stays independent of any Backend, as before.

## A live observation map, later

A later aim is a near-live map of the MeshCore nodes and packet activity that connected observers hear, around Denmark first, for the Admin view and as a public-safe view on mecon.cloud. It would show only what observers actually heard, never invented coordinates, and never message content or private locations. A node's last receiver is not its own position. It needs Backend work first: the map itself, a privacy-reviewed public feed, and research into more authorised observation sources. The site's side is [#22](https://github.com/hoejriis/MeshContinuum/issues/22). Nothing on mecon.cloud is a live feed until that work is deployed.

## Before inviting external testers

- Publish matching product copy on mecon.cloud and these repositories.
- Identify a specific accepted Backend/firmware/browser/board combination.
- Explain hosted key handling, access boundaries, support limits and data handling before enrollment.
- Verify invitation/login, first useful Reader view, device onboarding where offered, recovery and feedback.
- Publish authentic, sanitized screenshots or a short walkthrough from the accepted beta.
- Verify a private vulnerability-report route and a clear public feedback route.

## Before calling a public release supported

- Public source and artifacts contain no private-instance configuration or history.
- Preserve existing Apache-2.0 application and MIT firmware licensing, upstream notices and dependency provenance.
- Test contracts across repositories; publish exact compatibility and capability metadata.
- Prove offline MeshCore behavior and hardware-specific setup, operation, update and recovery.
- Complete security/privacy acceptance for the advertised paths.
- Publish install, upgrade, backup/restore and troubleshooting documentation with real artifacts.
- Have a fresh operator follow the public instructions and record every unstated assumption.

Broader hardware, standalone Reader synchronization and additional deployment capabilities can progress separately; their status belongs in the [capability matrix](CAPABILITIES.md).
