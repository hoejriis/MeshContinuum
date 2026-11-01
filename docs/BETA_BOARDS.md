# Hosted beta: tested hardware and firmware

*Updated 15 October 2026.*

This page lists what has actually run on real hardware for the first hosted beta. A board that is not listed as tested is not offered, even if the firmware compiles for it. Inclusion here is not a promise of future support.

The builds are private beta builds (the 0.9x reference line), not the public [mecon-firmware](https://github.com/hoejriis/mecon-firmware) builds. The public and private version numbers are separate lines and do not order against each other.

## Offered for the beta (beta firmware 0.90.5)

| Board | Role | Connection | Tested on real hardware |
|---|---|---|---|
| Heltec V3 | Companion gateway | Wi-Fi / MQTT, set up over USB | Remote update and its automatic fallback on this release; messaging, settings and broker failover on recent releases |
| Heltec V4 (not the R8 revision) | Companion gateway | Wi-Fi / MQTT, set up over USB | Remote update on this release; messaging and broker failover on recent releases |

Each holds 50 contacts. 0.90.5 is the latest promoted release. Newer 0.90.x builds are pre-releases that have not passed the hardware tests and are not offered.

## Not offered yet

| Board | Why |
|---|---|
| SenseCAP T1000-E (Bluetooth companion) | Experimental. Settings over Bluetooth worked on earlier beta builds; the current release has not been tested on the device. It updates over USB only and holds 350 contacts. |
| Heltec V3 repeater (Repeater Observer) | No hardware test of the current release; last hardware-tested on an early beta (0.30.1). |
| Wio Tracker L1 repeater | Held back. The current release was installed over USB and read back on the device (settings, signed management and security posture). Remote update, over the air or staged over LoRa, is not offered. |
| Heltec V4 R8, and every other board | Not hardware-tested: build-tested only. |

## What the gateways do on this release

- A remote update is confirmed to the Backend by a signed acknowledgement; an update that is not confirmed reverts by itself.
- Every message a gateway publishes is signed.
- A gateway that fell back to a cloud broker returns to the site broker once that session has been up for 30 seconds and the site broker is reachable (since 0.90.2).
- A gateway limits its own radio airtime to the legal duty cycle of its channel.
- Connectivity mode is `mqtt` or `ble`; `both` is not available on the V3 (memory).

## Limits

- The Wi-Fi companion port on a gateway (`mecon.companion_tcp.enabled`) is off by default. If it is switched on, it is not password protected, so use it only on a network you trust.
- The T1000-E cannot be updated over the air; it updates over USB.

## Recovery

If a remote update fails, the gateway returns to its previous firmware by itself. A step-by-step recovery guide will be linked here before the beta opens.

## See it in use

The [MeshContinuum demonstration](../README.md#one-reader-more-reception) shows the Reader with two Heltec gateways (V3 and V4). Its screenshots use synthetic demo data and were taken on an earlier beta firmware (0.76.0); they show those two boards only and say nothing about any other board or role.

This list changes when new hardware tests pass.
