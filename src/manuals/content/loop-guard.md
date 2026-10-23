## $ Why this matters

Loop Guard keeps a non-designated STP port from incorrectly moving to forwarding when the expected BPDUs disappear because of a unidirectional failure.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: Loop Guard
>
> 01 Failure addressed
>
> 02 Loop-inconsistent state
>
> 03 Recovery

01

### Failure addressed

A blocked alternate path expects BPDUs. If those BPDUs stop arriving, ordinary STP could age the information out and permit forwarding.

02

### Loop-inconsistent state

Loop Guard places the affected port into a loop-inconsistent state rather than allowing it to transition to forwarding.

03

### Recovery

When valid BPDUs return, the port can recover automatically according to the spanning-tree calculation.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Failure addressed | A blocked alternate path expects BPDUs. If those BPDUs stop arriving, ordinary STP could age the information out and permit forwarding. |
| Loop-inconsistent state | Loop Guard places the affected port into a loop-inconsistent state rather than allowing it to transition to forwarding. |
| Recovery | When valid BPDUs return, the port can recover automatically according to the spanning-tree calculation. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Protect against missing—not superior—BPDUs

A non-designated port expects BPDUs. A unidirectional failure can stop those BPDUs even while the local link looks up, allowing ordinary STP information to age out.

NOTE\_02

### Hold a suspicious path safely

Loop Guard puts the affected port into loop-inconsistent state instead of allowing it to begin forwarding. This prevents the blocked backup path from becoming a Layer 2 loop.

NOTE\_03

### Recovery follows valid control traffic

When expected BPDUs return, the port can recover automatically through the spanning-tree calculation. Check inconsistent ports when investigating an unexpected non-forwarding link.

### Apply the model

1. **Step 1 — Protect against missing—not superior—BPDUs.** A non-designated port expects BPDUs. A unidirectional failure can stop those BPDUs even while the local link looks up, allowing ordinary STP information to age out.
2. **Step 2 — Hold a suspicious path safely.** Loop Guard puts the affected port into loop-inconsistent state instead of allowing it to begin forwarding. This prevents the blocked backup path from becoming a Layer 2 loop.
3. **Step 3 — Recovery follows valid control traffic.** When expected BPDUs return, the port can recover automatically through the spanning-tree calculation. Check inconsistent ports when investigating an unexpected non-forwarding link.

## $ Loop Guard protects against missing BPDUs

A non-designated port normally receives BPDUs. A unidirectional failure can stop those BPDUs while the local interface remains electrically up. Without protection, aging information can allow the former alternate path to forward and form a loop. Loop Guard detects the missing expected BPDUs and holds the port in loop-inconsistent state.

| Condition | Normal STP risk | Loop Guard result |
| --- | --- | --- |
| Expected BPDUs arrive | Port remains in its normal non-forwarding role | Normal operation |
| Expected BPDUs disappear | Aging may permit unwanted forwarding | Port enters loop-inconsistent instead |
| Valid BPDUs return | Topology information is again available | Port recovers through STP calculation |

## $ Placement and verification

Use Loop Guard on switch-to-switch paths that expect received BPDUs, not ordinary endpoint access ports. It complements—not replaces—physical fault detection and a deliberate STP root design.

```
spanning-tree loopguard default
```

Enables Loop Guard by default on relevant non-designated ports where supported.

```
show spanning-tree inconsistentports
show spanning-tree detail
```

Shows loop-inconsistent ports and topology/timer information used during diagnosis.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
spanning-tree loopguard default
```

Enables Loop Guard by default where the platform supports it.

```
show spanning-tree inconsistentports
```

Shows ports held in an STP inconsistent state.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Loop Guard is normally relevant on non-designated, point-to-point or shared links that expect to receive BPDUs; it is not designed for ordinary end-host ports.
