# Trust and privacy

MECON preserves independent MeshCore radio operation while adding optional connected services. Independence from a cloud service is different from hiding data from the operator of a service you choose to use.

## Hosted decryption

When you enroll a Companion private key or a channel key, the Backend can use it to decrypt captured traffic. **This is not an operator-blind, end-to-end-encrypted web service.** Application permissions can separate users and administrator APIs; they do not remove the hosting operator's control over the running server and its storage.

Before a hosted beta invitation is used, the operator must explain key storage, access boundaries, retention, removal and backup behavior for that deployment. Do not infer these from an architectural target or a promise that normal MeshCore RF remains independent.

## Separate permissions

- Receiving a raw observation does not by itself authorize decryption.
- Decrypting an enrolled identity/channel does not by itself authorize managing a physical device.
- Broker connectivity does not by itself grant Deployment authority.
- A management action is limited by device capability, role, authorization and security posture.

## Self-hosting

The design lets an administrator operate their own Backend, Reader and broker. That gives control of infrastructure and credentials, together with responsibility for protecting them. Public self-hosting artifacts are still planned; see [availability](CAPABILITIES.md).

## Sharing feedback

Use test identities and synthetic traffic for public screenshots or demos. Remove secrets, private conversations, personal locations, broker addresses and configuration exports. Report suspected vulnerabilities through the private route described in [SECURITY.md](../SECURITY.md).
