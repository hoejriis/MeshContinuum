# Contributing to MeshContinuum

Documentation, use cases and contract review are welcome now. This repository does not yet contain application source; please do not assume a code contribution or local build path exists.

## Choose a useful first contribution

- Clarify an unfamiliar term or a step a new operator cannot follow.
- [Report a problem or ask a question](https://github.com/hoejriis/MeshContinuum/issues/new?template=feedback.yml).
- [Describe a use case](https://github.com/hoejriis/MeshContinuum/issues/new?template=use-case.yml).
- [Express beta interest](https://github.com/hoejriis/MeshContinuum/issues/new?template=beta-interest.yml). Access remains invitation only, with no announced date.
- Review the public device contract in [mecon-firmware](https://github.com/hoejriis/mecon-firmware).

**Issues or Discussions?** Use [Discussions](https://github.com/hoejriis/MeshContinuum/discussions) for questions (Q&A), ideas and general conversation, and Issues for a specific documentation problem, use case or the beta-interest form above. Firmware-specific technical discussion belongs in [mecon-firmware's Discussions](https://github.com/hoejriis/mecon-firmware/discussions). Search first. Never include secrets or private traffic; use [SECURITY.md](SECURITY.md) for vulnerabilities.

## Documentation pull requests

State the reader's problem, your change and which links or claims you checked. Keep capability claims consistent with [the shared matrix](docs/CAPABILITIES.md). Label target behavior as target behavior. Screenshots must use sanitized or synthetic data and identify their version/date.

## Design boundaries

Preserve ordinary offline MeshCore operation, instance-neutral product configuration and backend-neutral firmware contracts. V3/V4 Companion/Repeater are intended hardware targets subject to individual acceptance. Device actions are explicit, authorized and capability-aware. Federation uses versioned application events.

Discuss changes to wire protocols, persisted data, trust or device management before implementation. Later code PRs will need proportionate tests, compatibility/migration notes and real hardware evidence where applicable.

Contributions to this repository use its [Apache-2.0 licence](LICENSE). Firmware is licensed separately.
