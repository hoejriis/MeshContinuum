> [!NOTE]
> This is an exploratory proposal for a possible future change to the upstream MeshCore routing protocol. It is not part of the MeshContinuum/MECON architecture, roadmap, or current implementation. It is included here because MECON work on remotely managed and dynamic device configuration helped motivate the analysis.

# Proposal: Geographical Flood Scopes and Dynamic Repeater Load Adaptation

## 1. Problem Statement

MeshCore's flood routing is one of its fundamental strengths. It allows a network to operate without central routing infrastructure, topology management, or coordination between node operators.

As MeshCore networks become larger and denser, however, unrestricted flooding increasingly becomes a scalability problem.

This proposal starts from four observations.

### 1.1 Unscoped packets are flooding dense continents

An unscoped flood packet can propagate far beyond the geographical area where the information is useful.

As independently operated MeshCore networks become interconnected, a packet originating in one town may consume airtime across a region, country, or potentially a substantial part of a continent.

The problem is multiplicative.

A single packet does not consume airtime only at the sender. Every participating repeater may retransmit it, and dense areas can contain many repeaters capable of forwarding essentially the same information.

As networks grow, unrestricted flooding therefore becomes progressively more expensive.

The network needs a way of expressing:

> This information is relevant here, but does not need to consume resources everywhere else.

### 1.2 Region Scopes require coordination

MeshCore already provides Region Scopes as a mechanism for limiting floods.

This addresses the correct problem, but practical deployment has demonstrated a significant organizational challenge: named regions require people to agree on the regions.

Someone has to decide:

- which regions exist;
- what they are called;
- where their boundaries are;
- which repeaters belong to them;
- which regions overlap;
- how local and national hierarchies work;
- how repeaters should be reconfigured when the model changes.

This is manageable in a centrally administered network.

MeshCore is not such a network.

Many participants are attracted specifically by the absence of central administration. Requiring an administrative geography to be designed and maintained is therefore almost antithetical to the culture and architecture of parts of the MeshCore community.

The technical mechanism works, but its effectiveness depends on social coordination that may never happen consistently at continental scale.

### 1.3 Repeaters should be as autonomous as possible

A repeater may be installed on a roof, tower, mountain, remote building or other location where it is expected to operate autonomously for months or years.

Ideally, configuring a repeater should require little more than:

- radio configuration;
- identity/security configuration;
- an approximate location, if available.

It should not require continuous knowledge of evolving regional routing policy.

A repeater installed today should preferably continue making reasonable forwarding decisions years later even if the surrounding MeshCore network has grown dramatically.

This suggests moving policy away from static repeater configuration and toward information contained in the traffic itself.

### 1.4 Flood prevention should start with the user

The sender has information the repeater does not have:

> Where is this information actually relevant?

A local channel may only be useful within 20 km.

A regional channel may be useful within 100 km.

A national announcement may warrant 500 km.

Occasionally, information may genuinely deserve unlimited propagation.

The user or application generating the traffic is therefore the natural place to establish geographical relevance.

The network should then reward responsible scoping.

A user requesting 20 km of distribution should, particularly under congestion, receive preferential treatment compared with a user requesting 2,000 km or unlimited distribution.

This creates a useful incentive:

> The less shared network capacity you request, the more reliably the network attempts to provide it.

---

# 2. Geographical Scopes

The proposal is to extend the concept of MeshCore Region Scopes from administratively defined regions to **self-describing geographical scopes**.

Instead of:

```text
dk
dk-east
dk-copenhagen

```

a scope describes:

```text
centre + radius

```

For example:

```text
Copenhagen + 25 km

```

or:

```text
Denmark + 250 km

```

No repeater needs to know what "Copenhagen", "Denmark" or any other administrative region means.

It only needs an approximate idea of its own location.

---

# 3. The User Experience

Geographical scoping should primarily be a Companion feature rather than something ordinary users need to understand as a routing protocol.

## 3.1 Channels

