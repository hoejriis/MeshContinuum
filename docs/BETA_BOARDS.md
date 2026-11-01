# Hosted beta: boards and firmware

The hosted beta runs a private beta firmware (the 0.9x reference line), not the public [mecon-firmware](https://github.com/hoejriis/mecon-firmware) builds. The two lines are numbered separately, and their numbers do not order against each other. A board is offered for the beta only once it has passed hardware tests. A board that only compiles is not offered, and being listed here is not a promise of future support.

## Boards and roles in the beta firmware

| Board | Role | Connection | Updates |
|---|---|---|---|
| Heltec V3 | Companion gateway | Wi-Fi / MQTT, set up over USB | Remote, with automatic fallback |
| Heltec V3 | Repeater observer | Wi-Fi / MQTT | see the release notes |
| Heltec V4 (not the R8 revision) | Companion gateway | Wi-Fi / MQTT, set up over USB | Remote, with automatic fallback |
| SenseCAP T1000-E | Bluetooth Companion | Bluetooth, set up over USB | Over USB only. A posture-recovery image is provided |
| Seeed Wio Tracker L1 | Repeater | set up over USB | Over USB. A posture-recovery image is provided |

Which of these the beta currently offers, and the firmware version each runs, are shown in the Reader and in the beta firmware's release notes. Every other board is not offered.

## What the gateways do

- A remote update is confirmed to the Backend by a signed acknowledgement. An update that is not confirmed reverts by itself.
- Every message a gateway publishes is signed.
- A gateway that fell back to a cloud broker returns to the site broker once that session has been up for 30 seconds and the site broker is reachable.
- A gateway limits its own radio airtime to the legal duty cycle of its channel.
- Connectivity mode is `mqtt` or `ble`. `both` is not available on the V3, for memory reasons.

## Limits

- The Wi-Fi companion port on a gateway (`mecon.companion_tcp.enabled`) is off by default. When switched on it is not password protected, so use it only on a network you trust.
- The T1000-E and the Wio Tracker L1 cannot be updated over the air. They update over USB.

## Recovery

If a remote update fails, the gateway returns to its previous firmware by itself. A step-by-step recovery guide will be linked here before the beta opens.

## See it in use

The [MeshContinuum demonstration](../README.md#one-reader-more-reception) shows the Reader with two Heltec gateways (V3 and V4). Its screenshots use synthetic demo data and were taken on an earlier beta firmware. They show those two boards only and say nothing about any other board or role.
