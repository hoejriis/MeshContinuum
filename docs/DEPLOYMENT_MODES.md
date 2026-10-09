# Deployment modes

**Availability:** private beta implementations exist; public installable packages and independent setup acceptance are pending. This page describes architecture. Use the [capability matrix](CAPABILITIES.md) for maturity and [getting started](GETTING_STARTED.md) for today's entry path.

| Mode | Purpose | Public entry path |
|---|---|---|
| Hosted | Reach a Backend and Reader without operating a server yourself | mecon.cloud is invitation only; first external testing expected here, date unannounced |
| Local | Run Backend, Reader and a broker on your own infrastructure | Public packages and setup guide planned |
| Hybrid / several sites | Let local services operate independently and synchronize with trusted peers | Public packaging and per-mode acceptance planned |

[mecon.cloud](https://mecon.cloud) is one MeshContinuum deployment. No hosting provider, public broker or permanent central Backend is part of the required protocol.

## Local starting point

The intended simple starting point is one Docker host running Backend + Reader + a local broker. Exact supported machines, resource requirements and installation commands will be published with tested artifacts. Automatic Deployment creation and the first-Companion handoff remain setup work.

## Several sites

Backend federation and broker transport are separate layers. Trusted Backends reconcile versioned application events; brokers carry operational traffic. Direct database replication is not the product contract. Private keys and secrets must not be copied simply because peers can synchronize.

## Offline boundary

Normal MeshCore RF operation continues when a hosted service is unreachable. A local Backend may serve its local users while Internet connectivity is absent. A hosted Reader requires a reachable Backend; fully standalone direct Reader operation is planned.

See the [architecture](ARCHITECTURE.md) for target authority, federation and recovery boundaries and the [roadmap](ROADMAP.md) for release gates.
