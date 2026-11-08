# MeshContinuum documentation

Read in order, or jump to what you need. What is available today is on one page: [availability](CAPABILITIES.md).

## 1. MeshCore

- [MeshCore in brief](MESHCORE.md): what MeshCore is, its roles, channels and presets, and what you need to begin.

## 2. What MECON is

- [What MECON adds](WHY_MESHCONTINUUM.md): what it is like to use, who it is for, and what it does not change.
- [How MECON works](COMPONENTS.md): the Backend, Reader, broker and firmware, and who does what.
- [Trust and privacy](TRUST_AND_PRIVACY.md): what a hosted service can read, and the separate permissions.

## 3. Using and deploying MECON

- [Deployment choices](DEPLOYMENT_MODES.md): hosted, a home site, several sites, or the firmware alone.
- The mecon.cloud beta:
  - [getting started](GETTING_STARTED.md)
  - [boards and firmware](BETA_BOARDS.md)
  - [support](BETA_SUPPORT.md)
  - [what is stored and who can read it](HOSTED_BETA_DATA.md)

## 4. Limitations and future concepts

- [Limitations](LIMITATIONS.md): what MECON cannot do, or does only under conditions.
- [Availability](CAPABILITIES.md): what exists today, in detail.
- [Roadmap](ROADMAP.md): what is planned, and the gates before each step.
- [Geographical flood scopes and dynamic Repeater load adaptation](GEOGRAPHICAL_FLOOD_SCOPES_PROPOSAL.md): an exploratory idea for MeshCore routing. Not a MECON plan.

## 5. Reference

For contributors and implementers. These pages describe the target design.

- [Architecture](ARCHITECTURE.md)
- [Backend target contract 0.9](BACKEND_TARGET_CONTRACT_0.9.md)
- [Detailed product target](PRODUCT_TARGET.md)
- [Contributing](../CONTRIBUTING.md)
- [Security reporting](../SECURITY.md)
- [Product message: maintainer brief](PRODUCT_MESSAGING.md)
- [Presentation site](../site/README.md) and its [integration contract](../site/CONTRACT.md)

The device contract belongs to the sister [mecon-firmware](https://github.com/hoejriis/mecon-firmware) project.

## Naming

**MeshContinuum** is the product, and **MECON** its shorthand. **mecon-firmware** is the firmware project, **MeshContinuum.info** the project domain, and **mecon.cloud** the hosted service. Private installation names are configuration, not product or protocol identity.
