## $ Why this matters

A working OSPF deployment depends on matching neighbor parameters, correct area placement and a clear understanding of where the selected route originated.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: OSPF Route Types & Troubleshooting
>
> 01 Route codes
>
> 02 Default route
>
> 03 Troubleshooting order

01

### Route codes

OSPF routes commonly appear as O for intra-area, O IA for inter-area and O E1/O E2 for redistributed external destinations.

02

### Default route

An OSPF default is advertised intentionally by an appropriate router; it does not appear merely because a router happens to have Internet access.

03

### Troubleshooting order

Confirm interfaces and IP reachability, then neighbors, interface OSPF settings, LSDB content and finally the installed route.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Route codes | OSPF routes commonly appear as O for intra-area, O IA for inter-area and O E1/O E2 for redistributed external destinations. |
| Default route | An OSPF default is advertised intentionally by an appropriate router; it does not appear merely because a router happens to have Internet access. |
| Troubleshooting order | Confirm interfaces and IP reachability, then neighbors, interface OSPF settings, LSDB content and finally the installed route. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Router ID is a stable identity

OSPF identifies routers with a 32-bit router ID. Configure it deliberately when possible; otherwise OSPF derives one from interface addresses, which can make changes less predictable.

NOTE\_02

### Cost selects an OSPF path

OSPF cost is interface-based and accumulated across the path. Adjust the reference bandwidth or explicit interface cost thoughtfully so faster links are represented correctly in a modern topology.

NOTE\_03

### Troubleshoot in layers

Confirm interface addressing and reachability, verify OSPF is enabled in the intended area, inspect neighbours, LSDB and routes, then validate that the chosen cost matches the design.

### Apply the model

1. **Step 1 — Router ID is a stable identity.** OSPF identifies routers with a 32-bit router ID. Configure it deliberately when possible; otherwise OSPF derives one from interface addresses, which can make changes less predictable.
2. **Step 2 — Cost selects an OSPF path.** OSPF cost is interface-based and accumulated across the path. Adjust the reference bandwidth or explicit interface cost thoughtfully so faster links are represented correctly in a modern topology.
3. **Step 3 — Troubleshoot in layers.** Confirm interface addressing and reachability, verify OSPF is enabled in the intended area, inspect neighbours, LSDB and routes, then validate that the chosen cost matches the design.

## $ Router ID and cost

OSPF uses a 32-bit router ID as a stable identity. Configure it deliberately to avoid an address-derived identity changing with interface configuration. OSPF cost is accumulated across the path; the reference bandwidth and interface cost must represent modern link speeds correctly.

| Selection point | Rule |
| --- | --- |
| Router ID | Configured router-id is preferred; otherwise OSPF derives an address according to IOS selection rules. |
| Path cost | Lowest cumulative cost wins within OSPF. |
| Reference bandwidth | Cost calculations depend on reference bandwidth; tune consistently on all participating routers. |
| Interface cost | Explicit cost overrides the automatic bandwidth-based calculation. |

## $ Configuration and fault isolation

Validate OSPF from the bottom up: physical/link state and addressing, interface participation and area, neighbour adjacency, LSDB, route installation and finally path selection. Do not change costs to compensate for an adjacency or area error.

```
router ospf 1
 auto-cost reference-bandwidth 100000
interface g0/0
 ip ospf cost 10
```

Sets a consistent reference bandwidth and optionally an explicit interface cost; choose values that match the design.

```
show ip ospf
show ip ospf database
show ip route ospf
```

Checks process identity, topology knowledge and resulting routes.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show ip ospf neighbor
```

Checks whether required adjacencies have formed.

```
show ip route ospf
```

Confirms which OSPF routes reached the routing table.

```
show ip ospf interface brief
```

Provides a concise OSPF interface and area overview.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Do not diagnose OSPF from the routing table alone. A missing route can originate in neighbor formation, LSA propagation, route filtering or path selection.
