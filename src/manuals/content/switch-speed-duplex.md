## $ Why this matters

Speed and duplex determine how an Ethernet link transmits. Modern Ethernet normally uses auto-negotiation, but inconsistent manual settings can create a duplex mismatch.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: Switch Interfaces, Speed & Duplex
>
> 01 Full versus half duplex
>
> 02 Auto-negotiation
>
> 03 Symptoms

01

### Full versus half duplex

Full duplex sends and receives at the same time and has no collisions. Half duplex shares the medium and depends on collision handling.

02

### Auto-negotiation

Both ends should normally negotiate automatically. Forcing only one end may leave the other end selecting an incompatible fallback.

03

### Symptoms

A duplex mismatch can leave the link up while causing low throughput, late collisions, FCS errors or input errors.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Full versus half duplex | Full duplex sends and receives at the same time and has no collisions. Half duplex shares the medium and depends on collision handling. |
| Auto-negotiation | Both ends should normally negotiate automatically. Forcing only one end may leave the other end selecting an incompatible fallback. |
| Symptoms | A duplex mismatch can leave the link up while causing low throughput, late collisions, FCS errors or input errors. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Prefer matched auto-negotiation

Modern Ethernet normally negotiates speed and duplex. Forcing one end while leaving the other automatic can create a mismatch even though the link light remains up.

NOTE\_02

### Duplex changes collision behaviour

Full duplex transmits and receives simultaneously without collisions. Half duplex shares the medium and uses collision handling, making a half/full mismatch a performance and error problem.

NOTE\_03

### Validate counters as well as status

Poor throughput, late collisions, FCS errors and input errors can indicate a duplex mismatch. Use detailed interface output to compare speed, duplex and counters at both ends.

### Apply the model

1. **Step 1 — Prefer matched auto-negotiation.** Modern Ethernet normally negotiates speed and duplex. Forcing one end while leaving the other automatic can create a mismatch even though the link light remains up.
2. **Step 2 — Duplex changes collision behaviour.** Full duplex transmits and receives simultaneously without collisions. Half duplex shares the medium and uses collision handling, making a half/full mismatch a performance and error problem.
3. **Step 3 — Validate counters as well as status.** Poor throughput, late collisions, FCS errors and input errors can indicate a duplex mismatch. Use detailed interface output to compare speed, duplex and counters at both ends.

## $ Switch versus router interface defaults

Router interfaces are administratively down by default; switch access ports are not. A connected default switchport normally becomes up/up, while an unplugged port is down/down. Layer 2 switchports do not need an IP address; the unassigned field in show ip interface brief is expected.

| Device / state | Meaning |
| --- | --- |
| Router: administratively down/down | shutdown is applied by default; use no shutdown after configuration. |
| Switch: up/up | Port is connected and physical plus line protocol are operational. |
| Switch: down/down | No usable physical connection; it is not necessarily administratively disabled. |
| show interfaces status | Uses connected/notconnect style status and shows VLAN, duplex, speed and media type. |

## $ Speed, duplex and error interpretation

Speed is the transmission rate (for example 10, 100 or 1000 Mbps). Full duplex sends and receives simultaneously; half duplex shares the medium and uses collisions. Auto-negotiation is the normal choice when both ends support it. Forcing only one side can leave an apparently up link with a damaging duplex mismatch.

```
interface g0/0
 speed 100
 duplex full
 description Uplink to R1
```

Manual settings must match the remote endpoint exactly; description documents the physical design.

```
show interfaces status
show interfaces g0/0
```

Checks negotiated values and detailed counters such as collisions, late collisions, FCS errors and input errors.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show interfaces gigabitethernet1/0/1
```

Shows negotiated speed, duplex and interface counters.

```
show interfaces status
```

Provides a concise view of connected switch ports and their speed/duplex state.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

An interface that is up/up is not automatically healthy. Error counters and negotiated speed/duplex are essential when performance is poor.
