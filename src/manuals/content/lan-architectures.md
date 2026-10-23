## $ Why this matters

LAN architecture describes how network devices are connected and how their responsibilities are divided. The appropriate design depends on the organisation’s scale, traffic patterns, resilience needs and operational requirements; there is no single universal topology.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: LAN Architectures
>
> 01 Hierarchical campus LAN
>
> 02 Spine-leaf data center
>
> 03 SOHO convergence

01

### Hierarchical campus LAN

Traditional campus designs separate end-host access, aggregation/distribution and, at larger scale, a high-speed core. Each layer has a different operational role.

02

### Spine-leaf data center

Every Leaf connects to every Spine, while same-layer switches do not interconnect. This provides a predictable Leaf-Spine-Leaf path for servers on different Leafs.

03

### SOHO convergence

A small office or home office commonly combines routing, switching, basic firewalling and wireless access in one home or wireless router.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Hierarchical campus LAN | Traditional campus designs separate end-host access, aggregation/distribution and, at larger scale, a high-speed core. Each layer has a different operational role. |
| Spine-leaf data center | Every Leaf connects to every Spine, while same-layer switches do not interconnect. This provides a predictable Leaf-Spine-Leaf path for servers on different Leafs. |
| SOHO convergence | A small office or home office commonly combines routing, switching, basic firewalling and wireless access in one home or wireless router. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Topology names describe links, not the drawing

A star connects devices to one central device; a full mesh gives every device in the group a direct link to every other device; a partial mesh has only some direct links; and a hybrid combines multiple forms. The geometry of symbols on a diagram does not change the topology.

NOTE\_02

### Distribution is usually the campus policy and aggregation point

In the described traditional design, Access-to-Distribution links are Layer 2 and use STP, while Distribution commonly provides SVI default gateways and an FHRP such as HSRP or VRRP. Distribution-to-Core links are Layer 3 and can exchange routes through OSPF.

NOTE\_03

### Spine-leaf solves a different traffic problem

Spine-leaf is not merely a renamed collapsed core. It targets high East-West server traffic: every host connects to a Leaf, every Leaf to every Spine, and servers on different Leafs traverse the same three-switch pattern.

### Apply the model

1. **Step 1 — Topology names describe links, not the drawing.** A star connects devices to one central device; a full mesh gives every device in the group a direct link to every other device; a partial mesh has only some direct links; and a hybrid combines multiple forms. The geometry of symbols on a diagram does not change the topology.
2. **Step 2 — Distribution is usually the campus policy and aggregation point.** In the described traditional design, Access-to-Distribution links are Layer 2 and use STP, while Distribution commonly provides SVI default gateways and an FHRP such as HSRP or VRRP. Distribution-to-Core links are Layer 3 and can exchange routes through OSPF.
3. **Step 3 — Spine-leaf solves a different traffic problem.** Spine-leaf is not merely a renamed collapsed core. It targets high East-West server traffic: every host connects to a Leaf, every Leaf to every Spine, and servers on different Leafs traverse the same three-switch pattern.

## $ Topology vocabulary: star, mesh and hybrid

A topology is determined by direct connections, not by where an icon is drawn. A campus can contain several topologies at the same time: individual access switches can form small stars, an Access/Distribution block can be a partial mesh, and a group of Distribution switches can form a full mesh.

| Topology | Definition | Source example |
| --- | --- | --- |
| Star | Several devices connect to one central device. | PCs connect around one central switch. |
| Full mesh | Every device in the group has a direct link to every other device. | Six routers each connect to the other five. |
| Partial mesh | Some, but not all, devices have direct links to one another. | Two Distribution switches connect to two Access switches, but the Access switches do not connect directly. |
| Hybrid | A combination of topology forms. | A campus can contain star, partial-mesh and full-mesh portions. |

## $ Traditional two-tier campus LAN: Access and Distribution

A campus LAN covers devices in one building or nearby buildings. In a two-tier design, the Access Layer connects end hosts and the Distribution Layer aggregates the Access switches. It is called a collapsed core because Distribution also takes the responsibilities of an absent Core Layer; it may therefore be called a Core-Distribution Layer. This is a common design pattern, not an absolute rule.

| Layer | Primary role | Typical functions in the source design |
| --- | --- | --- |
| Access | Connects end hosts such as PCs, printers, cameras, servers, wireless APs and IP phones. | Many host ports, PoE, QoS marking, port security, DHCP Snooping and Dynamic ARP Inspection. |
| Distribution / Aggregation | Aggregates Access switches and joins LAN segments to the wider network. | Often Layer 2/Layer 3 boundary; SVI default gateways; FHRP such as HSRP or VRRP; Layer 2 STP and Layer 3 routing. |

## $ Two-tier redundancy, forwarding and scale limit

