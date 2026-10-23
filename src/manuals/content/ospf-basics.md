## $ Why this matters

OSPF is a link-state IGP. Routers form adjacencies, exchange link-state information within an area and independently calculate best paths with SPF.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

>

### OSPF chooses the lowest-cost path

 AREA 0   R1 R2 R3 R4 COST 10COST 10COST 10 COST 50COST 50 SELECTED TOTAL COST: 30 // ALTERNATIVE: 100\

OSPF adds interface costs along each candidate route and installs the path with the lowest total cost.



01

### Router ID

A 32-bit router ID identifies an OSPF router. It should be stable and unique; a manually configured ID is the clearest design choice.

02

### Area 0

Area 0 is the backbone. In a multi-area OSPF design, non-backbone areas connect to the backbone.

03

### Cost

OSPF selects lowest total cost. Interface cost is commonly derived from a reference bandwidth divided by interface bandwidth.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Router ID | A 32-bit router ID identifies an OSPF router. It should be stable and unique; a manually configured ID is the clearest design choice. |
| Area 0 | Area 0 is the backbone. In a multi-area OSPF design, non-backbone areas connect to the backbone. |
| Cost | OSPF selects lowest total cost. Interface cost is commonly derived from a reference bandwidth divided by interface bandwidth. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### OSPF is link-state

OSPF neighbours exchange LSAs, which form a Link-State Database for the area. Each router independently runs SPF/Dijkstra on that shared map and installs its best routes.

NOTE\_02

### Areas constrain scale

A large single LSDB increases memory, processing and flooding impact. Area 0 is the backbone; non-backbone areas connect through an ABR and each area should remain contiguous.

NOTE\_03

### Start with single-area OSPFv2

The CCNA configuration scope is single-area OSPFv2. Interfaces on the same subnet must be placed in the same area or they will not form the expected neighbour relationship.

### Apply the model

1. **Step 1 — OSPF is link-state.** OSPF neighbours exchange LSAs, which form a Link-State Database for the area. Each router independently runs SPF/Dijkstra on that shared map and installs its best routes.
2. **Step 2 — Areas constrain scale.** A large single LSDB increases memory, processing and flooding impact. Area 0 is the backbone; non-backbone areas connect through an ABR and each area should remain contiguous.
3. **Step 3 — Start with single-area OSPFv2.** The CCNA configuration scope is single-area OSPFv2. Interfaces on the same subnet must be placed in the same area or they will not form the expected neighbour relationship.

## $ OSPF link-state operation

OSPF is a link-state routing protocol. Routers first form neighbour relationships, exchange Link-State Advertisements and flood them through the area. The resulting Link-State Database is a common topology map; each router runs SPF/Dijkstra independently and installs its own best routes.

| Step | Result |
| --- | --- |
| Neighbour formation | Routers on the same segment become OSPF neighbours after compatible Hello processing. |
| LSA exchange and flooding | Routers build a consistent LSDB for the area. |
| SPF calculation | Each router calculates paths and installs routes in its routing table. |
| Refresh | LSAs are refreshed on the source material’s 30-minute aging cycle. |

## $ Areas and CCNA single-area scope

Areas limit LSDB size, SPF processing and the impact of flooding. Area 0 is the backbone. Each non-backbone area needs an Area Border Router connection to Area 0, each area must be contiguous, and interfaces in the same subnet must be assigned to the same area. The CCNA configuration focus is single-area OSPFv2, normally Area 0.

| Router role | Meaning |
| --- | --- |
| Internal router | All OSPF interfaces are in one area. |
| ABR | Connects multiple areas and maintains an LSDB per attached area. |
| Backbone router | Has at least one interface in Area 0. |
| ASBR | Introduces external information, such as a default route, into OSPF. |

## $ Basic configuration and verification

Use a stable router ID and verify that intended interfaces participate in the intended area. The `network` command matches interfaces by address and wildcard mask; it is not a route advertisement command in isolation.

```
router ospf 1
 router-id 1.1.1.1
 network 10.0.12.0 0.0.0.3 area 0
```

Starts process 1, sets a deliberate router ID and enables matching interfaces in Area 0.

```
show ip ospf neighbor
show ip ospf database
show ip route ospf
```

Verifies adjacency, LSDB contents and installed OSPF routes in that order.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show ip ospf neighbor
```

Shows OSPF neighbors and their adjacency state.

```
show ip route ospf
```

Shows routes installed from OSPF.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Matching area, subnet, hello/dead timers, authentication and network type are common prerequisites for an OSPF adjacency.
