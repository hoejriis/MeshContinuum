# Limitations

What MECON cannot do, or does only under conditions, stated plainly. This page is about how the product behaves. What is available today is on [availability](CAPABILITIES.md), and what is planned is in the [roadmap](ROADMAP.md).

## Reception and delivery

- **MECON shows only what its sources heard.** If none of your radios and none of the installation's observers heard a packet, MECON does not have it and cannot recover it. Observer feeds do not guarantee coverage anywhere.
- **Sending is not delivery.** A message sent through a gateway shows when the gateway took it and what came back over RF. Taken and received are different things, and MECON does not guarantee delivery.
- **An empty Reader is not an error.** It means no source has heard anything for you yet.

## The Reader

- **The Reader needs its Backend.** It reads your messages and history through a Backend it can reach. Without one, it shows nothing. A Reader that works fully on its own is not part of the design yet.
- **Attaching a radio needs a desktop browser.** Flashing, configuring or attaching a radio over USB or Bluetooth needs desktop Chrome or Edge, and a board that supports that connection. An iPhone or iPad can show the Reader, but cannot attach a radio.

## Devices

- **What you can do depends on the device.** Its firmware, board and role decide which actions it offers. A Repeater cannot send messages as a Companion.
- **Repeaters and Room servers have no Bluetooth**, by design. They are managed locally over USB.
- **Some boards update only over USB.** In the beta, the SenseCAP T1000-E and the Wio Tracker L1 cannot be updated over the air.
- **A gateway's Wi-Fi companion port is unprotected.** It is off by default. When it is on, anyone on that network can use it, so switch it on only on a network you trust.
- **Only tested boards are offered.** A board that only builds is not offered, and other boards and revisions, such as the Heltec V4 R8, are not supported. See the [beta boards](BETA_BOARDS.md) and the firmware's [supported hardware](https://github.com/hoejriis/mecon-firmware/blob/main/docs/SUPPORTED_HARDWARE.md).

## Updates and recovery

- **A failed remote update undoes itself.** The gateway returns to its previous firmware. A step-by-step recovery guide for the beta is not written yet. Until then, [beta support](BETA_SUPPORT.md) says what to do.
- **The beta and the public firmware are separate lines.** The beta runs private firmware, numbered separately, and what works on one says nothing about the other. The public firmware's pre-releases are not supported releases. The firmware's own [limits](https://github.com/hoejriis/mecon-firmware/blob/main/docs/AVAILABILITY.md) are kept with it.

## Privacy

- **A hosted service can read what it decrypts.** MECON is not end-to-end encrypted from you to your Reader. The operator of the Backend you use can technically read whatever it can decrypt. See [trust and privacy](TRUST_AND_PRIVACY.md).
- **Removal does not reach backups.** On mecon.cloud, removing your data takes it out of the live service, not out of off-site backups. See [what mecon.cloud stores](HOSTED_BETA_DATA.md).

## The mesh itself

MECON changes nothing about how MeshCore routes messages. Flooding, Region Scopes and radio settings are MeshCore's own: see [MeshCore in brief](MESHCORE.md).
