# Components

MeshContinuum has four primary components.

| Component | Responsibility |
|---|---|
| Backend | Ingests observations, reconciles packets and messages, performs authorized decryption, coordinates jobs and exposes application APIs |
| Reader | Provides the web experience for reading, diagnostics, enrollment, configuration and device actions |
| MQTT broker | Carries observations, gateway status and explicitly authorized management traffic between devices and backends |
| Firmware | Adds MECON connectivity and management to supported MeshCore devices while preserving their native role |

## Backend

The Backend owns the canonical application model. It distinguishes:

- a MeshCore packet;
- one or more receptions of that packet;
- a decrypted logical message;
- local delivery assistance;
- an optional outage-sync copy.

External packet feeds are Backend ingestion capabilities, not separate MECON components. These may include:

- any compatible Repeater/Observer source publishing a supported envelope;
- a permitted third-party MQTT broker or aggregator;
- another MECON backend exchanging versioned domain events.

Adapters must validate and normalize external envelopes before they enter the canonical packet pipeline.

## Reader

The Reader is a browser application for:

- inbox and channel reading;
- packet, route and reception diagnostics;
- Companion and Repeater enrollment;
- USB flashing and local device actions where supported;
- configuration templates and per-device overrides;
- Wi-Fi and MQTT profile management;
- gateway status and configuration capability display;
- deployment and source administration.

The Reader must clearly distinguish settings that can be changed remotely from those requiring a direct USB connection.

## MQTT broker

MECON uses MQTT as transport, not as the system of record.

A deployment may use:

- a broker alongside a hosted backend;
- a broker on a local network;
- several brokers for separate locales;
- an external broker as an inbound observation source.

Observation publication, integration traffic and device management are separate capabilities and should not implicitly share authority.

## Firmware

The initial first-party target is the **Heltec V3**.

Supported firmware roles are expected to report their actual MeshCore role and capabilities. Companion-only actions must not be shown for Repeaters, and Repeater telemetry or ping actions must not be presented as Companion messaging controls.

The Raspberry Pi Agent, BLE support, Heltec V4 and managed OTA are backlog work and are not part of the initial default path.

## Third-party compatibility

MECON may ingest packets produced by third-party repeaters and brokers when an adapter exists for their documented format. Ingestion compatibility does not grant remote-management authority over those devices.
