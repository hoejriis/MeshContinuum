# Product message: maintainer brief

This is the editorial brief for maintainers. It sets the product message that the README, these docs and the presentation site share. It is not a product page. Readers should start at the [README](../README.md). It keeps no status of its own: what is available is on [availability](CAPABILITIES.md) only.

The visual identity (mark, palette and files) is in the [brand guide](BRAND.md).

## Purpose

MECON is an independent, exploratory, non-commercial project. It exists to experiment with how independent MeshCore radios, observations, identities and sites can work together, and to share what is learned so others reuse it, try it and contribute. It has no revenue objective. mecon.cloud may one day ask for voluntary help with hosting costs; that is not a subscription or a business model, and copy never presents it as one.

## Audiences

The three places share the same facts and boundaries, but not the same reader:

| Where | Reader | Approach |
|---|---|---|
| mecon.cloud | Someone who has never heard of MeshCore | Explain MeshCore in plain words before any MECON term (Companion, observer, Reader, Backend, broker). Lead with what it makes possible |
| This repository's docs | Someone who already uses MeshCore | Start from recognisable MeshCore situations and what MECON adds to them. [MeshCore basics](MESHCORE.md) is an optional reference, not the opening |
| mecon-firmware's docs | Developers and integrators | Present generic improvements to stock firmware that any manager can use. MeshContinuum is one manager among many |

## Hero

**MeshCore, without the boundaries of a single device.**

Your mesh stays independent. MECON makes it more useful when connected.

Bring messages captured by your Companions and configured observer sources into one web Reader. Keep history, understand reception and manage supported devices, while normal MeshCore radio operation stays independent of the Internet.

Actions:
- **Explore the project** → https://github.com/hoejriis/MeshContinuum
- **Express beta interest** → https://github.com/hoejriis/MeshContinuum/issues/new?template=beta-interest.yml
- **Sign in**, for existing users → the deployment's own sign-in route. The site links to it and holds no sign-in logic.

## Benefit cards

**One Reader, more reception.** See traffic captured by the sources available to your deployment. Keep one message with its reception evidence, even when several observers hear it.

**Manage devices remotely.** Check connectivity and health, configure supported devices and send through an authorised Companion gateway. The actions available depend on the device.

**Your infrastructure, your control.** MECON is free and intended for open-source release. Run it hosted, at home, or across several sites. mecon.cloud is one deployment, not a required service.

## The availability notice

Product copy describes the experience as designed. One short notice, and only one, says where things stand, and links to [availability](CAPABILITIES.md). It never promises a date, open registration, a supported release or an installable Backend. When availability changes, the notice and that page change together, and nothing else carries status.

## Screenshots

Use real screenshots from the application, with synthetic identities, places and messages. Caption every one with the version shown in the Reader at capture, the date, and that the data is made up. Do not publish mockups as product evidence.

The current set was captured on 9 October 2026, on a build whose Reader showed **v0.193.0**, with synthetic demo data. That build already carried the Reader wording first released in v0.194.0. Captions say v0.193.0, because that is the version the images show.

## Editorial boundaries

Do not imply:
- open registration or a launch date;
- downloads that do not exist;
- guaranteed reception or delivery;
- support for every board or browser;
- a Reader that works without a Backend;
- operator-blind hosted decryption;
- a live map or live counters before a real public feed is deployed;
- autonomous outage forwarding or the earlier beta firmware's sync channel as planned work (both are retired);
- a commercial offer, subscription or sales funnel.

"Free and open source" is the release intent. The firmware's source is public. The Backend's is not yet.

The site and the docs must stay usable on phones and iPads.
