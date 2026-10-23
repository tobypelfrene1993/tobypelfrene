## $ Why this matters

The IPv4 header carries the control information routers need to forward a packet between networks while the payload remains a separate upper-layer unit.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: IPv4 Header & Packet Delivery
>
> 01 Source and destination
>
> 02 TTL and protocol
>
> 03 Fragmentation

01

### Source and destination

These 32-bit fields identify the original sender and final receiver. Routers change Layer 2 headers at each hop, not the end-to-end IPv4 addresses.

02

### TTL and protocol

TTL is decremented by each router to limit looping. Protocol identifies the next payload type, such as ICMP, TCP or UDP.

03

### Fragmentation

Identification, flags and fragment offset support fragmentation when a packet exceeds a path MTU; modern designs avoid fragmentation where possible.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Source and destination | These 32-bit fields identify the original sender and final receiver. Routers change Layer 2 headers at each hop, not the end-to-end IPv4 addresses. |
| TTL and protocol | TTL is decremented by each router to limit looping. Protocol identifies the next payload type, such as ICMP, TCP or UDP. |
| Fragmentation | Identification, flags and fragment offset support fragmentation when a packet exceeds a path MTU; modern designs avoid fragmentation where possible. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Layer 3 addresses survive the route

The IPv4 source and destination fields identify the original sender and final receiver. At each router hop the Ethernet frame is replaced for the next link, while the end-to-end IP addresses normally remain unchanged.

NOTE\_02

### TTL prevents endless routed loops

Every router decrements Time To Live. A packet whose TTL reaches zero is discarded and normally triggers ICMP Time Exceeded, which is why traceroute can reveal successive hops.

NOTE\_03

### Know why fragmentation matters

Identification, flags and fragment offset allow IPv4 fragmentation when a packet exceeds an MTU. Modern designs prefer suitable MTUs and Path MTU Discovery rather than relying on fragmentation.

### Apply the model

1. **Step 1 — Layer 3 addresses survive the route.** The IPv4 source and destination fields identify the original sender and final receiver. At each router hop the Ethernet frame is replaced for the next link, while the end-to-end IP addresses normally remain unchanged.
2. **Step 2 — TTL prevents endless routed loops.** Every router decrements Time To Live. A packet whose TTL reaches zero is discarded and normally triggers ICMP Time Exceeded, which is why traceroute can reveal successive hops.
3. **Step 3 — Know why fragmentation matters.** Identification, flags and fragment offset allow IPv4 fragmentation when a packet exceeds an MTU. Modern designs prefer suitable MTUs and Path MTU Discovery rather than relying on fragmentation.

## $ Header layout, length and service fields

The IPv4 header has 20 bytes of fixed fields and can grow to 60 bytes with Options. Version is always 4. IHL reports header length in 4-byte units: IHL 5 means 20 bytes. Total Length is different: it reports the complete IP packet, header plus payload, in bytes.

| Field | Bits | Purpose |
| --- | --- | --- |
| Version / IHL | 4 / 4 | Identifies IPv4 and header length. |
| DSCP / ECN | 6 / 2 | QoS marking and optional congestion notification. |
| Total Length | 16 | Full IP packet size, from 20 to 65,535 bytes. |
| Source / destination | 32 / 32 | Original sender and final receiver addresses. |
| Options | 0–320 | Optional fields; variable length creates need for IHL. |

## $ Fragmentation, TTL, protocol and integrity

When an IP packet exceeds a path MTU, IPv4 can fragment it. Identification groups fragments; DF forbids fragmentation; MF indicates another fragment follows; Fragment Offset restores order at the destination. Routers decrement TTL on each hop and discard packets at zero, preventing routing loops. Header Checksum protects the IPv4 header and is recalculated because TTL changes at every router.

| Protocol field value | Encapsulated protocol |
| --- | --- |
| 1 | ICMP (including ping) |
| 6 | TCP |
| 17 | UDP |
| 89 | OSPF |

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

A router discards a packet whose TTL reaches zero and normally sends ICMP Time Exceeded. This behavior is the basis of traceroute.
