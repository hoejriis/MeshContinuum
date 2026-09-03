# Deployment modes

MeshContinuum is designed to avoid a mandatory central service. Render or any other hosting provider is a deployment option, not part of the product contract.

## Hosted

A hosted Backend, Reader and MQTT broker provide access from anywhere. Heltec V3 gateways connect over the internet while retaining normal local MeshCore behavior.

The MECON cloud service is available at **[mecon.cloud](https://mecon.cloud)** and is deployed on Render. Access is **Invitation Only**; public self-service registration is not offered. This service does not make Render or mecon.cloud a required component of other MECON deployments.

## Local

A Backend, Reader and broker run at one location. The installation remains useful without internet access and may serve devices and users on that network.

## Hybrid cloud and local

A hosted installation and one or more local installations cooperate. Each local backend continues operating independently during a cloud outage and exchanges changes again when connectivity returns.

## Multiple locales

A Backend and Reader may be deployed at several locations where Companions are installed. No permanent central node should be required for local operation.

Backend cooperation should use versioned, authenticated and idempotent domain events. Direct database replication is not the product contract.

Typical synchronized facts include:

- packet and observation identifiers;
- enrolled public identities and authorization metadata;
- sanitized device status;
- configuration revisions;
- delivery and management job results.

Private keys and other secrets must not be copied merely because two backends can synchronize.

## Deployment maturity

The deployment model is the target architecture. Individual modes will be marked supported only after packaging, upgrade, backup, security and end-to-end tests exist for that mode.
