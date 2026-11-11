# mecon.cloud beta: if something goes wrong

*Private beta. Checked against the service's code on 8 November 2026.*

- **The sign-in link does not work.** A link works once and expires after 15 minutes, so request a new one on mecon.cloud. A link opened on another device signs in the browser or installed app that asked for it, not the one where the mail was opened.
- **The Reader shows no messages.** This is normal until one of your sources hears a packet. MECON cannot show traffic that none of its sources received.
- **A device shows offline.** It has not been heard for 10 minutes, the default. Check its power and its Wi-Fi. A board set up with **No Wi-Fi** shows offline whenever no Reader holds its cable, which is expected. Normal MeshCore radio operation continues without MECON. To be mailed when a device goes quiet, turn on **Offline alert** on the device's Status page.
- **A firmware update failed.** The gateway returns to its previous firmware by itself. If it does not come back within 10 minutes, open an Issue. Which boards are offered is on [beta board list](BETA_BOARDS.md).

## Reporting

| What | Where |
|---|---|
| A bug | [Issues](https://github.com/hoejriis/MeshContinuum/issues) |
| A question | [Discussions](https://github.com/hoejriis/MeshContinuum/discussions) |
| Anything security-related | [private vulnerability reporting](https://github.com/hoejriis/MeshContinuum/security/advisories/new) |

Include the Reader version (shown at the foot of the sidebar) and what you expected to happen. **Never paste keys, passwords or private messages.**

What is stored, and for how long: [Hosted beta data](HOSTED_BETA_DATA.md).
