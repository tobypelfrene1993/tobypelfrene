## $ Why this matters

BPDU Guard protects an expected edge port by err-disabling it if a switch BPDU arrives. BPDU Filter suppresses BPDUs and must be used with more caution.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: BPDU Guard & BPDU Filter
>
> 01 PortFast context
>
> 02 BPDU Guard
>
> 03 BPDU Filter risk

01

### PortFast context

PortFast is intended for true end-device-facing ports so they can move to forwarding without the normal STP delay.

02

### BPDU Guard

Receiving a BPDU on a PortFast edge port implies an unexpected switch connection, so the port is placed into err-disabled state.

03

### BPDU Filter risk

Filtering BPDUs can hide topology information and allow a loop if used toward another switch. It is not a general-purpose security substitute.

| Concept | What to remember in a lab or exam |
| --- | --- |
| PortFast context | PortFast is intended for true end-device-facing ports so they can move to forwarding without the normal STP delay. |
| BPDU Guard | Receiving a BPDU on a PortFast edge port implies an unexpected switch connection, so the port is placed into err-disabled state. |
| BPDU Filter risk | Filtering BPDUs can hide topology information and allow a loop if used toward another switch. It is not a general-purpose security substitute. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### PortFast is for a true edge

An end-device-facing access port can transition quickly to forwarding with PortFast. It should not be treated as a shortcut for switch-to-switch links, where STP must still protect the topology.

NOTE\_02

### Guard is the normal defensive choice

BPDU Guard places a PortFast port into err-disabled when it receives a BPDU. That turns an unexpected switch connection into a visible, contained fault instead of a potential loop.

NOTE\_03

### Filtering removes safety information

BPDU Filter suppresses BPDUs. Used toward another switch it can hide topology information and permit a loop, so it is a tightly controlled exception rather than a general access-port default.

### Apply the model

1. **Step 1 — PortFast is for a true edge.** An end-device-facing access port can transition quickly to forwarding with PortFast. It should not be treated as a shortcut for switch-to-switch links, where STP must still protect the topology.
2. **Step 2 — Guard is the normal defensive choice.** BPDU Guard places a PortFast port into err-disabled when it receives a BPDU. That turns an unexpected switch connection into a visible, contained fault instead of a potential loop.
3. **Step 3 — Filtering removes safety information.** BPDU Filter suppresses BPDUs. Used toward another switch it can hide topology information and permit a loop, so it is a tightly controlled exception rather than a general access-port default.

## $ PortFast, BPDU Guard and BPDU Filter are not interchangeable

PortFast is for a true edge port connected to an end host: it bypasses the normal classic-STP transition delay. It does not make a switch-to-switch link safe. BPDU Guard turns an unexpected BPDU on an edge port into a contained err-disabled failure. BPDU Filter suppresses the control traffic that prevents loops and therefore requires exceptional care.

| Feature | Trigger / behaviour | Correct placement |
| --- | --- | --- |
| PortFast | Moves a genuine edge port rapidly toward forwarding | Host-facing access ports only |
| BPDU Guard | Received BPDU causes err-disable | PortFast edge ports |
| BPDU Filter | Suppresses BPDUs | Only a deliberate exceptional design; not a general security setting |

## $ Configuration and recovery evidence

An edge-port guard is effective only when it is enabled where the design expects an end device. Investigate why a BPDU appeared before simply re-enabling a port: it can indicate an unauthorised switch or an accidental loop.

```
interface g0/10
 spanning-tree portfast
 spanning-tree bpduguard enable
```

Applies PortFast and local BPDU Guard to an end-device-facing port.

```
spanning-tree portfast bpduguard default
show errdisable recovery
show interfaces status err-disabled
```

Enables guard for PortFast ports by default and verifies an err-disabled condition or recovery settings.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
spanning-tree portfast
```

Marks an appropriate access interface as an edge/PortFast port.

```
spanning-tree bpduguard enable
```

Err-disables the interface if it receives a BPDU.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

BPDU Guard reacts to BPDUs; BPDU Filter suppresses them. Treat the latter as a deliberate exception, not a default access-port setting.
