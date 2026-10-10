# mecon.cloud beta: what is stored and who can read it

*Private beta, 10 October 2026. This page describes the hosted beta at mecon.cloud; another deployment's operator sets their own rules.*

**MECON is not an operator-blind service.** When you enrol a Companion private key or a channel key, mecon.cloud uses it to decrypt traffic that its sources captured. The operator of mecon.cloud can technically read whatever the service can decrypt. Application permissions keep users apart: a Fleet Owner sees their own devices and messages, a Device User sees the Companion assigned to them. They do not hide data from the operator.

## Keys

- **Companion private keys** are stored encrypted, with the encryption key held outside the database.
- **Channel keys**, and the Wi-Fi and broker passwords you save for your devices, are stored so that the service can use them. They are never shown back through the app.

## How long data is kept

| Data | Kept |
|---|---|
| Decrypted messages | Until removed |
| Raw captures from your own devices | 365 days |
| Raw captures from other sources | 7 days |

## Backups

The database is backed up daily. The newest 7 copies are kept on the server, and every daily copy is kept off-site indefinitely. **Removing your data does not reach the off-site backups.**

## Leaving the beta

On request, the operator removes your account, your enrolled keys, your decrypted messages and your devices from the live service within 7 days. Shared traffic stays, because other users can also read it: raw packets, and channel messages on channels other users can read. Your devices' fleet is retired.

## Reporting a problem

See [Beta support](BETA_SUPPORT.md).
