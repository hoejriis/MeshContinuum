# Get started with MECON

## Today: follow development or express beta interest

The public repositories contain documentation and contracts. There is no public installation or download to follow yet.

1. Read the [capability matrix](CAPABILITIES.md) and [trust model](TRUST_AND_PRIVACY.md).
2. Visit [mecon.cloud](https://mecon.cloud). Access is invitation only; there is no announced opening date.
3. [Express interest in testing](https://github.com/hoejriis/MeshContinuum/issues/new?template=beta-interest.yml), describing the problem you want to solve, your hardware/role and your browser or operating system.
4. Star or Watch the repository to follow progress. An interest issue is a public conversation, not an account request, guaranteed invitation or promised place in a queue.

First external testing is expected on mecon.cloud. Self-hosting remains a product goal, with public packaging and installation acceptance still pending.

## When invited

The maintainer will provide the supported beta version, access instructions and the applicable onboarding path. A first session should reach one understandable result: captured traffic in the Reader, followed by reception details explaining where it came from.

Enrolling an identity/channel for decryption and adding a managed device are separate actions. Never put a private key or channel secret in an issue. Review the hosted Backend's access to enrolled keys before importing them.

A managed radio workflow additionally needs an accepted board/revision, the matching firmware role and a compatible direct-connect environment. Exact instructions will accompany the accepted beta; no placeholder flash commands or unpublished container names are provided here.

## Browser versus radio access

Reading through a reachable hosted Backend and directly attaching a radio are different workflows. The beta's documented direct setup path uses desktop Chrome/Edge for USB/BLE where the device supports it. Do not assume an iPhone or iPad browser can flash or directly attach a radio just because it can display the Reader. Accepted browser/OS combinations must be documented with the beta.

## What makes useful feedback?

Describe your goal, the point where you became stuck, what you expected, and what happened. Include versions and sanitized screenshots where relevant. Empty traffic can mean no configured source heard a packet; it must not be presented as successful reception.

## Later: self-hosting

A public quick start will name the released artifacts, prerequisites, supported architectures, first-admin flow, source/device setup, success checks, upgrade and recovery path. It will be tested by an independent operator before being advertised as ready.

Until then, [deployment modes](DEPLOYMENT_MODES.md) describes the architecture, not an executable install guide.
