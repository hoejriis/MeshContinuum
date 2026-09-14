# Project status and public release target

MeshContinuum and its sister project [mecon-firmware](https://github.com/hoejriis/mecon-firmware) are being prepared for a coordinated public release. These public repositories describe the **supported release target**, not the incidental limitations of the current private development deployments.

There is not yet a generally supported public release.

## Release boundary

The public product is intentionally split:

- **MeshContinuum** — Backend, web Reader and broker/deployment integration.
- **mecon-firmware** — independent open firmware plus canonical device-facing contracts.

MeshContinuum is the reference implementation of the firmware contract, not its owner. Other projects may integrate with mecon-firmware directly.

## Firmware baseline for release

The coordinated release target includes:

- Heltec V3 and V4 Companion/Repeater targets after hardware gates;
- native/offline MeshCore operation;
- 64-contact Companion profile;
- Wi-Fi, USB and Companion BLE enabled in the normal build;
- up to three Wi-Fi profiles;
- up to two independently authorized MQTT brokers;
- remote observations, messaging and management according to capabilities;
- signed managed OTA;
- direct desktop Chrome/Edge Companion access over USB/BLE;
- direct Repeater USB management/observation;
- backend-neutral versioned firmware contracts.

## MeshContinuum baseline for release

The application target includes:

- Backend and web Reader;
- MQTT broker integration;
- packet/observation history and diagnostics;
- authorized Companion identity/channel decryption;
- messaging and device management through the public firmware contract;
- firmware flashing/configuration and managed OTA;
- direct Reader operation and browser-agent bridge;
- standalone direct operation with later synchronization;
- hosted and self-hosted deployment paths.

## Cloud service

[mecon.cloud](https://mecon.cloud) is an Invitation Only hosted deployment. It is not a firmware dependency or a condition for self-hosting.

## Release preparation gates

Before declaring the coordinated release generally supported:

- migrate reviewed source into the public repositories;
- make MECON naming and device contracts canonical and instance-neutral;
- resolve the adjustments documented in `mecon-firmware/docs/CONTRACT_MIGRATION_NOTES.md`;
- run cross-repository contract tests;
- pass hardware gates for every advertised firmware target;
- complete security/privacy review;
- verify install, upgrade, OTA rollback/recovery and direct-connect paths;
- publish reproducible artifacts and release documentation.

## Future work not required for the first release

Additional hardware beyond Heltec V3/V4, Repeater BLE, mobile-browser direct connectivity where browser platforms do not expose the required APIs, and broader ecosystem integrations may follow later.