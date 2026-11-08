# MeshContinuum — detailed product target

> **Reference: the detailed target design.** What is available now is on [availability](CAPABILITIES.md). For an introduction, start with [what MECON adds](WHY_MESHCONTINUUM.md).

**MeshContinuum (MECON)** is a hosted or self-hosted companion platform for [MeshCore](https://github.com/meshcore-dev/MeshCore). It adds a web Reader, packet aggregation, history, authorized decryption and remote device management while preserving independent MeshCore operation.

## Sister firmware project

[mecon-firmware](https://github.com/hoejriis/mecon-firmware) documents the open target firmware contract. It is deliberately usable without MeshContinuum. MeshContinuum is its reference Backend/Reader architecture, while device-facing contracts remain independently implementable.

Devices retain normal MeshCore operation when MECON infrastructure is unavailable.

## Cloud service

[mecon.cloud](https://mecon.cloud) is a hosted MeshContinuum service. Access is **Invitation Only**. It is one Deployment of MeshContinuum, not a mandatory dependency and not part of the firmware trust model.

## Benefits, components and deployment

These have one home each: [what MECON adds](WHY_MESHCONTINUUM.md), [how MECON works](COMPONENTS.md) and [deployment choices](DEPLOYMENT_MODES.md). The design points that follow from them:

- A local-only installation is a complete MECON Deployment. Cloud infrastructure is optional.
- A **Deployment** is one administrator and trust domain, with a permanent cryptographic identity. It grows from one local site to Internet brokers and further Backends without replacing the original installation.
- Broker transport and Backend federation are separate layers. Devices normally use one broker connection at a time, by priority and failover. Backends may connect to all the brokers their site needs at once.
- Brokers replicate only the operational MECON MQTT namespace needed for transport continuity. Authoritative application state converges separately, between trusted Backends.

## Deployment authority

A Deployment has a long-lived trust root and each Backend has its own instance identity. Devices trust a versioned set of Backend authorities authenticated by the Deployment rather than treating broker reachability or TLS credentials as administrative authority.

This separates:

- Deployment/Backend authority;
- MQTT transport credentials;
- Backend federation;
- application user authorization;
- device security posture;
- continuity/recovery authority.

Compromise or replacement of one layer therefore does not automatically grant the others.

## Backend federation

Backend instances are peers; there is no privileged cloud database primary. They converge Deployment state using versioned application-level events with stable origin/sequence identity, deterministic conflict handling and tombstones for deletions.

Federation replicates authoritative state and ingestion inputs rather than blindly copying every derived database row. Derived packet/observation/plaintext views can be regenerated locally. Operational jobs are not federated as executable work.

New or far-behind Backends may bootstrap from a verified snapshot and then continue incremental synchronization. Snapshot cursors represent logical reconciliation, not proof that every historic raw record is physically present on the receiver.

Accepted users/roles are Deployment state. Authentication sessions, magic links and API/agent tokens remain local to each Backend.

## MQTT transport model

MQTT over TLS/TCP and MQTT over secure WebSocket are equivalent MECON transports. Topics, authentication, ACL semantics, event identity and application behaviour are independent of socket transport.

Brokers are transport infrastructure, not MECON databases. They do not need MeshCore private identities, message/channel decryption keys or Deployment recovery authority simply to transport MECON MQTT traffic.

## Reader and management

Reader normally uses Backend APIs for inbox, history, enrollment, diagnostics and management. Where supported, it can also operate against a directly attached device according to that device's security posture.

MeshContinuum treats native MeshCore CLI/configuration semantics as canonical for native settings. MECON adds authorization, correlation, idempotency, auditing and transport adaptation rather than defining unrelated settings models for each transport.

## Continuity and recovery

Backend federation, backup and Deployment continuity are different concerns. The target architecture permits protected continuity material on eligible devices so a fresh Backend/Reader can re-establish an existing Deployment when ordinary infrastructure is unavailable.

Continuity material is deliberately narrow: it restores Deployment authority/rendezvous continuity, not a complete application/database backup. Recovery establishes continuity and then creates fresh operational credentials where appropriate.

## Privacy and ownership

MeshContinuum does not require a shared public MQTT hub. Each self-hosting administrator owns their Deployment infrastructure and credentials.

A Backend or Reader does not have to be publicly exposed. A hybrid installation may expose only its Internet MQTT rendezvous while application services and databases remain local/private.

No hosting provider is part of the protocol contract.

## Documentation

The ordered route through all pages is the [documentation index](README.md).

## Naming

- Product: **MeshContinuum**
- Shorthand: **MECON**
- Firmware project: **mecon-firmware**
- Project domain: **MeshContinuum.info**
- Hosted service: **mecon.cloud**

Private Deployment names are configuration, not protocol identity.