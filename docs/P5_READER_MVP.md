# The MeshContinuum Reader — messaging across radio and network

The Reader is designed to bring familiar MeshCore conversations together with authorized history and network connectivity. Its source is public in [mecon-backend](https://github.com/hoejriis/mecon-backend), and an early build runs in a deployment restricted to the existing mecon.cloud users; it is not a public release. For what can be used today, see [availability](CAPABILITIES.md).

## What is changing

The Reader is a communication-first application for everyday MeshCore users. It will be a web app designed first for **Bluefy on iPhone and iPad**, using Web Bluetooth to communicate with an authorized Companion where supported. An authorized MECON Backend provides account/session authority, online messaging, history, MQTT and USB-agent services. The Reader and Backend communicate through a versioned application interface.

The Reader should feel familiar to anyone using the stock MeshCore app: chats, channels, contacts, Companion connection, composing and honest delivery status. **Familiar layout and workflows, original MECON code and branding.** The Reader follows [MeshCore One](https://github.com/Avi0n/MeshCoreOne) as closely as practicable in layout, navigation and workflows. Do not copy its source, screenshots, graphics or logo.

Use the established [MECON visual identity](BRAND.md), including the original mark, navy `#0D1736`, violet `#8B7CFF`, turquoise `#25D6C9` and light surface `#F5F7FB`, with documented contrast constraints.

## Messaging experience

- Bluefy Web Bluetooth connection to a supported Companion, with real iPhone/iPad hardware acceptance.
- Communication-first Reader with Chats (channels within Chats), Nodes, Map, Tools and Settings tabs, and the active Companion visible in the flow. Fleet management is a separate, web-only tool, deferred beyond this MVP.
- Optional Backend account login for authorized history and online messaging.
- Clearly distinguish Bluetooth connected, Backend connected, RF transmission and message acknowledgement.
- Explicit send path; no automatic duplicate BLE + Backend transmissions.
- Responsive mobile/tablet/desktop layout, preserving user familiarity.
- Enforce the established role model: **Device Users see messages to public/authorized channels and their assigned identities, not raw observation streams**. Fleet Owners and Instance Admins cannot read private messages assigned to other users.

A Fleet Owner may assign one user per device, including themselves; one user may have up to five devices.

**Delegated receive identities are a target, not shipped.** A primary Companion receiving for up to four of the user's other identities depends on work in both the Backend and [mecon-firmware](https://github.com/hoejriis/mecon-firmware), and on proof that stock-app conversation history and acknowledgements work on real phones and boards. It is not part of the first Reader experience, and nothing in the public firmware pre-releases or the hosted beta provides it today.

## What the first Reader is not

- Not a replacement for the stock MeshCore app, and not a new firmware protocol.
- Not a standalone, fully offline Reader. Direct Bluetooth may work while the Backend is unreachable, but offline authorization, secure local history and reconciliation with the Backend are later work.
- No Fleet Owner or Admin management, observation explorer or firmware update manager. Management is a separate, later, web-only tool.
- No access to private messages of identities assigned to other users, for anyone, including Fleet Owners and Admins.
- No raw observation streams for Device Users, and no online MQTT credentials in the Reader.
- No public Backend rewrite or migration, and no change to the hosted service at mecon.cloud.

## Extended capabilities

Fleet Owner and Admin management interfaces; richer diagnostics/observations; delegated identity completion; secure offline history and reconciliation; public Backend implementation and migration. These capabilities are part of the target architecture; see [availability](CAPABILITIES.md) for current status.

## Detailed software documentation

The authoritative working MVP specification is in the public [mecon-backend repository](https://github.com/hoejriis/mecon-backend):

- [Product vision](https://github.com/hoejriis/mecon-backend/blob/main/docs/PRODUCT_VISION.md)
- [Reader UX](https://github.com/hoejriis/mecon-backend/blob/main/docs/READER_UX.md)
- [Access model](https://github.com/hoejriis/mecon-backend/blob/main/docs/ACCESS_MODEL.md)
- [MVP architecture](https://github.com/hoejriis/mecon-backend/blob/main/docs/MVP1_ARCHITECTURE.md)
- [Reader availability and acceptance](https://github.com/hoejriis/mecon-backend/blob/main/docs/MVP1_PLAN.md)
- [Implementation design](https://github.com/hoejriis/mecon-backend/blob/main/docs/MVP1_IMPLEMENTATION_DESIGN.md)
- [Accepted architecture decisions](https://github.com/hoejriis/mecon-backend/blob/main/docs/ARCHITECTURE_DECISIONS.md)
- [Implementation work and its acceptance evidence](https://github.com/hoejriis/mecon-backend/issues), tracked in the public repository

Current product availability is documented in [Availability](CAPABILITIES.md).
