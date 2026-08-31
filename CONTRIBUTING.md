# Contributing to MeshContinuum

MeshContinuum is in early public development. Design discussion and focused issue reports are welcome.

## Before proposing code

Please preserve these boundaries:

- standard MeshCore operation must remain useful without MECON;
- public code must be instance neutral;
- the initial first-party hardware target is Heltec V3;
- external repeaters and brokers integrate through Backend ingestion adapters;
- management operations are explicit and allowlisted;
- backend federation uses versioned domain events rather than database replication.

Open an issue before making a change that affects wire protocols, persisted configuration, cryptographic trust, device management or backend federation.

## Pull requests

A pull request should include:

- the problem and intended behavior;
- tests appropriate to the change;
- compatibility and migration impact;
- documentation updates;
- hardware evidence when device behavior changes.

Do not commit credentials, private keys, real device identifiers, private domains or operator-specific deployment configuration.