Each channel can have a recommended:

```text
Centre
Radius

```

For example:

```text
#horsens

Centre: Horsens
Radius: 30 km

```

The Companion could present this simply as:

> **#horsens · 30 km around Horsens**

When sending to that channel, the Companion automatically applies the geographical scope.

The user normally does nothing else.

## 3.2 Public channel

Public traffic should also have a configurable geographical scope.

A Companion could have a sensible local default, for example:

```text
Public
Radius: 50 km

```

Users who deliberately want greater reach can increase it.

Unlimited/global flooding remains possible, but becomes an explicit choice rather than necessarily being the default behavior.

## 3.3 Sharing channel configuration

The channel's recommended geographical configuration should be shareable together with the channel.

A shared channel representation could contain:

```text
channel identity
channel secret/key
recommended centre
recommended radius

```

The receiving Companion can display:

> Join #horsens
> Recommended area: 30 km around Horsens

The user can accept or override it.

This does not require a central registry of geographical channels.

## 3.4 The scope belongs to the sender

Importantly, geographical scope describes **where the message is relevant**, not where the sender is located.

A user physically located in Aalborg could send to a channel scoped around Horsens.

The first geographically aware repeater outside the Horsens scope simply declines to propagate the flood further.

A Companion therefore does not need to know its own location in order to send geographically scoped channel traffic.

## 3.5 Other traffic

Channels are only the most obvious user-facing application.

The same concept can apply to other floods.

For example:

**Adverts**

A repeater or Companion could advertise itself within a configurable radius around its approximate location.

**Requests**

If a destination was last observed within a particular geographical scope, a request can initially use that scope.

**Responses**

A response can inherit the request's scope.

**Discovery**

Discovery can progressively expand:

```text
50 km
→ 100 km
→ 250 km
→ 500 km
→ unlimited

```

Unlimited flooding therefore becomes a fallback rather than the first attempt.

---

# 4. High-Level Repeater Behaviour

The repeater receives a flood containing a geographical scope.

Its first decision is simply:

> Am I geographically eligible to forward this packet?

If the repeater knows its approximate location, it calculates the distance to the packet's centre.

It forwards only when it is within:

```text
radius + routing margin

```

## 4.1 Routing margin

Radio topology does not follow geometry.

A repeater just outside a nominal 30 km area may be essential for connecting repeaters inside the area.

The forwarding area should therefore be somewhat larger than the relevance area.

For example:

```text
Message scope:     30 km
Routing margin:    15 km
Forwarding limit:  45 km

```

The sender specifies the 30 km relevance.

The network determines the routing margin.

The routing margin should therefore not consume packet bits.

---

# 5. Repeaters Without Location

A repeater should not require GPS.

A fixed repeater can be configured with a rough location. Accuracy of a few kilometres is sufficient.

It also does not necessarily need to advertise that location.

A repeater without any location information can still participate, but cannot itself determine geographical eligibility.

A simple bridge rule can allow:

```text
Known → Unknown → Known

```

while preventing:

```text
Known → Unknown → Unknown → Unknown → ...

```

One implementation is for a geographically validating repeater to mark the packet as validated.

An unknown-location repeater may relay such a packet once but cannot renew that validation.

A subsequent known-location repeater can validate it again.

This allows locationless and nomadic repeaters to bridge RF gaps without allowing an unlimited chain of locationless repeaters to defeat the geographical scope.

---

# 6. Geographic Eligibility Does Not Mean Mandatory Forwarding

Geographical scope solves one dimension of flood scaling:

> How far should the packet travel?

It does not solve another:

> How many repeaters within that area need to retransmit it?

Consider a dense city.

A 20 km scope might contain dozens or hundreds of repeaters.

Having every eligible repeater transmit every packet is still inefficient.

The next principle is therefore:

> Being geographically eligible means that a repeater **may** forward the packet, not that it necessarily **must**.

This enables dynamic repeater load adaptation.

---

