## $ Why this matters

Dynamic routing protocols allow routers to learn and react to reachability information instead of relying only on manually configured static routes.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: Dynamic Routing Protocols
>
> 01 Protocol families
>
> 02 Metrics
>
> 03 Administrative distance

01

### Protocol families

Distance-vector protocols advertise reachability information; link-state protocols build a topology view and run a shortest-path calculation.

02

### Metrics

A metric selects the best path inside a protocol. Examples include hop count, bandwidth-based calculations and cost.

03

### Administrative distance

Administrative distance selects between routes learned from different sources. It is not the same as a routing protocol metric.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Protocol families | Distance-vector protocols advertise reachability information; link-state protocols build a topology view and run a shortest-path calculation. |
| Metrics | A metric selects the best path inside a protocol. Examples include hop count, bandwidth-based calculations and cost. |
| Administrative distance | Administrative distance selects between routes learned from different sources. It is not the same as a routing protocol metric. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Routing protocols solve a changing topology

Static routes are explicit but do not react automatically to failures. Dynamic protocols exchange reachability information, select paths and reconverge after change.

NOTE\_02

### Metric and administrative distance differ

A metric chooses the best route learned by one protocol. Administrative distance chooses between route sources, so a router first compares administrative distance and then the selected protocol’s metric.

NOTE\_03

### Compare the protocol models

Distance-vector protocols learn reachability through neighbours. Link-state protocols build a topology database and calculate paths. Convergence speed, scale and design requirements vary by protocol.

### Apply the model

1. **Step 1 — Routing protocols solve a changing topology.** Static routes are explicit but do not react automatically to failures. Dynamic protocols exchange reachability information, select paths and reconverge after change.
2. **Step 2 — Metric and administrative distance differ.** A metric chooses the best route learned by one protocol. Administrative distance chooses between route sources, so a router first compares administrative distance and then the selected protocol’s metric.
3. **Step 3 — Compare the protocol models.** Distance-vector protocols learn reachability through neighbours. Link-state protocols build a topology database and calculate paths. Convergence speed, scale and design requirements vary by protocol.

## $ Why dynamic routing and how route selection works

Static routes are explicit and predictable, but they do not learn topology changes automatically. Dynamic routing protocols exchange reachability information, select a path and converge after a change. A routing table can contain routes from several sources, so source preference and within-protocol path selection are separate decisions.

| Decision | What it compares | Examples |
| --- | --- | --- |
| Administrative distance | Trustworthiness of different route sources | Static, OSPF, EIGRP, RIP; lower AD wins. |
| Metric | Paths learned by the same protocol | RIP hop count, OSPF cost, EIGRP composite metric. |
| Longest prefix match | Specificity among routes to a destination | A /24 beats a matching /16 regardless of ordinary preference. |

## $ Distance vector and link state

Distance-vector protocols learn reachability through neighbours. Link-state protocols distribute link information, build a topology database and calculate best paths independently. These models differ in their information scope, convergence behaviour and scaling characteristics.

```
show ip route
show ip protocols
```

Checks installed routes, source codes, active protocols, advertised networks and passive-interface state.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show ip route
```

Displays the installed IPv4 routing table and route source codes.

```
show ip protocols
```

Summarizes active routing protocol settings and advertised networks.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

A router first chooses among route sources using administrative distance; it then applies the route metric within the selected routing protocol.
