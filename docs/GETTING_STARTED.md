# Get started with the mecon.cloud beta

This is the practical guide to the [hosted](DEPLOYMENT_MODES.md#hosted-one-companion-on-a-hosted-service) way of using MECON, on the mecon.cloud private beta. For the other ways, see [deployment choices](DEPLOYMENT_MODES.md).

## Before you are invited

[mecon.cloud](https://mecon.cloud) is invitation only, and no opening date is announced.

1. Read [what MECON adds](WHY_MESHCONTINUUM.md) and [trust and privacy](TRUST_AND_PRIVACY.md).
2. [Express interest in testing](https://github.com/hoejriis/MeshContinuum/issues/new?template=beta-interest.yml). Describe the problem you want to solve, your hardware and role, and your browser or operating system. An interest issue is a public conversation. It does not create an account, guarantee an invitation, or hold a place in a queue.
3. Watch the repository to follow progress.

## When you are invited

The maintainer gives you access and tells you which beta version and boards apply. A good first session ends with one result you can understand: traffic in the Reader, and its reception details showing where it came from.

## Adding your devices

Reading your messages and managing a radio are separate steps. In the Reader, open **Devices**, then the **Add** menu:

| Item | What it does |
|---|---|
| **Add Standalone Companion** | Adds a Companion's private key, so the Reader can decrypt its messages. No USB, and no device management. |
| **Add Standalone Repeater** | Follows an ordinary MeshCore Repeater heard on air, by its name and public key. Monitoring only. |
| **Configure** | Connects to a MECON device on USB, configures it and enrols it. |
| **Set up public-firmware device** | Gives a device running the public [mecon-firmware](https://github.com/hoejriis/mecon-firmware) its Wi-Fi, broker login and enrolment, over USB. |
| **Flash** | Installs or upgrades MECON firmware on a supported Heltec board, over USB. |

The USB items need desktop Chrome or Edge. Which boards the beta offers is on the [beta board list](BETA_BOARDS.md). Channels are added by the installation's owner.

Before you add a private key, read [what mecon.cloud stores and who can read it](HOSTED_BETA_DATA.md). Never put a private key or channel secret in an issue. If something goes wrong, see [beta support](BETA_SUPPORT.md).

## What you will see

Once signed in, the Reader shows the channels the installation reads, and the direct messages of the Companions you enrolled. Each message is kept once, with every reception that heard it. Much of what you see is heard by public observer feeds the installation subscribes to, not only by your own radio. A message's reception details say which observers heard it. If you manage devices, the Devices list shows each one's connection and health.

The [screenshots](../README.md#one-reader-more-reception) show what this looks like, with made-up data. Your own Reader shows live traffic, and its sidebar shows the version it runs.

An empty Reader before your sources have heard anything is normal. It means no packet has been received yet, not that something failed.

## Browser and radio

Reading through mecon.cloud works in any modern browser, on a phone or a desktop, and the Reader can be installed on a phone's home screen. Attaching a radio directly over USB or Bluetooth needs desktop Chrome or Edge, where the board supports it. An iPhone or iPad browser can show the Reader but cannot flash or attach a radio.

## Useful feedback

Say what you were trying to do, where you got stuck, what you expected, and what happened. Include the Reader's version, and sanitised screenshots where they help.
