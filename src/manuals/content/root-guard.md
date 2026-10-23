## $ Why this matters

Root Guard enforces the intended STP design by preventing a connected device from becoming root through superior BPDUs on a protected port.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: Root Guard
>
> 01 Placement
>
> 02 Root-inconsistent
>
> 03 Automatic recovery

01

### Placement

Apply Root Guard to ports where you never expect a superior root advertisement, commonly links from the distribution layer toward access switches.

02

### Root-inconsistent

When a superior BPDU arrives, the guarded port moves into root-inconsistent state instead of accepting the new root path.

03

### Automatic recovery

The port returns when the superior BPDUs stop, without changing the intended root configuration.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Placement | Apply Root Guard to ports where you never expect a superior root advertisement, commonly links from the distribution layer toward access switches. |
| Root-inconsistent | When a superior BPDU arrives, the guarded port moves into root-inconsistent state instead of accepting the new root path. |
| Automatic recovery | The port returns when the superior BPDUs stop, without changing the intended root configuration. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Control where the root may appear

Root Guard is placed where a superior root advertisement is never expected, commonly from a distribution switch toward an access layer. It preserves the intended root-bridge placement.

NOTE\_02

### A superior BPDU is contained

If a protected port receives a superior BPDU, it becomes root-inconsistent rather than accepting the new root path. The rest of the topology retains the planned root.

NOTE\_03

### It solves a different risk from BPDU Guard

BPDU Guard protects expected edge ports from any BPDU. Root Guard allows a switch connection but rejects an attempt to influence root election.

### Apply the model

1. **Step 1 — Control where the root may appear.** Root Guard is placed where a superior root advertisement is never expected, commonly from a distribution switch toward an access layer. It preserves the intended root-bridge placement.
2. **Step 2 — A superior BPDU is contained.** If a protected port receives a superior BPDU, it becomes root-inconsistent rather than accepting the new root path. The rest of the topology retains the planned root.
3. **Step 3 — It solves a different risk from BPDU Guard.** BPDU Guard protects expected edge ports from any BPDU. Root Guard allows a switch connection but rejects an attempt to influence root election.

## $ Root Guard fixes root placement, not edge-port safety

Root Guard enforces where the root bridge may appear. Apply it to a port where a superior BPDU must never arrive, commonly a distribution-to-access direction. A connected downstream switch can still participate in STP, but cannot take over root placement through a lower Bridge ID.

| Event | Root Guard response |
| --- | --- |
| Ordinary inferior BPDU | Port participates normally. |
| Superior BPDU received | Port enters root-inconsistent instead of accepting the remote switch as a better root path. |
| Superior BPDU stops | Port can recover automatically. |

## $ Placement and verification

Do not confuse Root Guard with BPDU Guard. Root Guard permits an expected switch neighbour but blocks its attempt to influence the root; BPDU Guard is for a port where no switch BPDUs should ever appear.

```
interface g0/1
 spanning-tree guard root
```

Enables Root Guard on the selected downstream-facing interface.

```
show spanning-tree inconsistentports
```

Confirms ports held in root-inconsistent or other STP inconsistent states.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
spanning-tree guard root
```

Enables Root Guard on the selected interface.

```
show spanning-tree inconsistentports
```

Shows ports blocked by STP protection mechanisms.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Root Guard protects root placement. BPDU Guard protects edge ports. They solve different topology risks.
