# Trust and privacy

MECON preserves independent MeshCore radio operation while adding optional connected services. Independence from a cloud service is different from hiding data from the operator of a service you choose to use.

## Hosted decryption

When you enroll a Companion private key or a channel key, the Backend can use it to decrypt captured traffic. **This is not an operator-blind, end-to-end-encrypted web service.** Application permissions can separate users and administrator APIs; they do not remove the hosting operator's control over the running server and its storage.

Before a hosted beta invitation is used, the operator must explain key storage, access boundaries, retention, removal and backup behavior for that deployment. Do not infer these from an architectural target or a promise that normal MeshCore RF remains independent. For the mecon.cloud beta, see [what is stored and who can read it](HOSTED_BETA_DATA.md).

## Separate permissions

- Receiving a raw observation does not by itself authorize decryption.
- Decrypting an enrolled identity/channel does not by itself authorize managing a physical device.
- Broker connectivity does not by itself grant Deployment authority.
- A management action is limited by device capability, role, authorization and security posture.

## The public map

The map on the [mecon.cloud](https://mecon.cloud) front page shows network activity heard by participating receivers. It follows these rules:

- **Activity, not content.** The map shows that radios are active, never what their messages say.
- **Only what is heard.** A radio that no participating receiver hears does not appear, so the map is never the whole mesh.
- **No private positions.** A radio is placed only where it advertises its own position publicly. Where it was heard from is not where it is, and no position is inferred.
- **No receiver details.** The lines to receivers carry no receiver identity, signal strength or packet identifier; their references are short-lived.
- **Coverage is partial.** Some areas look quiet only because nobody is listening there.
- **Sources with publication rights only.** Activity comes from MECON's own receivers and from the receivers that feed [Meshat.se](https://meshat.se/).

## Self-hosting

The design lets an administrator operate their own Backend, Reader and broker. That gives control of infrastructure and credentials, together with responsibility for protecting them. Public self-hosting artifacts are still planned; see [availability](CAPABILITIES.md).

## Sharing feedback

Use test identities and synthetic traffic for public screenshots or demos. Remove secrets, private conversations, personal locations, broker addresses and configuration exports. Report suspected vulnerabilities through the private route described in [SECURITY.md](../SECURITY.md).
