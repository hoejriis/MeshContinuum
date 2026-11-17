# MeshContinuum roadmap

MeshContinuum is designed to make decentralized MeshCore messaging easier to use, connect and maintain without making radio operation depend on a cloud service. This page describes how the product grows. For current releases, tested devices and limitations, see [availability](CAPABILITIES.md).

## A familiar Reader with more reach

The first application experience focuses on everyday messaging: contacts, direct messages, channels, Companion selection and clear send status. A compatible Companion can connect locally through Bluetooth where supported, while an authorized Backend can provide online history and messaging. These paths remain distinct, so an Internet connection is never confused with radio delivery.

Read about the [Reader experience](P5_READER_MVP.md) and [application design](https://github.com/hoejriis/mecon-backend/blob/main/docs/TARGET_ARCHITECTURE.md).

## Better-connected networks

MECON brings together authorized observations from devices and sites, retaining reception evidence and helping users recover messages heard elsewhere. Fleet operators gain telemetry, RF diagnostics, device configuration and management. A public map can show approved, privacy-filtered network activity without exposing private traffic.

## Firmware that remains independent

[mecon-firmware](https://github.com/hoejriis/mecon-firmware) extends MeshCore with generic device management, authenticated operations, signed updates, telemetry and transport-independent interfaces. It is usable with independent managers and does not require MECON.

The firmware's [integration guide](https://github.com/hoejriis/mecon-firmware/blob/main/docs/INTEGRATION.md) and [public contracts](https://github.com/hoejriis/mecon-firmware/blob/main/docs/contract/README.md) describe the device interface. Connected messaging, reconnect catch-up and RF health build on these generic capabilities. Fleet Management Channels and delegated receive identities extend the experience while preserving MeshCore interoperability.

## Local first, with optional reachability

A small self-hosted installation can operate locally with a Backend, Reader, broker and optional USB Connector. Trusted Backends can later cooperate across sites without requiring a privileged cloud primary. Hosted operation is a choice, not a prerequisite for the mesh.

Explore [deployment choices](DEPLOYMENT_MODES.md), [architecture](ARCHITECTURE.md), [trust and privacy](TRUST_AND_PRIVACY.md) and [availability](CAPABILITIES.md).

## Availability and release evidence

The roadmap is a description of intended capabilities, not a release announcement. Hardware support, software maturity and the invitation-only hosted beta are documented separately in [availability](CAPABILITIES.md) and the firmware's [hardware verification record](https://github.com/hoejriis/mecon-firmware/blob/main/docs/HARDWARE_VERIFIED.md).
