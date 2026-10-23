## $ Why this matters

A WAN connects geographically separated LANs. An organisation can use dedicated leased lines, logically separated MPLS VPNs, or encrypted tunnels across the public Internet; these options differ in transport, separation and operational model.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: WAN Architectures
>
> 01 Provider WAN services
>
> 02 Internet resiliency and access
>
> 03 Internet VPN models

01

### Provider WAN services

Leased lines provide dedicated point-to-point transport, while MPLS VPNs use a shared provider network and labels to keep customer traffic logically separate.

02

### Internet resiliency and access

DSL, cable and fiber Ethernet are access options. Homing choices trade redundancy against cost and dependence on one or more ISPs.

03

### Internet VPN models

Site-to-site IPsec protects traffic between network appliances for whole sites; remote-access TLS protects one client device connecting to a corporate gateway.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Provider WAN services | Leased lines provide dedicated point-to-point transport, while MPLS VPNs use a shared provider network and labels to keep customer traffic logically separate. |
| Internet resiliency and access | DSL, cable and fiber Ethernet are access options. Homing choices trade redundancy against cost and dependence on one or more ISPs. |
| Internet VPN models | Site-to-site IPsec protects traffic between network appliances for whole sites; remote-access TLS protects one client device connecting to a corporate gateway. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Transport separation is not automatically encryption

A leased line is dedicated and MPLS labels logically separate customer traffic inside a provider network. These are distinct from the cryptographic confidentiality of an Internet VPN. Public Internet transport does not provide that confidentiality by itself.

NOTE\_02

### MPLS belongs to the provider network

A Customer Edge router connects to a Provider Edge router but does not run or need to support MPLS. PE and Provider-core routers use labels within the provider infrastructure; the label sits between Ethernet and IP headers, hence the informal “Layer 2.5” description.

NOTE\_03

### Choose the tunnel model from its endpoints

A site-to-site IPsec tunnel terminates on two routers or firewalls and benefits hosts behind both sites. A remote-access TLS tunnel terminates on one device running a VPN client and the corporate VPN gateway.

### Apply the model

1. **Step 1 — Transport separation is not automatically encryption.** A leased line is dedicated and MPLS labels logically separate customer traffic inside a provider network. These are distinct from the cryptographic confidentiality of an Internet VPN. Public Internet transport does not provide that confidentiality by itself.
2. **Step 2 — MPLS belongs to the provider network.** A Customer Edge router connects to a Provider Edge router but does not run or need to support MPLS. PE and Provider-core routers use labels within the provider infrastructure; the label sits between Ethernet and IP headers, hence the informal “Layer 2.5” description.
3. **Step 3 — Choose the tunnel model from its endpoints.** A site-to-site IPsec tunnel terminates on two routers or firewalls and benefits hosts behind both sites. A remote-access TLS tunnel terminates on one device running a VPN client and the corporate VPN gateway.

## $ WAN scope and the three service approaches

A WAN joins LANs over a large geographic area, for example offices in different cities and a data center. In this source, “WAN” usually means the private inter-site connectivity used by an organisation, even though the Internet is also technically a WAN. Availability varies by location, and a technology that is legacy in one country can still be in use elsewhere.

| Approach | Transport basis | How customer data is separated |
| --- | --- | --- |
| Leased line | Dedicated physical point-to-point service, traditionally serial. | No shared customer connection on that leased line. |
| MPLS VPN | Shared service-provider infrastructure. | MPLS labels logically separate customer traffic. |
| Internet VPN | Public, shared Internet. | A VPN tunnel encrypts the protected traffic. |

## $ Leased lines, hub-and-spoke and access media

A leased line is a dedicated link, normally between two locations. A hub-and-spoke design has a central hub, such as a data center, and branch spokes. Office-to-office traffic can then pass through the hub, enabling central policy or firewall inspection. The customer sites are connected through the service provider; a simplified diagram does not mean there is a single literal cable from every office to the data center.

| Item | Source detail | Important distinction |
| --- | --- | --- |
| Traditional serial link | Uses PPP or HDLC encapsulation at Layer 2. | It is not Ethernet. |
| Ethernet over fiber | Can provide high speed over longer distances. | The physical access medium is separate from the WAN service model. |
| T1 / DS1 | 1.544 Mbit/s and 24 user channels. | The source treats T1 recognition as useful; it does not require memorising the full T/E carrier table. |
| E1 | 2.048 Mbit/s and 32 user channels. | It is not the T1 answer in the source quiz. |

## $ MPLS forwarding and CE, PE and P roles

MPLS is operated inside a provider network shared by multiple customers. When a PE receives customer traffic from a CE, it applies a label; provider routing forwards on that label rather than the customer packet’s destination IP address. Labels sit between the Layer 2 Ethernet header and Layer 3 IP header. “Layer 2.5” describes this position only, not a third MPLS VPN category.

