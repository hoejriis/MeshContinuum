# Release roadmap

MECON is free and intended for open-source release. Progress is expressed as evidence gates, not dates. This roadmap does not announce a launch or invite opening.

## Two related tracks

| Track | Next outcome | Completion evidence |
|---|---|---|
| Hosted external testing | A small, invitation-only mecon.cloud beta | Truthful front page, accepted beta configuration, private security-report route, clear onboarding and a new tester's first useful result |
| Public software release | Independently usable source, artifacts and documentation | Staged firmware migration, clean Backend publication, licensing/provenance, hardware and security acceptance, reproducible packaging and independent setup |

Hosted testing may precede public source publication. It is not blocked on finishing every long-term deployment mode. Its date and admitted tester group remain undecided.

## Public implementation sequence

The existing staged programme is preserved:

1. **Released MeshCore 1.18 baseline:** pin the released upstream revision and prove stock behavior on the target hardware. A moving development branch does not satisfy the gate.
2. **MECON 0.8.1 milestone:** first refounded firmware, tested on test boards against the current Backend.
3. **Compatibility bridge:** make the current Backend work with both legacy and new device contracts; prove a mixed fleet.
4. **MECON 0.9.1 milestone:** migrate the fleet board by board after acceptance. Remove dependence on legacy-only behavior.
5. **Public Backend:** populate MeshContinuum with the reviewed, instance-neutral implementation and clean history after the device migration.
6. **MECON 1.0.1 milestone:** validate firmware end to end against the new public Backend and publish the accepted compatibility matrix.

The 0.8.1 / 0.9.1 / 1.0.1 names are existing **programme milestone names**. They are not downloads, dates, or a numeric upgrade instruction from today's independently numbered private beta. Release tags and upgrade ordering must be made unambiguous before artifacts are published.

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
