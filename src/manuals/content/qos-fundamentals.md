## $ Why this matters

Quality of Service manages traffic behavior when a link cannot send every packet immediately. QoS does not create bandwidth; it makes policy-based decisions under contention.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: QoS Fundamentals
>
> 01 Classification and marking
>
> 02 Policing and shaping
>
> 03 Congestion management

01

### Classification and marking

Traffic is identified by characteristics such as addresses, ports or application type, then marked so downstream devices can apply a consistent policy.

02

### Policing and shaping

Policing enforces a rate by dropping or remarking excess traffic; shaping buffers excess traffic to send it at a controlled rate.

03

### Congestion management

Queuing determines which traffic is sent first when an interface has more traffic than it can transmit.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Classification and marking | Traffic is identified by characteristics such as addresses, ports or application type, then marked so downstream devices can apply a consistent policy. |
| Policing and shaping | Policing enforces a rate by dropping or remarking excess traffic; shaping buffers excess traffic to send it at a controlled rate. |
| Congestion management | Queuing determines which traffic is sent first when an interface has more traffic than it can transmit. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### QoS operates when demand exceeds egress capacity

QoS does not create bandwidth. It classifies, marks and schedules traffic where packets must wait for a slower egress link, making an explicit policy decision under contention.

NOTE\_02

### Police and shape behave differently

Policing enforces a rate by dropping or remarking excess traffic. Shaping buffers excess traffic and releases it at a controlled rate, trading delay for smoother output.

NOTE\_03

### Classify at the trust boundary

Identify traffic with addresses, ports or application characteristics, then mark it consistently. Decide where markings are trusted or rewritten so an untrusted endpoint cannot simply claim priority.

### Apply the model

1. **Step 1 — QoS operates when demand exceeds egress capacity.** QoS does not create bandwidth. It classifies, marks and schedules traffic where packets must wait for a slower egress link, making an explicit policy decision under contention.
2. **Step 2 — Police and shape behave differently.** Policing enforces a rate by dropping or remarking excess traffic. Shaping buffers excess traffic and releases it at a controlled rate, trading delay for smoother output.
3. **Step 3 — Classify at the trust boundary.** Identify traffic with addresses, ports or application characteristics, then mark it consistently. Decide where markings are trusted or rewritten so an untrusted endpoint cannot simply claim priority.

## $ QoS begins at congestion

QoS does not create bandwidth. It makes policy decisions when an egress interface cannot serialize every packet immediately. The most important design question is therefore where congestion occurs, usually at a slower egress link, and which applications need predictable loss, delay or jitter treatment.

| QoS function | Purpose | Typical effect |
| --- | --- | --- |
| Classification | Identifies traffic by address, port, protocol or application | Places packets in a policy class |
| Marking | Writes a priority value | Lets downstream devices recognise intended treatment |
| Policing | Enforces a rate | Drops or remarks excess traffic |
| Shaping | Smooths output to a configured rate | Buffers excess traffic, adding controlled delay |
| Queuing | Selects packet order during congestion | Protects important traffic at egress |

## $ Marking and rate control

Marking alone does nothing until a downstream device classifies and acts on it. Policing and shaping are intentionally different: a policer immediately enforces a boundary by dropping or remarking traffic above rate, while a shaper queues excess packets and releases them later. Choose based on whether controlled delay is acceptable.

| Question | Policing | Shaping |
| --- | --- | --- |
| What happens above rate? | Drop or remark | Buffer and delay |
| Does it smooth bursts? | No | Yes |
| Where used? | Trust boundary or hard contract | Often before a slower/provider-facing egress |

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

QoS is most important at congested egress links because that is where packets must wait for serial transmission.