In the source topology, each Access switch has an uplink to both Distribution switches. Those Layer 2 uplinks provide resilience, but they also create a possible loop, so STP blocks selected redundant paths. The Distribution pair provides redundant virtual default-gateway service through an FHRP. The Distribution switches can use Layer 3 links between themselves and exchange routes with OSPF; STP does not run over those Layer 3 links.

| Design decision | Why it is present | Operational consequence |
| --- | --- | --- |
| Dual Access uplinks | A link or switch failure has an alternate path. | STP may block one Layer 2 path until it is needed. |
| SVIs plus FHRP | Hosts need one reliable default-gateway address. | The active/standby gateway role must match the intended VLAN design. |
| Full mesh between Distribution groups | Provides direct inter-group connectivity in a small collapsed-core campus. | Link count grows quickly as more Distribution groups are added. |
| More than three Distribution Layers | Cisco guideline mentioned in the lesson for one location. | Consider a dedicated Core rather than expanding the full mesh indefinitely. |

## $ Traditional three-tier campus LAN and the Core

A three-tier design adds a dedicated Core Layer above Distribution. Distribution groups connect to the Core rather than needing a direct full mesh with every other group. This makes a larger campus easier to extend. The Core is a fast, resilient backbone: use powerful redundant switches and Layer 3 connections, and keep CPU-intensive security services and QoS marking/classification out of this layer.

| Layer | Connection pattern | Key boundary |
| --- | --- | --- |
| Access | Hosts and uplinks to Distribution. | End-host attachment and edge functions. |
| Distribution | Often Layer 2 toward Access, Layer 3 toward Core. | Aggregation, policy, SVI gateway and common Layer 2/Layer 3 boundary. |
| Core | Layer 3 links to Distribution groups and external/core services. | Fast transport only; no STP in the Core. |

## $ Data-center traffic and spine-leaf architecture

Traditional three-tier designs suit predominantly North-South traffic: traffic climbs from Access through Distribution and Core toward the Internet or another LAN section, then descends again. Virtualised and distributed applications increase East-West traffic between servers, where a traditional hierarchy can create bandwidth bottlenecks and variable latency. Spine-leaf, also called Clos architecture, is designed for this server-to-server pattern.

| Spine-leaf rule | Reason and result |
| --- | --- |
| Every Leaf connects to every Spine. | Each Leaf has a choice of Spine uplinks, supporting traffic distribution and resilience. |
| No Leaf-to-Leaf links. | Server traffic between different Leafs travels through a Spine. |
| No Spine-to-Spine links. | Spines provide the common fabric rather than a separate same-layer mesh. |
| Hosts connect only to Leafs. | Leafs act as the server-facing edge. |
| Different-Leaf server path is Leaf-Spine-Leaf. | The path crosses three switches, giving a consistent hop count and more predictable latency; same-Leaf servers are the exception with fewer hops. |

## $ Spine-leaf growth and SOHO networks

To add server capacity in the source spine-leaf design, add a Leaf and connect it to every existing Spine. The source does not specify a particular load-balancing protocol or algorithm; it only explains that traffic can be spread across multiple Spines. At the other end of the scale, a SOHO network has few devices and typically consolidates several functions into one home or wireless router.

| SOHO function | What the combined device can provide |
| --- | --- |
| Router | Connects the small internal network to the Internet. |
| Switch | Provides several Ethernet ports for wired devices. |
| Firewall / security | Typically blocks unsolicited outside-to-inside connections while allowing internally initiated Internet traffic. |
| Wireless access point | Connects devices such as laptops and phones over Wi-Fi. |
| Modem | May be built in for services such as cable Internet, or may be a separate device. |

## $ Design review and troubleshooting questions

This source is architecture-focused and demonstrates no configuration commands. When reviewing a diagram or a fault, first identify the architecture, the expected traffic direction and the layer where the decision should occur. Do not infer that every enterprise uses the exact source diagram; use it as a role-and-path model.

| Question | Expected evidence | What it helps distinguish |
| --- | --- | --- |
| Where do end hosts attach? | Access switch in a campus; Leaf in a spine-leaf data center. | Campus versus data-center role. |
| Where is the default gateway? | Typically SVI plus FHRP on Distribution in the source campus design. | Access forwarding versus aggregation/gateway responsibility. |
| Does a Core carry STP? | No: Core links are Layer 3 in the source design. | Core fast transport versus Layer 2 topology control. |
| Does a Leaf connect directly to another Leaf? | No in the stated spine-leaf base model. | Correct Clos fabric wiring. |
| What traffic is dominant? | North-South to external/campus destinations or East-West between servers. | Whether a traditional hierarchy or spine-leaf addresses the traffic pattern. |

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

For CCNA, distinguish the four source architectures: a two-tier collapsed-core campus LAN, a three-tier campus LAN, a spine-leaf data center and a SOHO network. Know the role of each layer and the permitted spine-leaf links.
