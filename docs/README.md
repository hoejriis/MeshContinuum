# MeshContinuum documentation

MeshContinuum (**MECON**) is an independent companion platform for MeshCore: Backend, web Reader and broker integration. Its sister project [mecon-firmware](https://github.com/hoejriis/mecon-firmware) provides the open device firmware and canonical device-facing contracts.

These documents describe the **public release target**, not temporary private-development limitations.

## Start here

- [Why MeshContinuum](WHY_MESHCONTINUUM.md)
- [Components](COMPONENTS.md)
- [Deployment modes](DEPLOYMENT_MODES.md)
- [Architecture](ARCHITECTURE.md)
- [Project status and release target](PROJECT_STATUS.md)

For firmware architecture, hardware support, direct USB/BLE behavior, MQTT/device settings contracts and firmware security, use the documentation in [mecon-firmware](https://github.com/hoejriis/mecon-firmware).

## Cloud service

[mecon.cloud](https://mecon.cloud) is an Invitation Only hosted MeshContinuum deployment. It is not required by the firmware or by self-hosted MeshContinuum installations.

## Exploratory proposals

These discuss possible upstream MeshCore changes and are not MECON release commitments:

- [Geographical flood scopes and dynamic Repeater load adaptation](GEOGRAPHICAL_FLOOD_SCOPES_PROPOSAL.md)

## Naming

- **MeshContinuum** — application project/product.
- **MECON** — shared technical shorthand.
- **mecon-firmware** — independent firmware sister project.
- **MeshContinuum.info** — project domain.
- **mecon.cloud** — hosted MeshContinuum service.

Private installation names are configuration and never protocol/product identity.