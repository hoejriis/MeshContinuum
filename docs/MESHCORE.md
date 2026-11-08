# MeshCore in brief

MECON is built around [MeshCore](https://github.com/meshcore-dev/MeshCore), so it helps to know what MeshCore is first. This page explains the terms the rest of these pages use, in our own words. For setup steps, follow MeshCore's own documentation, linked below. MeshContinuum is an independent project and does not speak for MeshCore.

## What MeshCore is

MeshCore is open-source firmware for small LoRa radios. The radios pass text messages to each other over long distances, with no mobile network, Internet or central server. A message hops from radio to radio until it reaches the people it is for. A town's mesh is simply the radios its people have switched on.

## The roles a radio can play

Each radio runs firmware for one role.

| Role | What it does |
|---|---|
| **Companion** | Your personal radio. It pairs with an app on your phone or computer, over Bluetooth, USB or Wi-Fi depending on the firmware you flash, and sends and receives your messages. |
| **Repeater** | A radio left on in a good spot, often high up, that forwards other people's messages to extend the mesh's reach. It does not forward everything it hears. It is administered remotely. |
| **Room server** | A small bulletin board on the mesh. It keeps posts, and gives you the recent ones you have not seen when you log in. |

**Observer** is not a MeshCore role. It is a community term for a radio, usually a Repeater, that also reports what it hears to an online service. MECON reads traffic from observers like these, as well as from your own radios.

## How messages travel

- **Adverts.** A radio announces itself with its name, its public key and, optionally, its position. Others add it to their contacts from the advert.
- **Direct messages** go to one contact and are encrypted for them.
- **Channels** are group conversations, encrypted with a key that everyone in the channel shares. MeshCore has a public channel whose key is published, so every radio can read it. Other channels can be read only by those who have their key.
- **Flood and direct routing.** A message to a contact with no known path is *flooded*: Repeaters that hear it pass it on, until a hop limit. Once a path is known, a message is sent *direct* along it, so fewer radios spend airtime on it. Channel messages have no single destination, so they flood.

## Radio presets

Every radio in a mesh must use the same radio settings (frequency, bandwidth, spreading factor and coding rate), or they cannot hear each other. The MeshCore apps offer named presets for different regions. Upstream describes them as suggestions: what matters is that you use the settings your local mesh uses, within your local radio regulations. Ask your local community which preset that is.

## Region Scopes

In a large mesh, a flooded message can travel much further than anyone needs it to. **Region Scopes** let Repeater operators define named regions, and decide which regions' traffic their Repeater forwards. A message can carry a region scope, and Repeaters forward it only within the regions they allow. Operators can also limit how far messages *without* a scope travel, or drop them. Region management arrived in MeshCore v1.10. Its commands are in the [Repeater CLI reference](https://github.com/meshcore-dev/MeshCore/blob/main/docs/cli_commands.md#region-management-v110).

MECON does not change how scopes work. An exploratory idea for a different, geographical approach is under [future concepts](GEOGRAPHICAL_FLOOD_SCOPES_PROPOSAL.md).

## What you need to begin

1. **A supported radio.** The boards MeshCore supports are listed in the [MeshCore web flasher](https://meshcore.io/flasher).
2. **Firmware for your role.** For your own messages, flash Companion firmware: the Bluetooth build for a phone, or the USB build for the web app. The web flasher does this from a desktop browser.
3. **An app.** Use the MeshCore app for Android or iOS, or the [web app](https://app.meshcore.nz). They are listed under "MeshCore Clients" in the [MeshCore README](https://github.com/meshcore-dev/MeshCore#readme).
4. **Your local settings.** Pick the radio preset your local mesh uses.
5. **A first message.** Send an advert so others see you, then say hello on the public channel. If nobody answers, nobody in range may be listening yet. A Repeater nearby, or the [MeshCore map](https://map.meshcore.io), shows where the mesh reaches.

Setting up a Repeater or Room server is a later step, done over USB with MeshCore's [web config tool](https://config.meshcore.io).

## Where to learn more

- [MeshCore documentation](https://docs.meshcore.io) and the [FAQ](https://github.com/meshcore-dev/MeshCore/blob/main/docs/faq.md)
- [MeshCore on GitHub](https://github.com/meshcore-dev/MeshCore), with its releases
- The [MeshCore Discord](https://meshcore.gg), where the project points newcomers for help

Next: [what MECON adds](WHY_MESHCONTINUUM.md).

*Checked against MeshCore's own documentation and its v1.18.0 releases on 8 November 2026.*