# 7. Dynamic Repeater Load Adaptation

A repeater should adapt to the RF environment it actually observes.

It does not need a database of nearby repeaters or an estimate of geographical repeater density.

Instead, it can observe the most useful signal directly:

> How many duplicate forwards do I hear?

If a repeater routinely hears several other repeaters retransmit packets it has just received, its own forwarding is often redundant.

If it rarely hears duplicates, its forwarding may be important.

---

# 8. Listen Before Forwarding

Instead of:

```text
Receive
→ Forward

```

an eligible repeater behaves approximately as:

```text
Receive
→ schedule tentative forward
→ short randomized holdoff
→ listen
→ decide

```

If sufficient copies of the same packet are heard during the holdoff, the repeater can suppress its own transmission.

If no one else appears to forward it, the repeater transmits.

This produces different behavior automatically.

### Sparse mesh

```text
A → B → C → D

```

B hears no alternative forward.

B transmits.

C does the same.

Behavior remains close to conventional flooding.

### Dense mesh

Several repeaters receive the packet simultaneously.

Their randomized holdoffs differ.

One forwards first.

Several others hear that forward and cancel their pending transmissions.

Repeaters that do not hear it still forward, allowing the flood to continue into different RF areas.

No topology coordination is required.

---

# 9. Density Is an Observation, Not a Configuration

The repeater should preferably not attempt to calculate:

```text
repeaters per square kilometre

```

That is not the quantity that matters.

Ten geographically nearby repeaters may have very different RF coverage.

Instead the repeater measures effective redundancy:

```text
duplicates observed per flood

```

This directly reflects whether multiple alternative forwards are actually occurring in its radio environment.

Neighbor count can be a secondary signal, but observed duplicate behavior should be primary.

---

# 10. Self-Stabilisation

The mechanism creates useful negative feedback.

If too many repeaters forward:

```text
duplicates increase
→ suppression increases
→ fewer repeaters forward

```

If too few repeaters forward:

```text
duplicates decrease
→ suppression decreases
→ more repeaters forward

```

The network can therefore adapt without explicitly negotiating a forwarding topology.

Randomization prevents the same repeater from permanently becoming the preferred forwarder.

---

# 11. Load Awareness

Redundancy is not the only consideration.

A repeater can also observe:

```text
TX airtime
channel utilization
queue depth
queue latency
recent duty-cycle consumption

```

A lightly loaded repeater can be more willing to forward.

A heavily loaded repeater can become more selective.

This allows forwarding responsibility to shift naturally toward available network capacity.

---

# 12. Reward Small Scopes

Geographical radius provides another useful scheduling signal.

Under low load, radius should make little difference. Eligible traffic is forwarded normally.

As congestion increases, smaller scopes receive progressively higher priority.

Conceptually:

```text
10 km
  ↓
50 km
  ↓
250 km
  ↓
1000 km
  ↓
unlimited

```

This implements an important economic principle for shared airtime:

> Traffic requesting fewer network resources receives preferential service when resources become scarce.

This should not be strict priority.

Large scopes must retain some forwarding opportunity to prevent starvation.

A weighted scheduler or similar mechanism should therefore be used.

---

# 13. Unscoped Traffic

Legacy unscoped traffic remains supported.

At low network load:

```text
unscoped → normal forwarding

```

As congestion increases:

```text
unscoped → progressively lower priority

```

Under severe congestion it becomes the least preferred flood class because its potential network-wide cost is effectively unlimited.

This allows gradual migration.

Older clients continue working, while geographically responsible clients increasingly benefit as networks become congested.

---

# 14. Automatic Flood Adverts

Flood adverts are background traffic and become increasingly expensive as the network grows.

With geographically scoped discovery, frequent continent-wide adverts should become unnecessary.

A complementary change would therefore be to substantially increase the minimum interval for automatic flood adverts.

A suggested starting point is:

```text
72 hours

```

Manual adverts and other explicit discovery mechanisms can remain available.

