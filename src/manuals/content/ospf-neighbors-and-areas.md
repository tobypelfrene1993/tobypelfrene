## $ Why this matters

OSPF reduces unnecessary adjacency complexity on multi-access networks through designated routers, while areas limit the scope of link-state information.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: OSPF Neighbors, DR/BDR & Areas
>
> 01 Neighbor states
>
> 02 DR and BDR
>
> 03 Area boundaries

01

### Neighbor states

Hello messages discover neighbors. The state machine progresses through exchanges until databases are synchronized and a full adjacency exists where required.

02

### DR and BDR

On broadcast multi-access segments, a DR and BDR centralize many adjacencies. Election preference uses priority then router ID.

03

### Area boundaries

Area Border Routers connect areas and keep LSDB flooding scoped, making large OSPF domains more manageable.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Neighbor states | Hello messages discover neighbors. The state machine progresses through exchanges until databases are synchronized and a full adjacency exists where required. |
| DR and BDR | On broadcast multi-access segments, a DR and BDR centralize many adjacencies. Election preference uses priority then router ID. |
| Area boundaries | Area Border Routers connect areas and keep LSDB flooding scoped, making large OSPF domains more manageable. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Adjacency starts with compatible Hellos

OSPF routers must agree on key parameters before becoming neighbours. A mismatch in area, subnet, timers, authentication or network type can prevent adjacency even when IP connectivity exists.

NOTE\_02

### Know the neighbour-state progression

Neighbour states show where adjacency development stopped. Two-Way can be normal on broadcast segments for routers that are not fully adjacent, while ExStart or Exchange often points to negotiation problems.

NOTE\_03

### DR and BDR reduce adjacency overhead

On multiaccess broadcast networks, a Designated Router and Backup Designated Router reduce the number of full adjacencies. Point-to-point links do not use that election.

### Apply the model

1. **Step 1 — Adjacency starts with compatible Hellos.** OSPF routers must agree on key parameters before becoming neighbours. A mismatch in area, subnet, timers, authentication or network type can prevent adjacency even when IP connectivity exists.
2. **Step 2 — Know the neighbour-state progression.** Neighbour states show where adjacency development stopped. Two-Way can be normal on broadcast segments for routers that are not fully adjacent, while ExStart or Exchange often points to negotiation problems.
3. **Step 3 — DR and BDR reduce adjacency overhead.** On multiaccess broadcast networks, a Designated Router and Backup Designated Router reduce the number of full adjacencies. Point-to-point links do not use that election.

## $ Neighbour formation and states

OSPF neighbours must agree on essential parameters before exchanging a usable database. Check IP connectivity and matching area, subnet, authentication, hello/dead timers and network type. A mismatch can leave the link up while OSPF never reaches a usable adjacency.

| State | Meaning |
| --- | --- |
| Down / Init | Hello information is absent or only one-way. |
| Two-Way | Bidirectional Hello exchange; normal stable state for some non-DR/BDR routers on broadcast networks. |
| ExStart / Exchange | Routers negotiate and exchange database descriptions; persistent failure suggests MTU or compatibility trouble. |
| Loading | Missing LSAs are being requested. |
| Full | LSDB synchronization is complete for a full adjacency. |

## $ Network types, DR/BDR and area troubleshooting

On broadcast multiaccess networks, a DR and BDR reduce the number of full adjacencies. Point-to-point links do not elect a DR/BDR. All interfaces on the same subnet must use the same OSPF area; a mismatch prevents expected neighbour formation.

```
show ip ospf neighbor
show ip ospf interface g0/0
show ip protocols
```

Checks neighbour state, DR/BDR role, timers, network type and active OSPF process settings.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show ip ospf interface
```

Shows OSPF network type, timers, cost and DR/BDR information per interface.

```
show ip ospf database
```

Displays the OSPF link-state database.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

DR/BDR is a property of the shared network type, not an OSPF-wide hierarchy. A point-to-point link does not elect a DR or BDR.