| Role | Full name | Position and responsibility |
| --- | --- | --- |
| CE | Customer Edge | Customer router at the edge; connects to a PE and does not run MPLS. |
| PE | Provider Edge | Provider router directly attached to CE; adds labels to customer traffic. |
| P | Provider core | Internal provider backbone router; does not connect directly to CE. |

## $ Layer 3 versus Layer 2 MPLS VPN

The key distinction is where routing adjacency exists. In a Layer 3 MPLS VPN, the provider participates in the customer-facing routing relationship: a CE can peer with its adjacent PE through OSPF, or use static routes that point at the PE. In a Layer 2 MPLS VPN, the provider is transparent to CE routing and behaves logically like a large switch between the customer edges.

| Characteristic | Layer 3 MPLS VPN | Layer 2 MPLS VPN |
| --- | --- | --- |
| OSPF peering in the source model | CE with adjacent PE. | CE with remote CE. |
| Provider visibility to CE routing | PE is the routing neighbour or next hop. | Provider is transparent to the CE routers. |
| Logical model | Provider delivers Layer 3 WAN routing. | Provider looks like a Layer 2 switch. |
| CE WAN subnet in the shown model | No shared CE-to-CE subnet is assumed. | The CE WAN interfaces are in the same subnet. |

## $ Internet access and homing choices

Private WAN transport and public Internet access are separate ideas: a leased line or MPLS service can still provide a path to the Internet. DSL uses an existing telephone line with a DSL modem; Cable Internet uses a CATV line with a cable modem; fiber-optic Ethernet provides Ethernet over optical fiber. A modem can be a separate device or integrated into a home router. DSL in the source can carry Internet and telephone service over the same installed phone line.

| Homing model | Links | ISPs | Resilience meaning |
| --- | --- | --- | --- |
| Single homed | 1 | 1 | No redundant connection. |
| Dual homed | 2 | 1 | Redundant links, but the one ISP remains a shared failure point. |
| Multihomed | 1 to each provider | 2 | A second ISP remains if one provider fails. |
| Dual multihomed | 2 to each provider | 2 | Highest redundancy of the four examples, with more cost and complexity. |

## $ Site-to-site IPsec and GRE over IPsec

A site-to-site VPN creates a protected tunnel between two network appliances such as Internet routers or firewalls. Hosts behind the sites send their normal packets to their default gateways; the sending tunnel endpoint encrypts the original packet, adds VPN and outer IP headers, and the receiving endpoint decrypts before delivering the original packet. Standard IPsec in this lesson carries unicast but not broadcast or multicast, so an OSPF multicast relationship cannot directly operate through it.

| Technology | What it adds | Security property |
| --- | --- | --- |
| IPsec | Encrypted site-to-site tunnel over Internet. | Protects the encapsulated traffic. |
| GRE | Can encapsulate Layer 3 protocols, broadcast and multicast. | Does not encrypt and is not secure by itself. |
| GRE over IPsec | GRE packet is created first, then encrypted and wrapped by IPsec. | Combines GRE flexibility with IPsec confidentiality. |

## $ DMVPN and remote-access TLS

DMVPN is a Cisco-developed model for dynamically forming a full mesh of IPsec tunnels without manually configuring every spoke-to-spoke pair. In the source simplification, each spoke first has a configured tunnel to the hub; the hub then supplies information that lets spokes establish direct tunnels. This reduces manual mesh work, but direct spoke traffic is not always desired when a central firewall should inspect every flow. Remote-access VPN instead connects one endpoint device, running a client such as Cisco AnyConnect, to a corporate router or firewall using TLS.

| VPN type | Typical protocol in the source | Tunnel endpoints | Usual use |
| --- | --- | --- | --- |
| Site-to-site | IPsec | Two routers, firewalls or other site devices. | Persistent protected connection for hosts at two locations. |
| Remote access | TLS | One VPN-client device and the corporate gateway/server. | On-demand access for a user outside the corporate network. |
| DMVPN | Dynamic IPsec tunnel mesh | Hub and multiple spokes, with dynamic spoke-to-spoke paths. | Many-site design without manually defining every spoke pair. |

## $ Architecture review questions

This lesson is conceptual: the source provides no CLI configuration sequence. Diagnose the topology and trust boundary before focusing on a protocol name. The service-provider interior is intentionally outside the customer-focused scope of the lesson.

| Question | Correct source-based answer |
| --- | --- |
| Which router does not run MPLS? | The CE. PE and P routers use MPLS inside the provider network. |
| Which MPLS VPN lets two CEs peer directly with OSPF? | Layer 2 MPLS VPN, because it is transparent like a switch. |
| What uses installed telephone lines? | DSL, using a DSL modem. |
| What adds multicast capability to the stated IPsec model? | GRE; IPsec then provides encryption around the GRE packet. |
| Which VPN is client-to-corporate-gateway? | Remote-access VPN, normally TLS in this lesson. |

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

For CCNA WAN objectives, recognise the purpose and high-level behaviour of leased lines, MPLS, Internet access and VPN types. Know CE/PE/P roles, Layer 2 versus Layer 3 MPLS VPN behaviour, the four homing terms, and IPsec versus TLS usage.