---

# 15. Implementation Proposal

The following describes one possible implementation within the existing MeshCore transport flood structure.

## 15.1 32-bit geographical scope

Assume the existing two 16-bit transport codes provide the complete available budget:

```text
32 bits

```

A geographical transport scope could use:

```text
31            18 17             5 4          0
+---------------+----------------+------------+
| Latitude 13b  | Longitude 13b  | Radius 5b |
+---------------+----------------+------------+

```

with one additional type bit:

```text
bit 31      GEO
bits 30–18  latitude
bits 17–5   longitude
bits 4–0    radius class

```

Thus:

```text
1 + 13 + 13 + 5 = 32 bits

```

`GEO=1` identifies the geographical interpretation.

Legacy region semantics can continue to use the existing representation.

---

# 16. Coordinate Precision

Latitude:

```text
180° / 8192 ≈ 0.022°

```

Approximately 2.4 km north/south.

Longitude:

```text
360° / 8192 ≈ 0.044°

```

At Danish latitudes this is approximately 2–3 km east/west.

This is intentionally coarse.

A routing scope measured in tens or hundreds of kilometres does not benefit from metre-level precision, particularly when a routing margin is applied.

The coarse representation also avoids pretending that the transport scope represents the exact position of any node.

---

# 17. Radius Encoding

The five radius bits provide 32 classes.

Radius should be logarithmic rather than linear.

One possible initial table:

| CodeRadius |           |
| ---------- | --------- |
| 0          | 1 km      |
| 1          | 2 km      |
| 2          | 3 km      |
| 3          | 5 km      |
| 4          | 7 km      |
| 5          | 10 km     |
| 6          | 15 km     |
| 7          | 20 km     |
| 8          | 30 km     |
| 9          | 40 km     |
| 10         | 50 km     |
| 11         | 75 km     |
| 12         | 100 km    |
| 13         | 150 km    |
| 14         | 200 km    |
| 15         | 300 km    |
| 16         | 400 km    |
| 17         | 500 km    |
| 18         | 750 km    |
| 19         | 1,000 km  |
| 20         | 1,500 km  |
| 21         | 2,000 km  |
| 22         | 3,000 km  |
| 23         | 5,000 km  |
| 24–30      | Reserved  |
| 31         | Unlimited |

Unused values should remain reserved for future protocol development.

---

# 18. Repeater Forwarding Pipeline

The forwarding pipeline can conceptually become:

```text
Receive flood
     │
     ▼
Determine scope type
     │
     ├── legacy → existing logic
     │
     └── geo
           │
           ▼
     Geographic eligibility
           │
           ├── outside → drop
           │
           └── eligible
                  │
                  ▼
          Dynamic holdoff
                  │
                  ▼
          Observe duplicates
                  │
          ┌───────┴────────┐
          │                │
     redundant         needed
          │                │
       suppress          queue
                           │
                           ▼
                    Load scheduler
                           │
                           ▼
                        transmit

```

This deliberately separates:

1. **scope eligibility**;
2. **redundancy suppression**;
3. **load scheduling**.

Each can therefore evolve independently.

---

# 19. Dynamic State

A repeater can maintain inexpensive rolling statistics such as:

```text
unique floods received
duplicate floods received
average duplicates per flood
time-to-first-duplicate
TX airtime
queue depth
channel utilization
forwarded floods
suppressed floods

```

The implementation does not require a full topology model.

An exponentially weighted moving average or similar mechanism should be sufficient.

---

# 20. Adaptation Timescales

Different observations naturally operate at different speeds.

### Fast state

Seconds to minutes:

```text
queue pressure
immediate channel utilization

```

### Medium state

Minutes:

```text
duplicate rate
observed redundancy

```

### Slow state

Hours:

```text
baseline RF environment
typical congestion

```

This reduces oscillation while allowing the repeater to react quickly to temporary overload.

---

# 21. Startup Behaviour

