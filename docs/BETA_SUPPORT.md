# mecon.cloud beta: if something goes wrong

*Private beta, 10 October 2026.*

- **The sign-in link does not work.** A link works once and expires after 15 minutes, so request a new one on mecon.cloud. A link opened on another device signs in the browser or installed app that asked for it, not the one where the mail was opened.
- **The Reader shows no messages.** This is normal until one of your sources hears a packet. MECON cannot show traffic that none of its sources received.
- **A device shows offline.** It has not reported for 10 minutes. Check its power and its Wi-Fi. Normal MeshCore radio operation continues without MECON. You are notified when a device goes offline and when it is back, unless you switched that off on the device's Status page.
- **A firmware update failed.** The gateway returns to its previous firmware by itself. If it does not come back within 10 minutes, open an Issue. Which boards are offered is on [mecon-firmware's beta board list](https://github.com/hoejriis/mecon-firmware/blob/main/docs/BETA_BOARDS.md).

## Reporting

| What | Where |
|---|---|
| A bug | [Issues](https://github.com/hoejriis/MeshContinuum/issues) |
| A question | [Discussions](https://github.com/hoejriis/MeshContinuum/discussions) |
| Anything security-related | [private vulnerability reporting](https://github.com/hoejriis/MeshContinuum/security/advisories/new) |

Include the Reader version (shown in Settings) and what you expected to happen. **Never paste keys, passwords or private messages.**

What is stored, and for how long: [Hosted beta data](HOSTED_BETA_DATA.md).
