# Deployment choices

You can use MECON in four ways, from someone else's server to infrastructure of your own. Each section says what runs where, what you need, what you are responsible for, and what it looks like when it works. These describe the design. The hosted beta is the one you can join today, by invitation. What can be installed today is on [availability](CAPABILITIES.md). This page does not give install commands, because no public packages exist yet.

| | You run | Someone else runs | Good for |
|---|---|---|---|
| [Hosted](#hosted-one-companion-on-a-hosted-service) | Your radios | Backend, Reader and broker | Trying MECON, or one person with a few radios |
| [Home site](#a-home-site) | Backend, Reader, broker and radios, on one small computer | Nothing | Keeping everything on your own network |
| [Several sites](#several-sites) | Backends at each site, plus brokers on the Internet | Optionally, the brokers | Clubs, families or operators with radios in more than one place |
| [Firmware alone](#the-firmware-alone-with-another-manager) | mecon-firmware on your radios, and your own manager | Nothing | Building your own tools on the open device contracts |

In every case, your radios keep working as ordinary MeshCore radios if MECON goes away.

## Hosted: one Companion on a hosted service

**What runs where.** The Backend, Reader and broker run on the hosted service, for example [mecon.cloud](https://mecon.cloud). You bring your Companion, and optionally a gateway radio on your home Wi-Fi.

**What you need.** An account on the service. A Companion you want to read messages for. A desktop Chrome or Edge browser if you want to set up a radio over USB.

**What you do.** Sign in. Enrol your Companion's identity, so the service can decrypt the messages meant for it. If you have a gateway, set it up over USB, and it reports what it hears to the service.

**What you are responsible for.** Deciding which keys to give the service. A hosted service can read whatever it can decrypt: see [trust and privacy](TRUST_AND_PRIVACY.md), and for mecon.cloud, [what it stores](HOSTED_BETA_DATA.md).

**What success looks like.** Messages to your Companion appear in the Reader, with every reception that heard them, even when the Companion itself was off.

The mecon.cloud beta's own guide is [getting started](GETTING_STARTED.md), with its [boards](BETA_BOARDS.md) and [support](BETA_SUPPORT.md).

## A home site

**What runs where.** One small computer on your network runs the Backend, the Reader and a local MQTT broker, in Docker. It could be a Raspberry Pi, a NAS, a small home server or an ordinary Linux computer. A gateway radio on your Wi-Fi reports to the local broker.

**What you need.** A computer that can run Docker and stay on. A supported gateway board. A desktop Chrome or Edge browser for the first setup over USB.

**What you do.** Start the installation. Create the administrator and the Deployment, then add your first gateway over USB. MECON creates the broker credentials and the Deployment's identity itself, so you do not administer MQTT by hand.

**What you are responsible for.** The computer, its backups and its updates, and the keys you enrol. Nothing has to be reachable from the Internet.

**What success looks like.** The Reader on your network shows what your gateway hears, with history, and keeps working when your Internet connection is down.

## Several sites

**What runs where.** Each site runs its own Backend, and the Backends share the Deployment's records with each other as equal peers. Gateways at each site connect to a broker. For reach and resilience, a Deployment can add a primary broker on the Internet, and a secondary broker hosted somewhere else. A device uses one broker at a time, and fails over in priority order.

**What you need.** A home site, as above, at each place, and one or two small hosts for the Internet brokers.

**What you are responsible for.** Every site's computer, and the brokers. Brokers only carry traffic. They hold no message keys and no records.

**What success looks like.** A message heard at any site appears in the Reader at every site. When one site or one broker is down, the others carry on.

The details are in the [architecture](ARCHITECTURE.md#recommended-deployment-progression).

## The firmware alone, with another manager

**What runs where.** Your radios run [mecon-firmware](https://github.com/hoejriis/mecon-firmware). A manager of your own, or another project's, talks to them using the firmware's open contracts, over USB, Bluetooth, MQTT or LoRa. MeshContinuum is not involved.

**What you need.** A supported board and a manager that implements the contracts. Start from the firmware's [getting started](https://github.com/hoejriis/mecon-firmware/blob/main/docs/GETTING_STARTED.md) and [managing](https://github.com/hoejriis/mecon-firmware/blob/main/docs/MANAGING.md) pages.

**What success looks like.** Your manager reads the device's health, changes its settings and updates its firmware with signed images, and the radio is still an ordinary MeshCore radio.

## The offline boundary

Ordinary MeshCore radio use never depends on MECON. A home site serves its own users while the Internet is down. The Reader always needs a reachable Backend. A Reader that works fully on its own, with no Backend, is not part of the design yet.
