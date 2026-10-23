## $ Why this matters

STP prevents Layer 2 loops by electing a root bridge and placing redundant switch ports into non-forwarding states while preserving a backup path.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

>

### STP removes the redundant Layer 2 loop

   SW1ROOT BRIDGE SW2FORWARDING SW3FORWARDING  REDUNDANT LINK: BLOCKED FORWARDING PATHS PRESERVE CONNECTIVITY WITHOUT A LOOP.\

The elected root bridge keeps a forwarding topology. A redundant link remains available but one port is blocked to prevent a Layer 2 loop.



01

### Loop consequences

Ethernet frames have no Layer 2 TTL. Redundant links can therefore create broadcast storms, duplicate frames and unstable MAC address tables.

02

### Root bridge

The switch with the lowest bridge ID becomes root. Bridge ID is priority plus an extended system ID and MAC address.

03

### BPDUs

Switches exchange Bridge Protocol Data Units to advertise root information and calculate the spanning-tree topology.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Loop consequences | Ethernet frames have no Layer 2 TTL. Redundant links can therefore create broadcast storms, duplicate frames and unstable MAC address tables. |
| Root bridge | The switch with the lowest bridge ID becomes root. Bridge ID is priority plus an extended system ID and MAC address. |
| BPDUs | Switches exchange Bridge Protocol Data Units to advertise root information and calculate the spanning-tree topology. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Redundancy needs loop control

Redundant Layer 2 links provide a backup path, but Ethernet frames do not contain a Layer 2 TTL. Broadcasts and unknown unicasts can therefore circulate forever, producing broadcast storms and MAC-address flapping.

NOTE\_02

### STP keeps the backup available

IEEE 802.1D STP elects one root bridge and blocks redundant paths. Forwarding ports carry normal traffic; blocking ports keep the alternate path available and participate in STP control traffic.

NOTE\_03

### Root election starts with the lowest Bridge ID

Switches exchange BPDUs, typically at two-second hello intervals. The lowest bridge ID wins; with default priority 32768 everywhere, the lowest MAC address becomes the root.

### Apply the model

1. **Step 1 — Redundancy needs loop control.** Redundant Layer 2 links provide a backup path, but Ethernet frames do not contain a Layer 2 TTL. Broadcasts and unknown unicasts can therefore circulate forever, producing broadcast storms and MAC-address flapping.
2. **Step 2 — STP keeps the backup available.** IEEE 802.1D STP elects one root bridge and blocks redundant paths. Forwarding ports carry normal traffic; blocking ports keep the alternate path available and participate in STP control traffic.
3. **Step 3 — Root election starts with the lowest Bridge ID.** Switches exchange BPDUs, typically at two-second hello intervals. The lowest bridge ID wins; with default priority 32768 everywhere, the lowest MAC address becomes the root.

## $ Why redundant Layer 2 links need STP

Redundancy provides alternate paths, but Ethernet has no Layer 2 TTL. A broadcast or unknown unicast can therefore loop indefinitely, creating a broadcast storm. Repeated frames also make the same source MAC appear on changing ports, producing MAC address flapping. IEEE 802.1D STP prevents this while retaining a backup path.

| STP concept | Operational effect |
| --- | --- |
| Root bridge | Lowest Bridge ID becomes the reference switch; all its ports forward. |
| BPDU | Control message that carries root and path information; default hello interval is 2 seconds. |
| Blocking port | Stops ordinary forwarding but retains the alternate path and receives STP information. |
| Forwarding port | Carries ordinary frames and participates in the loop-free topology. |

## $ Root election and intended topology

Bridge ID combines bridge priority, extended system ID and MAC address. The lowest value wins. With the default priority of 32768 on every switch, the lowest MAC address wins unintentionally; set priority deliberately on the intended root rather than accepting a random result.

```
show spanning-tree
show spanning-tree vlan 1
```

Shows root bridge identity, root path cost, port role and forwarding/blocking state.

```
spanning-tree vlan 1 root primary
```

Cisco shortcut that lowers local priority to make the selected switch the likely root for VLAN 1.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show spanning-tree
```

Displays root information, port roles, states and path-cost decisions.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

The lowest bridge ID wins the root election. Lower priority wins before the MAC address is used as the tie-breaker.
