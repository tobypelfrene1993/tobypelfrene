## $ Why this matters

After root election, each non-root switch chooses one root port. Each network segment chooses one designated port; redundant alternatives do not forward.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: STP Port Roles, States & Path Selection
>
> 01 Root port
>
> 02 Designated port
>
> 03 Tie breakers

01

### Root port

A non-root switch selects the port with the best path toward the root bridge. A root bridge has no root port.

02

### Designated port

Each segment has one designated port that forwards traffic away from the root toward that segment.

03

### Tie breakers

STP compares root path cost, upstream bridge ID, upstream port ID and then local port ID to choose between otherwise equal candidates.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Root port | A non-root switch selects the port with the best path toward the root bridge. A root bridge has no root port. |
| Designated port | Each segment has one designated port that forwards traffic away from the root toward that segment. |
| Tie breakers | STP compares root path cost, upstream bridge ID, upstream port ID and then local port ID to choose between otherwise equal candidates. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Build the tree from the root outward

All root-bridge ports forward. Every non-root switch chooses exactly one root port: its best path toward the root. Each LAN segment then has one designated forwarding port.

NOTE\_02

### Apply the decision sequence

When candidates compete, STP compares root path cost, then upstream bridge ID, upstream port ID and finally local port ID. These tie-breakers explain why an apparently equivalent link can be blocked.

NOTE\_03

### Do not mix roles and states

A role describes a port’s topology job, such as root or designated. A state describes forwarding behaviour, such as forwarding or blocking. The two labels answer different questions.

### Apply the model

1. **Step 1 — Build the tree from the root outward.** All root-bridge ports forward. Every non-root switch chooses exactly one root port: its best path toward the root. Each LAN segment then has one designated forwarding port.
2. **Step 2 — Apply the decision sequence.** When candidates compete, STP compares root path cost, then upstream bridge ID, upstream port ID and finally local port ID. These tie-breakers explain why an apparently equivalent link can be blocked.
3. **Step 3 — Do not mix roles and states.** A role describes a port’s topology job, such as root or designated. A state describes forwarding behaviour, such as forwarding or blocking. The two labels answer different questions.

## $ Port roles, states and path-selection order

Every non-root switch selects one Root Port toward the root; every network segment selects one Designated Port. Remaining redundant choices are Non-designated/blocked in classic STP. Role is a topology responsibility; state describes current forwarding behaviour.

| State | BPDUs | Ordinary traffic | Learns MAC addresses |
| --- | --- | --- | --- |
| Blocking | Receives only | No | No |
| Listening | Sends and receives | No | No |
| Learning | Sends and receives | No | Yes |
| Forwarding | Sends and receives | Yes | Yes |
| Disabled | No STP role | No | No |

## $ Timers and tie-breakers

Classic STP uses a 2-second Hello timer, a 20-second Max Age timer and a 15-second Forward Delay for each of Listening and Learning. A port normally spends 30 seconds moving from blocking through both transition states to forwarding. When paths compete, compare root path cost, upstream bridge ID, upstream port ID and finally local port ID.

```
show spanning-tree detail
show spanning-tree inconsistentports
```

Shows timer values, topology changes and ports held by an STP protection state.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show spanning-tree vlan 1
```

Shows the role and state chosen for VLAN 1.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Port role answers who a port is in the topology; port state answers whether and how it participates in forwarding.
