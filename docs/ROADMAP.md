# Release roadmap

MECON is free and intended for open-source release. Progress is expressed as evidence gates, not dates. This roadmap does not announce a launch or invite opening.

## Two related tracks

| Track | Next outcome | Completion evidence |
|---|---|---|
| Hosted external testing | A small, invitation-only mecon.cloud beta | Truthful front page, accepted beta configuration, private security-report route, clear onboarding and a new tester's first useful result |
| Public software release | Independently usable source, artifacts and documentation | Generic firmware capabilities verified on the four boards, clean Backend publication, licensing/provenance, security acceptance, reproducible packaging and independent setup |

Hosted testing may precede public source publication. It is not blocked on finishing every long-term deployment mode. Its date and admitted tester group remain undecided.

## Public firmware programme

*Plans, not shipped features. What exists today is in the [capability matrix](CAPABILITIES.md).*

The public firmware builds reusable, generic managed-device capabilities first. Any conforming manager can use them; none needs this Backend, a particular broker or a domain. MECON-specific behaviour then builds on them.

**Generic capabilities, first:**

| Capability | Firmware issue |
|---|---|
| Device identity, management authority, replay protection and recovery | [#95](https://github.com/hoejriis/mecon-firmware/issues/95) |
| Full telemetry and subscriptions over MQTT, USB and BLE | [#96](https://github.com/hoejriis/mecon-firmware/issues/96) |
| Managed operations and configuration with safe recovery | [#109](https://github.com/hoejriis/mecon-firmware/issues/109) |
| Signed firmware updates over IP, USB and BLE | [#110](https://github.com/hoejriis/mecon-firmware/issues/110) |
| Private management channel | [#114](https://github.com/hoejriis/mecon-firmware/issues/114) |
| Authenticated management over direct and channel LoRa | [#115](https://github.com/hoejriis/mecon-firmware/issues/115) |
| Compact telemetry over LoRa | [#116](https://github.com/hoejriis/mecon-firmware/issues/116) |
| Conformance on Heltec V3, Heltec V4, Wio Tracker L1 and SenseCAP T1000-E | [#117](https://github.com/hoejriis/mecon-firmware/issues/117), [#1](https://github.com/hoejriis/mecon-firmware/issues/1) |

**MECON-specific, later:** Deployment mapping, connected messaging, backfill, outage and sync-channel behaviour, the RF health policy, and firmware-image delivery over LoRa ([#118](https://github.com/hoejriis/mecon-firmware/issues/118) to [#123](https://github.com/hoejriis/mecon-firmware/issues/123)).

Boundaries:
- A private management channel is generic. Membership of the channel and its encryption grant no command authority.
- Compact RF telemetry is a smaller, less frequent selection of the same telemetry catalogue, not a second one.
- Screen write-back is diagnostic telemetry from the device to its manager. It never writes to the display.
- The existing Reader needs a Backend and bridges USB and BLE. A fully offline Reader is later, undesigned work. Independent managers may implement the public contracts.

Release timing, migrating the production fleet, and publishing the Backend are separate decisions, with no date. The private Backend keeps improving for beta users and is adapted to the public firmware as it lands.

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