After reboot, a repeater has insufficient information to determine local redundancy.

The safe default is therefore conservative:

```text
unknown environment
→ high forwarding probability
→ short holdoff

```

As observations accumulate, suppression may increase.

A newly installed repeater therefore initially behaves approximately like a conventional repeater rather than risking a routing hole.

---

# 22. Safety Bounds

Dynamic behavior should always remain bounded.

Possible limits include:

```text
maximum holdoff
minimum forwarding probability
maximum suppression level
minimum service for large scopes

```

No learned state should be capable of training a repeater into permanent silence.

When uncertain, the system should bias toward forwarding.

---

# 23. Security Considerations

An adaptive system can potentially be manipulated.

For example, an attacker might deliberately create duplicates to increase observed redundancy.

Mitigations include:

- only counting valid MeshCore packets;
- bounded suppression;
- rolling observations rather than instantaneous reactions;
- minimum forwarding probability;
- conservative startup behavior;
- distinguishing useful forwarding evidence from arbitrary RF activity where possible.

Dynamic adaptation is an optimization mechanism, never an authorization mechanism.

---

# 24. Deployment Phases

The proposal does not need to be implemented as one large change.

## Phase 1 — Instrumentation

Measure without changing routing:

```text
duplicate rate
time-to-duplicate
TX airtime
queue pressure
channel utilization

```

Real-world observations can then inform the algorithm.

## Phase 2 — Geographical scopes

Introduce center/radius scopes and geographical repeater eligibility.

Existing flooding behavior remains otherwise unchanged.

This alone prevents geographically irrelevant propagation.

## Phase 3 — Randomized holdoff

Eligible repeaters delay forwarding slightly with randomized timing.

No suppression initially.

## Phase 4 — Duplicate suppression

Pending retransmissions can be cancelled when sufficient alternative forwarding is observed.

Start conservatively.

## Phase 5 — Adaptive suppression

Historical redundancy adjusts holdoff and forwarding probability.

Sparse meshes converge toward conventional flooding.

Dense meshes suppress progressively more redundant transmissions.

## Phase 6 — Load-aware scheduling

Queue pressure, TX airtime and channel utilization influence forwarding decisions.

## Phase 7 — Scope-aware priority

Geographical radius becomes a congestion signal.

Smaller scopes receive preferential service while larger scopes retain sufficient capacity to avoid starvation.

---

# 25. Expected Behaviour

The combined model should produce several useful emergent properties.

### Sparse rural network

```text
few duplicates
+ low load
→ nearly conventional flooding

```

### Dense city network

```text
many duplicates
→ substantial local suppression

```

### Congested city network

```text
many duplicates
+ high load
→ aggressive suppression
+ preference for geographically limited traffic

```

### Network failure

If repeaters disappear:

```text
duplicates fall
→ remaining repeaters automatically become more willing to forward

```

### Network growth

As new repeaters appear:

```text
duplicates increase
→ existing repeaters automatically become more selective

```

No repeater needs to be manually told that the network around it has changed.

---

# 26. Overall Design Principle

The proposal divides responsibility cleanly.

### The user/Companion determines relevance

> **Where should this information be useful?**

Expressed as geographical center + radius.

### The repeater determines eligibility

> **Am I in a reasonable position to help transport it?**

Based on approximate location and routing margin.

### The local RF environment determines necessity

> **Does this packet actually need another retransmission from me?**

Based primarily on observed duplicate forwarding.

### Current load determines priority

> **Given limited airtime, which useful packet should I forward first?**

With geographically responsible traffic receiving preference during congestion.

The result preserves MeshCore's decentralized flooding architecture while removing much of the need for centrally coordinated regions.

Most importantly, it aligns incentives:

> **Users who ask the mesh to do less work should receive better service when the network is busy.**

And it allows repeaters to become increasingly autonomous:

> **A repeater should not need to understand the administrative structure of the network around it. It should know approximately where it is, observe what the radio environment is doing, and adapt.**