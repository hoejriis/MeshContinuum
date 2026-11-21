# MeshContinuum website — product story and content specification

This is the editorial source for the public mecon.cloud presentation page and other MeshContinuum landing pages. It describes the **target product**, not a release announcement. See [availability](CAPABILITIES.md) for current status and verified hardware. The presentation site must remain static and instance-neutral, under the existing [site integration contract](../site/CONTRACT.md).

## Audience and voice

Assume visitors have **never heard of MeshCore**. Be welcoming, plain-spoken and specific; avoid internal development terminology. MeshContinuum is an independent **non-profit, open-source-oriented** project seeking broad adoption and community participation, not a commercial hosted-service pitch. It is not affiliated with the MeshCore project. Never imply that MECON is needed for basic MeshCore messaging or that the Internet is required for the mesh to function.

## Proposed page structure and copy

### Header

The wordmark, three links (**Public map**, **How it works**, **Availability**) and a clearly visible **Sign in** that continues to the deployment's existing sign-in route; do not implement authentication in the site.

### Hero

**Text over radio. See your mesh online.**

MeshCore radios can pass text messages without mobile service or internet. MeshContinuum adds an optional web app for reading messages, seeing what the network heard and managing supported radios.

Primary action: **Explore the public map** (the map beside the hero; a build without the map offers **Find your starting point** instead). Secondary: **New to MeshCore?** (the in-page primer). Below them, the one availability notice: **Hosted beta by invitation.** with a **See what's available** link.

On a tablet or desktop the map sits beside the hero. On a phone the headline, the opening copy and both actions come first, then the map.

### Public activity map

The map has a legend, **How to read the map**, directly with it: beside it on wide screens, immediately below it on narrower ones. Each entry has a glyph and words, so nothing depends on colour alone:

- **Public radio** (dot): a radio whose location is included on the public map.
- **Recent activity** (pulse): a radio was heard, or a repeater passed a transmission on.
- **Heard by / passed to** (line): a line to a radio that heard it, or to the next identified repeater, depending on the event. A line shows a reported link.

Then: the map shows reports from participating sources, never message content; an empty area can still have radio activity; activity appears some seconds after it happens. The legend names the status badge's states (Live, Connecting or Reconnecting, Offline) and credits the activity sources and the map data.

### Find your starting point

Three cards answer the practical questions: **How radio messaging works** (to the primer), **What you can do in the Reader** (to the screenshots; qualified as the hosted beta), and **How to build or run it** (to the open projects; packaged self-hosting is planned). Beside the heading: your MeshCore radios work on their own; MeshContinuum is optional.

### How radio messaging works

MeshCore is a radio messaging system. A **Companion** is the radio you carry, connected to your phone or computer. A **Repeater** is a radio in a high spot that passes messages on so they reach further than one radio can. Radios communicate without mobile service or the internet. A message may still be missed if a radio is out of range, switched off or disconnected. Link to the upstream MeshCore project and [MeshCore primer](MESHCORE.md).

### What MECON adds

1. **Keep conversations familiar.** A Reader for contacts, direct messages and channels, with direct Companion connections and optional authorized online history. Explain when a message is queued, transmitted or acknowledged—never invent a read receipt.
2. **Make more of what the network hears.** Combine authorized reception evidence from multiple locations. Recover relevant history when it was heard elsewhere, without claiming perfect coverage or delivery.
3. **See how the network performs.** Understand device health, reception and radio conditions, with privacy-aware observation and an optional public activity map.
4. **Manage radios responsibly.** Fleet owners configure and maintain devices, but ownership never grants access to other users' private conversations.
5. **Run it your way.** Self-host on a small machine, extend across sites, or choose a hosted service. MeshCore radios continue to work independently.

### A look at the Reader in the beta

Screenshots from the beta, labelled as made-up demo data. The phone conversation comes first, with a caption that says only what the screenshot shows and explains its labels. The technical views (devices, receptions, settings) follow under their own subheading. Planned Fleet Owner or Admin views are never shown as available.

### How it fits together

Use a simple accessible diagram with **Radio network → Companions and Repeaters → optional MECON Backend → Reader and fleet tools**, plus a **direct Reader ↔ Companion Bluetooth** path. The optional broker and USB Connector belong in an expandable technical explanation, not the hero. Describe a Backend as a service that gathers authorized observations, stores permitted history and coordinates management; introduce the term only after explaining the benefit.

### Independence

A short note that MECON is an independent, non-profit project, built to share what works openly, and not affiliated with the MeshCore project. The trust and privacy detail lives in [trust and privacy](TRUST_AND_PRIVACY.md), linked from the footer.

### Documentation and open projects

- **New to radio messaging?** Read [MeshCore in brief](MESHCORE.md).
- **Want to understand MECON?** Read [what MECON adds](WHY_MESHCONTINUUM.md) and [architecture](ARCHITECTURE.md).
- **Want to build or integrate?** Visit [mecon-firmware](https://github.com/hoejriis/mecon-firmware) or [mecon-backend](https://github.com/hoejriis/mecon-backend).
- **Want to try it?** Check [availability](CAPABILITIES.md) and [getting started](GETTING_STARTED.md).

### Availability notice

Keep **one short, visibly linked notice**, in the hero: the hosted service is an invitation-only beta, and the public firmware and Reader are pre-releases. Never present target diagrams, sample Reader screenshots or public map fixtures as proven live capability. Link to [availability](CAPABILITIES.md) for exact release and hardware evidence.

## Public map presentation

The map may show only the approved **anonymous public projection** from the versioned observation contract. Until that contract is available, use clearly marked **synthetic demonstration data** or a static explanatory preview. Never render raw packets, private node IDs, precise private coordinates, source credentials, or unapproved observation feeds. Provide a useful empty/error state.

## Presentation and accessibility

Follow [brand](BRAND.md), preserve the existing site artifact routing, security headers, sign-in behavior and rollback contract. Use semantic headings, readable mobile/iPad/desktop layout, descriptive alt text, contrast, keyboard navigation and reduced-motion behavior. Images must not imply real traffic or shipped capabilities unless verified.

## Content ownership

This page is the website copy specification. [Product target](PRODUCT_TARGET.md), [architecture](ARCHITECTURE.md), [trust](TRUST_AND_PRIVACY.md) and [availability](CAPABILITIES.md) are its factual sources. Detailed firmware and application specifications remain in their own public repositories. Do not expose issue IDs, priority labels, private repository names, internal development practices, deployment secrets or personal information on the website.
