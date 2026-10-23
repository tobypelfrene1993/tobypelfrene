## $ Why this matters

A QoS policy needs a trustworthy classification strategy, appropriate queue treatment and controlled handling of congestion before buffers are exhausted.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: QoS Queuing, Congestion Avoidance & Trust
>
> 01 DSCP and CoS
>
> 02 Priority queuing
>
> 03 Congestion avoidance

01

### DSCP and CoS

DSCP is a Layer 3 IP header marking; CoS is a Layer 2 802.1Q priority field. Trust boundaries determine where markings are accepted or rewritten.

02

### Priority queuing

Low-latency priority treatment can protect delay-sensitive traffic such as voice, but it must be policed so it cannot starve other classes.

03

### Congestion avoidance

Early drop mechanisms such as WRED can signal congestion before a queue becomes completely full, helping TCP flows reduce sending rates.

| Concept | What to remember in a lab or exam |
| --- | --- |
| DSCP and CoS | DSCP is a Layer 3 IP header marking; CoS is a Layer 2 802.1Q priority field. Trust boundaries determine where markings are accepted or rewritten. |
| Priority queuing | Low-latency priority treatment can protect delay-sensitive traffic such as voice, but it must be policed so it cannot starve other classes. |
| Congestion avoidance | Early drop mechanisms such as WRED can signal congestion before a queue becomes completely full, helping TCP flows reduce sending rates. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Layer 2 and Layer 3 markings are distinct

CoS is an 802.1Q Layer 2 priority field; DSCP is carried in the IP header at Layer 3. A QoS policy must classify and act on the marking for it to influence forwarding.

NOTE\_02

### Priority requires a limit

Low-latency priority queuing protects delay-sensitive traffic such as voice, but it must be policed. An unlimited priority class can starve all other traffic during congestion.

NOTE\_03

### Avoid full-buffer tail drop where possible

Early-drop mechanisms such as WRED can signal congestion before a queue is full, allowing responsive TCP flows to reduce their sending rate rather than dropping every flow at once.

### Apply the model

1. **Step 1 — Layer 2 and Layer 3 markings are distinct.** CoS is an 802.1Q Layer 2 priority field; DSCP is carried in the IP header at Layer 3. A QoS policy must classify and act on the marking for it to influence forwarding.
2. **Step 2 — Priority requires a limit.** Low-latency priority queuing protects delay-sensitive traffic such as voice, but it must be policed. An unlimited priority class can starve all other traffic during congestion.
3. **Step 3 — Avoid full-buffer tail drop where possible.** Early-drop mechanisms such as WRED can signal congestion before a queue is full, allowing responsive TCP flows to reduce their sending rate rather than dropping every flow at once.

## $ Trust, CoS and DSCP

CoS and DSCP are markings, not guarantees. CoS is the three-bit 802.1Q Layer 2 priority field; DSCP is the six-bit IP Layer 3 field. A trust boundary decides where a device accepts an existing marking and where it rewrites it, preventing an untrusted endpoint from declaring its own traffic high priority.

| Marking | Layer | Scope |
| --- | --- | --- |
| CoS | Layer 2 / 802.1Q | Applies while the Ethernet tag is present on that link. |
| DSCP | Layer 3 / IP header | Can travel across routed hops when policies preserve it. |
| Trust boundary | Policy decision point | Accept, remark or reset markings from an endpoint. |

## $ Queues, priority and congestion avoidance

Queuing chooses transmission order under egress congestion. A low-latency priority queue helps delay-sensitive voice, but must be policed: an unlimited priority queue can starve every other class. WRED is congestion avoidance, not ordinary tail drop; it can drop selected packets before a queue is full so responsive TCP flows reduce their rate.

| Mechanism | Goal | Risk or requirement |
| --- | --- | --- |
| Priority / LLQ | Low delay and jitter for real-time traffic | Police the class to prevent starvation. |
| Class-based queueing | Bandwidth treatment for identified classes | Requires accurate classification and a congested point. |
| Tail drop | Drops when buffer is full | Many TCP flows can react together, reducing efficiency. |
| WRED | Signals congestion early through selective drops | Most useful with responsive TCP traffic. |

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Marking does nothing by itself. A device must classify and apply a policy that acts on the marking at a point where congestion can occur.
