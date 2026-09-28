# MeshContinuum Backend Target Contract 0.9

Status: **public pre-1.0 target architecture**.

This document describes the intended Backend behaviour of MeshContinuum. It is a target capability contract, not a claim that every item is implemented in the current public repository.

## 1. Deployment model

A **Deployment** is one administrative and cryptographic trust domain. It has a permanent Deployment identity and may contain multiple Backend instances, Readers, MQTT brokers and enrolled devices.

Backend instances are peers. Cloud is a location, not a privileged database role. A local-only Deployment is complete; additional sites and Internet brokers add reachability and resilience.

## 2. Deployment authority

The Deployment has a long-lived trust root used to authorize Backend instances. Each Backend has its own instance signing identity. Devices trust an authenticated, versioned authority set signed by the Deployment authority rather than trusting a broker address or TLS session as proof of administrative authority.

Consequences:

- broker/TLS credentials provide transport authentication, not Deployment authority;
- replacing a broker does not change Deployment identity;
- Backend instances can be added or revoked without sharing one ordinary operational private key;
- device commands carry enough authenticated context to establish that they originate from a currently authorized Backend;
- replay and stale-authority protection are part of the device-facing contract.

## 3. Backend federation

Trusted Backend instances converge application state through an application-level federation protocol. Federation is separate from MQTT broker replication and separate from database backup.

Federation uses immutable events identified by `(origin, seq)`. Each origin owns a monotonically increasing sequence. Receivers track per-origin cursors and apply events idempotently.

Versioned mutable records use deterministic conflict resolution based on a Hybrid Logical Clock (HLC) plus stable tie-break information. Deletion is represented by tombstones rather than immediate disappearance so that deletion converges across temporarily disconnected peers.

### 3.1 Replicated state

The target federation set includes Deployment-scoped authoritative state that another Backend needs to behave as an equivalent instance, including:

- accepted users and roles;
- enrolled device/Companion records and applicable management state;
- contacts and channel configuration/keys required for authorized interpretation;
- favourites and other Deployment-level user/application state designated as federated;
- Wi-Fi/configuration profiles and templates designated as Deployment state;
- authoritative raw ingested messages/observations at the ingestion boundary.

The exact versioned domain set is schema-versioned and may grow compatibly.

### 3.2 Derived state is regenerated

Federation should replicate authoritative inputs rather than every derived database product. In particular, raw ingested MQTT/source material is sufficient to regenerate derived packet, observation and authorized plaintext/message views where the relevant keys and rules are present.

Derived rows therefore do not become independent federation authorities merely because they are persisted locally for performance.

### 3.3 Raw-message identity and deduplication

A federation event occurrence is identified by `(origin, seq)`.

A `content_hash` derived from topic and payload may be used as a **temporal deduplication key**, but it is not a globally unique identity. Identical publishes outside the defined deduplication window are distinct occurrences. Implementations must not impose an unconditional uniqueness constraint on content hash.

### 3.4 Jobs are not federated as executable work

Operational command/OTA/configuration jobs are local execution state. Federation must never recreate an actionable job on another Backend merely because job history or related domain state is synchronized.

Stable request/job IDs and device-side idempotency protect against duplicate transport delivery; federation itself is not a second job queue.

## 4. Snapshot bootstrap and reconciliation

A new or far-behind Backend may bootstrap from a verified snapshot of current versioned Deployment state instead of replaying an unbounded event history.

A snapshot includes federation heads/cursors sufficient to continue incremental synchronization. Advancing a cursor from a snapshot means **logical reconciliation through that origin sequence**, not proof that every historical raw event through that sequence exists locally.

Implementations retain an explicit snapshot/history floor so APIs and audit tooling can distinguish complete local history from state reconstructed through a snapshot.

## 5. User identity and sessions

An accepted federated user record represents Deployment membership and role. Each Backend independently authenticates that user and creates its own local sessions/tokens.

Therefore:

- invitations and one-time login material are instance-local;
- sessions, magic-link tokens and agent/API tokens are not federated;
- once an accepted user record has converged, any Backend may authenticate that user using its local authentication mechanism;
- deleting/revoking a user must invalidate that Backend's local sessions for the user;
- a session whose referenced user no longer exists is invalid and must not inherit a privileged/default role.

## 6. MQTT transport fabric

MQTT is the operational transport between devices, sources and Backends. A Deployment may use local, primary cloud and secondary cloud brokers.

Brokers may replicate the defined MECON MQTT namespace to provide transport continuity. They are not authoritative application databases.

Backend instances may connect concurrently to the brokers appropriate to their site. IP-capable devices normally maintain one active broker session according to their configured priority/failover policy.

Broker reachability never grants Deployment authority by itself.

## 7. Reader relationship

Reader is the user-facing web/direct-device application. In normal connected operation it uses Backend APIs for inbox, history, management, enrollment and administration.

Where supported, Reader may also communicate directly with a physically attached device. Direct access uses the same logical management contract and authority model rather than inventing a second configuration semantics.

## 8. Device management

MeshContinuum treats native MeshCore CLI/configuration semantics as canonical for native MeshCore settings. MECON adds an authenticated command envelope, correlation, authorization, auditing, idempotency and transport adaptation.

The same logical operation may be transported over MQTT, Reader/USB, BLE where allowed, or secure MeshCore RF management. Transport does not redefine the setting.

Backend authorization and firmware posture are separate layers: an authorized Backend may manage a Hardened device through management paths permitted by that device posture.

## 9. Offline continuity and recovery

Deployment continuity is distinct from routine federation and from backup.

The target architecture supports protected continuity material on eligible Normal-posture devices so that a fresh Backend/Reader can re-establish the existing Deployment when ordinary infrastructure is unavailable. Physical access alone is not sufficient on Hardened devices, and moving a device into Hardened posture destroys its usable continuity authority while preserving ordinary Deployment membership/management trust.

The continuity package is versioned and protected. It contains only authority/rendezvous material required to recover or join the Deployment; it is not intended to become a general configuration or history backup.

Recovery establishes continuity, then creates fresh operational Backend/broker credentials as appropriate rather than blindly restoring every old credential.

## 10. Security boundaries

The following are deliberately separate:

1. **Deployment authority** — who may act as an authorized Backend.
2. **Backend federation** — how trusted Backends converge authoritative application state.
3. **MQTT transport** — how operational messages reach devices and Backends.
4. **Application authorization** — what an authenticated user may do.
5. **Device posture/capabilities** — which local and remote management surfaces a device exposes.
6. **Continuity/recovery authority** — what may re-establish a Deployment after infrastructure loss.

Possession of one credential does not automatically grant the others.

## 11. Local-first guarantee

MeshContinuum infrastructure is optional to MeshCore RF operation. Loss of Internet, cloud brokers or remote Backend instances must not turn MECON into an RF single point of failure.

A local Backend + Reader + broker can form a complete Deployment. Additional Backend instances and brokers improve availability and recovery but do not redefine the Deployment.

## 12. Non-goals of the Backend contract

The Backend contract does not require:

- a globally shared MECON MQTT service;
- a privileged cloud database primary;
- direct database replication between Backend instances;
- arbitrary remote shell access to devices;
- broker possession of MeshCore private identities or Deployment recovery authority;
- federation of local sessions, one-time login tokens or executable job queues;
- cloud availability for normal MeshCore RF communication.
