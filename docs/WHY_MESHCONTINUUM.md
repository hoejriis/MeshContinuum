# What MECON adds

MeshCore works without any cloud, and that is its strength. A radio, though, only knows what it heard itself, and only while it was switched on and in range. MeshContinuum (MECON) collects what your radios and the observers you choose hear, and keeps it in one place. Your mesh keeps working exactly as before. MECON makes it more useful when it is connected.

New to MeshCore? Start with [MeshCore in brief](MESHCORE.md).

## What it is like to use

**You read your messages in one place.** Your Companion was switched off overnight, or out of range on a trip. A home gateway or an observer heard the message to you, and the MECON Reader has it in the morning, on your phone or your desktop. MECON can only show what one of its sources heard.

**You see how a message reached you.** When three radios hear one message, you see one message, with each of the three receptions: which observer heard it, along which path of Repeaters, and how strong the signal was. That tells you where your mesh is strong and where it is thin.

**Your history is not tied to one phone.** Messages, channels and their history live with your MECON installation, not in one app on one device. Sign in from a new phone and the history is already there.

**You manage your radios from anywhere.** See which of your devices are online, their battery, uptime and firmware, and when each was last heard. Configure a supported Companion or Repeater, update its firmware, and get a mail when one goes quiet. A device's firmware, board and role decide what can be done with it.

**You send through a radio at home.** From the Reader, send a message through a Companion that acts as your gateway. Your message goes out over RF from that radio, and the Reader shows what became of it.

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

Next: [how MECON works](COMPONENTS.md) · [trust and privacy](TRUST_AND_PRIVACY.md) · [deployment choices](DEPLOYMENT_MODES.md)
