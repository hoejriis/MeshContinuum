# Project status

MeshContinuum is in early public development. This repository currently establishes the public name, product boundary and instance-neutral documentation while implementation is prepared for migration from the existing development repositories.

There is no generally supported MECON release yet.

## Cloud service — Invitation Only

**[mecon.cloud](https://mecon.cloud)** is the Render-deployed MECON cloud instance. Access is **Invitation Only**; there is no open registration.

The running cloud instance is distinct from a generally supported public MECON release. Administrator-managed email invitations, magic-link login for additional users and isolated user workspaces are planned work, not a claim of currently available functionality.

## Initial product scope

The first public baseline is:

- Backend;
- web Reader;
- MQTT broker integration;
- Heltec V3 firmware as the default first-party gateway path;
- ingestion from compatible Repeater/Observer sources;
- adapters for permitted third-party MQTT observation feeds.

## Active preparation

Before a supported release, the project needs:

- reviewed instance-neutral source migration;
- stable public configuration and protocol namespaces using MECON;
- reproducible packaging and deployment;
- security and privacy review;
- migration compatibility for existing installations;
- automated and hardware-backed acceptance tests;
- release, upgrade and rollback documentation.

## Backlog

The following do not block the initial baseline:

- BLE Companion access;
- Heltec V4 support;
- managed OTA;
- Raspberry Pi deployments and Pi Agent;
- additional hardware targets.

## Domains and naming

- Public name: **MeshContinuum**
- Shorthand: **MECON**
- Planned primary domain: **MeshContinuum.info**
- Cloud service: **[mecon.cloud](https://mecon.cloud)** — **Invitation Only**, hosted on Render

Private installations should use their own instance names and configuration outside the public source tree.
