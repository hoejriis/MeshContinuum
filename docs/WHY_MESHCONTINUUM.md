# What MECON adds

MeshCore works without any cloud, and that is its strength. A radio, though, only knows what it heard itself, and only while it was switched on and in range. MeshContinuum (MECON) explores what happens when your radios, the observers you choose, your identities and your sites pool what they hear. Your mesh keeps working exactly as before. MECON makes it more useful when it is connected.

This page assumes you know MeshCore. If not, start with [MeshCore in brief](MESHCORE.md). What is available today is on [availability](CAPABILITIES.md).

## One network, many receivers

**You read your messages in one place.** Your Companion was switched off overnight, or out of range on a trip. A home gateway or an observer heard the message to you, and the MECON Reader has it in the morning, on your phone or your desktop. MECON can only show what one of its sources heard.

**One message, not three copies.** When three radios hear one message, you see one message, with each of the three receptions: which observer heard it, along which path of Repeaters, and how strong the signal was.

**Your history is not tied to one phone.** Messages, channels and their history live with your MECON installation, not in one app on one device. Sign in from a new phone and the history is already there.

## See how your mesh reaches

**Paths and coverage, from many points of view.** Receptions from many observers show which Repeaters carry traffic, where a path fails and which nodes are heard rarely. That tells you where your mesh is strong and where it is thin. It shows what observers heard, not every radio that exists, and a node heard by one observer is not necessarily near it.

**Health reports over radio.** A node can send a small signed report over LoRa on a schedule, so you know it is alive even with no IP link. Silence alone does not prove it failed.

## Look after a fleet

**You manage your radios from anywhere.** See which of your devices are online, their battery, uptime and firmware, and when each was last heard. Configure a supported Companion, Repeater or Room server, update its firmware, and get a mail when one goes quiet. A device's firmware, board and role decide what can be done with it.

**Sites with no Internet.** A device that only radio can reach is still managed over LoRa, with every change signed. Each fleet has one private management channel that all its devices join. Anyone on it can send `ping` from a stock app and get a short status from each device, but being on the channel grants no right to change anything.

**Several fleets, kept apart.** One installation can serve several independent fleet owners. No key, command or status crosses between fleets.

## Your identities, across devices and places

**You send through a radio at home.** From the Reader, send a message through a Companion that acts as your gateway. Your message goes out over RF from that radio, and the Reader shows what became of it.

**One Companion, several of your identities.** The Companion you carry keeps its own identity, and can also receive for up to four of your others, such as a car, cabin or spare Companion. A message to any of them reaches you in the stock app's normal conversation, and the sender gets the usual acknowledgement. It never sends an ordinary message as one of them.

**You choose where it runs.** Use a hosted service such as [mecon.cloud](https://mecon.cloud), run it on a small computer at home, or connect several sites. See [deployment choices](DEPLOYMENT_MODES.md).

## What it does not change

MECON is not a new radio protocol, and you do not need it to use MeshCore. A radio set up with MECON keeps working as an ordinary MeshCore radio when the Reader is closed, the broker is unreachable, the Internet is down, or MECON is switched off for good.

The Reader needs its Backend, a server it talks to. It can attach a radio directly over USB or Bluetooth from a desktop browser, but it reads your history through the Backend.

## Who it is for

- **MeshCore users** who want their messages on more than one device, and history that does not depend on one radio being on.
- **Operators of Repeaters and gateways** who want to see their devices' health, configure them and update them, without climbing to each one.
- **Communities** that want to understand their mesh's coverage from many observers' receptions.

## Design principles

1. **Offline first.** RF messaging stays useful without MECON.
2. **Standards compatible.** MECON works around standard MeshCore roles and packets.
3. **Graceful degradation.** Losing one service loses only the help that service gave.
4. **You decide.** Identities, channel keys, brokers and where things run are each enrolled on purpose.
5. **Many sources.** A packet may be heard by your gateways, by others' Repeaters, or by community MQTT feeds.
6. **No mandatory cloud.** A hosted service is one option, not a dependency of the protocol.
7. **Instance neutral.** Public MECON code and contracts carry no operator's names, domains or configuration.
8. **Shared, not sold.** MECON is an independent, non-commercial experiment, made to learn, share and invite reuse. It has no revenue objective. mecon.cloud may one day ask for voluntary help with hosting costs; that is not a business model.

Next: [how MECON works](COMPONENTS.md) · [trust and privacy](TRUST_AND_PRIVACY.md) · [deployment choices](DEPLOYMENT_MODES.md)
