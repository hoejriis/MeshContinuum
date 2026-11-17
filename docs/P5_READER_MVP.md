# P5 — Bluefy-first MECON Reader

**Status: target design and documentation, 17 November 2026. Not yet implemented.**

## What is changing

The public MECON application will begin with a **new Reader for everyday MeshCore users**, rather than a simultaneous rebuild of the Backend and Reader. It will be a web app designed first for **Bluefy on iPhone and iPad**, using Web Bluetooth to communicate with an authorized Companion where supported. The **existing private Backend** will initially provide account/session authority, online messaging, history, MQTT and USB-agent services. A future public Backend will implement the same versioned Reader-facing contract.

The Reader should feel familiar to anyone using the stock MeshCore app: chats, channels, contacts, Companion connection, composing and honest delivery status. **Familiar tasks and terminology, original MECON design.** Do not copy stock app code, screenshots, graphics, logo or exact layouts.

Use the established [MECON visual identity](BRAND.md), including the original mark, navy `#0D1736`, violet `#8B7CFF`, turquoise `#25D6C9` and light surface `#F5F7FB`, with documented contrast constraints.

## First MVP

- Bluefy Web Bluetooth connection to a supported Companion, with real iPhone/iPad hardware acceptance.
- Communication-first Reader: chats/DMs, channels, contacts, active Companion, account/settings.
- Optional Backend account login for authorized history and online messaging.
- Clearly distinguish Bluetooth connected, Backend connected, RF transmission and message acknowledgement.
- Explicit send path; no automatic duplicate BLE + Backend transmissions.
- Responsive mobile/tablet/desktop layout, preserving user familiarity.
- Enforce the established role model: **Device Users see messages to public/authorized channels and their assigned identities, not raw observation streams**. Fleet Owners and Instance Admins cannot read private messages assigned to other users.

A Fleet Owner may assign one user per device, including themselves; one user may have up to five devices. The primary Companion receiving for up to four additional identities is a **later gated feature** (firmware #552 / private Backend #1793), not an MVP prerequisite.

## Later phases

Fleet Owner and Admin management interfaces; richer diagnostics/observations; delegated identity completion; secure offline history and reconciliation; public Backend implementation and migration. No production migration or deployment is authorized by this documentation.

## Implementation documentation

The authoritative working MVP specification is in the newly created public [mecon-backend repository](https://github.com/hoejriis/mecon-backend):

- [Product vision](https://github.com/hoejriis/mecon-backend/blob/main/docs/PRODUCT_VISION.md)
- [Reader UX](https://github.com/hoejriis/mecon-backend/blob/main/docs/READER_UX.md)
- [Access model](https://github.com/hoejriis/mecon-backend/blob/main/docs/ACCESS_MODEL.md)
- [MVP architecture](https://github.com/hoejriis/mecon-backend/blob/main/docs/MVP1_ARCHITECTURE.md)
- [MVP delivery and acceptance](https://github.com/hoejriis/mecon-backend/blob/main/docs/MVP1_PLAN.md)

Track planning in [public documentation #33](https://github.com/hoejriis/MeshContinuum/issues/33) and [private Backend P5 umbrella #35](https://github.com/hoejriis/deimos-mesh/issues/35). Product availability claims remain governed by [Availability](CAPABILITIES.md).
