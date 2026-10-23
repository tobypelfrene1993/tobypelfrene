## $ Why this matters

RSTP retains the loop-free spanning-tree goal but converges faster by using a simplified state model and handshake mechanisms on suitable links.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: Rapid Spanning Tree Protocol (RSTP)
>
> 01 Roles and states
>
> 02 Proposal and agreement
>
> 03 Edge ports

01

### Roles and states

RSTP uses root, designated, alternate and backup roles. Its operational states are discarding, learning and forwarding.

02

### Proposal and agreement

On point-to-point links, switches can use a handshake to rapidly transition safe designated paths instead of relying only on timer expiry.

03

### Edge ports

An RSTP edge port behaves like PortFast and can quickly forward for an end device, but it should lose edge status if it receives BPDUs.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Roles and states | RSTP uses root, designated, alternate and backup roles. Its operational states are discarding, learning and forwarding. |
| Proposal and agreement | On point-to-point links, switches can use a handshake to rapidly transition safe designated paths instead of relying only on timer expiry. |
| Edge ports | An RSTP edge port behaves like PortFast and can quickly forward for an end device, but it should lose edge status if it receives BPDUs. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### RSTP is the faster spanning-tree model

IEEE 802.1w retains loop prevention but reduces the operational state model to discarding, learning and forwarding. Roles include root, designated, alternate and backup.

NOTE\_02

### Alternate ports are ready backups

An alternate port already has a calculated path toward the root. When the active path fails, this pre-calculated information supports faster convergence than classic timer-based STP.

NOTE\_03

### Handshake only where it is safe

On point-to-point links, proposal/agreement exchanges can rapidly move a safe designated path into forwarding. Edge ports behave like PortFast but must stop being edge ports if BPDUs arrive.

### Apply the model

1. **Step 1 — RSTP is the faster spanning-tree model.** IEEE 802.1w retains loop prevention but reduces the operational state model to discarding, learning and forwarding. Roles include root, designated, alternate and backup.
2. **Step 2 — Alternate ports are ready backups.** An alternate port already has a calculated path toward the root. When the active path fails, this pre-calculated information supports faster convergence than classic timer-based STP.
3. **Step 3 — Handshake only where it is safe.** On point-to-point links, proposal/agreement exchanges can rapidly move a safe designated path into forwarding. Edge ports behave like PortFast but must stop being edge ports if BPDUs arrive.

## $ RSTP roles, states and rapid convergence

IEEE 802.1w RSTP keeps the loop-free goal of STP but improves convergence. It uses root, designated, alternate and backup roles, and reduces operational states to discarding, learning and forwarding. Alternate ports are already-known backup paths toward the root; this pre-calculation is central to rapid recovery.

| RSTP state | Classic-STP relationship | Forwarding / learning |
| --- | --- | --- |
| Discarding | Combines blocking, listening and disabled behaviours | No / no |
| Learning | Same general purpose as classic learning | No / yes |
| Forwarding | Same general purpose as classic forwarding | Yes / yes |

## $ Proposal/agreement and edge behaviour

On a point-to-point link, proposal/agreement handshaking can confirm a safe forwarding path without waiting for classic timers. An RSTP edge port behaves like PortFast, but it must lose edge status if it receives a BPDU. Use normal STP safeguards on links where another switch may connect.

```
spanning-tree mode rapid-pvst
show spanning-tree summary
```

Enables Cisco Rapid PVST+ where supported and verifies active spanning-tree mode.

```
show spanning-tree vlan 1
```

Checks root, port role, RSTP state and the selected backup path for a VLAN.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
spanning-tree mode rapid-pvst
```

Selects Cisco Rapid PVST+ where supported.

```
show spanning-tree summary
```

Confirms the spanning-tree mode and related features.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

RSTP alternate ports provide a pre-calculated backup path to the root, which is central to faster convergence.
