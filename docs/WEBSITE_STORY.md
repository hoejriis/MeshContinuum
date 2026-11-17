# MeshContinuum website — product story and content specification

This is the editorial source for the public mecon.cloud presentation page and other MeshContinuum landing pages. It describes the **target product**, not a release announcement. See [availability](CAPABILITIES.md) for current status and verified hardware. The presentation site must remain static and instance-neutral, under the existing [site integration contract](../site/CONTRACT.md).

## Audience and voice

Assume visitors have **never heard of MeshCore**. Be welcoming, plain-spoken and specific; avoid internal development terminology. MeshContinuum is an independent **non-profit, open-source-oriented** project seeking broad adoption and community participation, not a commercial hosted-service pitch. It is not affiliated with the MeshCore project. Never imply that MECON is needed for basic MeshCore messaging or that the Internet is required for the mesh to function.

## Proposed page structure and copy

### Hero

**A stronger mesh network, without giving up control.**

**MeshContinuum (MECON) helps people and communities connect, understand and manage decentralized radio messaging networks.** Use the radios you already have, keep communicating when the Internet is unavailable, and add shared observation, authorized history and device management when you choose.

Primary action: **Explore how it works** (scroll to explainer). Secondary: **Explore the open projects** (public repositories). A discreet **Sign in** link continues to the deployment's existing sign-in route; do not implement authentication in the site.

### First, what is MeshCore?

MeshCore is a radio-based messaging system. A **Companion** is the radio connected to your phone or computer. **Repeaters** relay messages so they can travel beyond the reach of a single radio. Radios communicate without cellular service or the Internet. A message may still be missed if a radio is out of range, asleep or disconnected. Link to the upstream MeshCore project and [MeshCore primer](MESHCORE.md).

### What MECON adds

1. **Keep conversations familiar.** A Reader for contacts, direct messages and channels, with direct Companion connections and optional authorized online history. Explain when a message is queued, transmitted or acknowledged—never invent a read receipt.
2. **Make more of what the network hears.** Combine authorized reception evidence from multiple locations. Recover relevant history when it was heard elsewhere, without claiming perfect coverage or delivery.
3. **See how the network performs.** Understand device health, reception and radio conditions, with privacy-aware observation and an optional public activity map.
4. **Manage radios responsibly.** Fleet owners configure and maintain devices, but ownership never grants access to other users' private conversations.
5. **Run it your way.** Self-host on a small machine, extend across sites, or choose a hosted service. MeshCore radios continue to work independently.

### How it fits together

Use a simple accessible diagram with **Radio network → Companions and Repeaters → optional MECON Backend → Reader and fleet tools**, plus a **direct Reader ↔ Companion Bluetooth** path. The optional broker and USB Connector belong in an expandable technical explanation, not the hero. Describe a Backend as a service that gathers authorized observations, stores permitted history and coordinates management; introduce the term only after explaining the benefit.

### Trust and independence

**Observing a packet is not permission to read its message.** A user's assigned identities and channels govern message access. Administrators see operational information, not a privileged private-message inbox. Explain the limits honestly: a Backend entrusted with a user's keys can technically decrypt their authorized messages; application permissions prevent administrator APIs from reading other users' content. Link to [trust and privacy](TRUST_AND_PRIVACY.md).

### Choose your entry point

- **New to radio messaging?** Read [MeshCore in brief](MESHCORE.md).
- **Want to understand MECON?** Read [what MECON adds](WHY_MESHCONTINUUM.md) and [architecture](ARCHITECTURE.md).
- **Want to build or integrate?** Visit [mecon-firmware](https://github.com/hoejriis/mecon-firmware) or [mecon-backend](https://github.com/hoejriis/mecon-backend).
- **Want to try it?** Check [availability](CAPABILITIES.md) and [getting started](GETTING_STARTED.md).

### Availability notice

Keep **one short, visibly linked notice**: the hosted service is invitation-only beta; public firmware offers pre-release artifacts; the public application is being developed. Never present target diagrams, sample Reader screenshots or public map fixtures as proven live capability. Link to [availability](CAPABILITIES.md) for exact release and hardware evidence.

## Public map presentation

The map may show only the approved **anonymous public projection** from the versioned observation contract. Until that contract is available, use clearly marked **synthetic demonstration data** or a static explanatory preview. Never render raw packets, private node IDs, precise private coordinates, source credentials, or unapproved observation feeds. Provide a useful empty/error state.

## Presentation and accessibility

Follow [brand](BRAND.md), preserve the existing site artifact routing, security headers, sign-in behavior and rollback contract. Use semantic headings, readable mobile/iPad/desktop layout, descriptive alt text, contrast, keyboard navigation and reduced-motion behavior. Images must not imply real traffic or shipped capabilities unless verified.

## Content ownership

This page is the website copy specification. [Product target](PRODUCT_TARGET.md), [architecture](ARCHITECTURE.md), [trust](TRUST_AND_PRIVACY.md) and [availability](CAPABILITIES.md) are its factual sources. Detailed firmware and application specifications remain in their own public repositories. Do not expose issue IDs, priority labels, private repository names, internal development practices, deployment secrets or personal information on the website.
