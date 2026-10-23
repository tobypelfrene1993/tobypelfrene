## $ Why this matters

RIP and EIGRP are routing protocols that exchange reachability information with neighbors, but they differ significantly in scale, metric design and convergence behavior.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: RIP & EIGRP Routing
>
> 01 RIP
>
> 02 EIGRP
>
> 03 Loop prevention

01

### RIP

RIPv2 uses hop count as its metric, supports classless prefixes and has a maximum usable path length of 15 hops.

02

### EIGRP

EIGRP forms neighbor adjacencies and uses a composite metric based on bandwidth and delay by default. It maintains feasible successors for rapid backup use.

03

### Loop prevention

Techniques such as split horizon, route poisoning and hold-down concepts reduce routing loops in distance-vector behavior.

| Concept | What to remember in a lab or exam |
| --- | --- |
| RIP | RIPv2 uses hop count as its metric, supports classless prefixes and has a maximum usable path length of 15 hops. |
| EIGRP | EIGRP forms neighbor adjacencies and uses a composite metric based on bandwidth and delay by default. It maintains feasible successors for rapid backup use. |
| Loop prevention | Techniques such as split horizon, route poisoning and hold-down concepts reduce routing loops in distance-vector behavior. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### RIP is simple and limited

RIP uses hop count as its metric and treats 16 hops as unreachable. It is easy to understand but its scale and convergence characteristics make it unsuitable for many modern enterprise designs.

NOTE\_02

### EIGRP uses richer path information

EIGRP forms neighbour relationships and uses a composite metric that is primarily based on bandwidth and delay. It maintains feasible-successor information to support rapid, loop-free alternatives.

NOTE\_03

### Verify the protocol, not just the route

Inspect routing-table entries, active protocol configuration and neighbour state. A route can be absent because of a missing network statement, passive interface, adjacency failure or an inferior path.

### Apply the model

1. **Step 1 — RIP is simple and limited.** RIP uses hop count as its metric and treats 16 hops as unreachable. It is easy to understand but its scale and convergence characteristics make it unsuitable for many modern enterprise designs.
2. **Step 2 — EIGRP uses richer path information.** EIGRP forms neighbour relationships and uses a composite metric that is primarily based on bandwidth and delay. It maintains feasible-successor information to support rapid, loop-free alternatives.
3. **Step 3 — Verify the protocol, not just the route.** Inspect routing-table entries, active protocol configuration and neighbour state. A route can be absent because of a missing network statement, passive interface, adjacency failure or an inferior path.

## $ RIP versus EIGRP

RIP is a distance-vector protocol that uses hop count. Its maximum usable hop count is 15; 16 means unreachable. EIGRP is often described as an advanced distance-vector protocol: it forms neighbours, uses a composite metric primarily based on bandwidth and delay, and keeps topology information for rapid alternatives.

| Property | RIPv2 | EIGRP |
| --- | --- | --- |
| Metric | Hop count | Composite bandwidth and delay by default |
| Scale limit | 15 hops; 16 unreachable | No RIP-style 15-hop ceiling |
| Route updates | Periodic advertisements | Neighbour-based, event-driven information |
| Loop handling | Split horizon, route poisoning and timers | DUAL and feasible-successor logic |
| Load balancing | Equal-cost | Equal-cost and can support unequal-cost with variance |

## $ Neighbour and route verification

A dynamic route requires more than a network statement: the relevant interfaces must be up, the protocol must run on the correct networks and neighbours must form where required. Confirm neighbours before changing metrics or assuming the routing table is wrong.

```
show ip route rip
show ip protocols
```

Filters RIP routes and shows RIP process settings.

```
show ip eigrp neighbors
show ip eigrp topology
```

Checks EIGRP adjacency and the topology entries from which successor routes are selected.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show ip route rip
```

Filters the routing table to RIP-learned entries.

```
show ip eigrp neighbors
```

Shows EIGRP neighbors and their adjacency state.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

RIP metric means hop count. EIGRP’s feasible distance is the best known total metric; reported distance is what a neighbor reports to the destination.
