## $ Why this matters

IPv6 hosts use Neighbor Discovery and Router Advertisements to learn local-link information, default routers and often their own addresses through SLAAC.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: IPv6 Routing, SLAAC & DHCPv6
>
> 01 Neighbor Discovery
>
> 02 SLAAC
>
> 03 DHCPv6 modes

01

### Neighbor Discovery

ICMPv6 Neighbor Solicitation and Neighbor Advertisement replace IPv4 ARP while adding address-resolution and reachability functions.

02

### SLAAC

A router advertisement can provide a prefix from which a host creates its own address and learns the default gateway.

03

### DHCPv6 modes

Stateless DHCPv6 adds options such as DNS information; stateful DHCPv6 assigns addresses as well as other options.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Neighbor Discovery | ICMPv6 Neighbor Solicitation and Neighbor Advertisement replace IPv4 ARP while adding address-resolution and reachability functions. |
| SLAAC | A router advertisement can provide a prefix from which a host creates its own address and learns the default gateway. |
| DHCPv6 modes | Stateless DHCPv6 adds options such as DNS information; stateful DHCPv6 assigns addresses as well as other options. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Neighbour Discovery replaces ARP

IPv6 uses ICMPv6 Neighbour Solicitation and Advertisement messages to resolve neighbours, detect duplicates and maintain reachability. Filtering ICMPv6 indiscriminately breaks core IPv6 functions.

NOTE\_02

### Router Advertisements guide hosts

Routers advertise prefixes and configuration flags. SLAAC lets hosts create an address from an advertised prefix; DHCPv6 can provide additional or managed information depending on the flags and design.

NOTE\_03

### Routing still needs explicit verification

Enable IPv6 routing where appropriate, confirm link-local next hops and check routes with IPv6-specific show and ping commands. An address alone does not prove a working default route.

### Apply the model

1. **Step 1 — Neighbour Discovery replaces ARP.** IPv6 uses ICMPv6 Neighbour Solicitation and Advertisement messages to resolve neighbours, detect duplicates and maintain reachability. Filtering ICMPv6 indiscriminately breaks core IPv6 functions.
2. **Step 2 — Router Advertisements guide hosts.** Routers advertise prefixes and configuration flags. SLAAC lets hosts create an address from an advertised prefix; DHCPv6 can provide additional or managed information depending on the flags and design.
3. **Step 3 — Routing still needs explicit verification.** Enable IPv6 routing where appropriate, confirm link-local next hops and check routes with IPv6-specific show and ping commands. An address alone does not prove a working default route.

## $ Neighbour Discovery, SLAAC and DHCPv6

IPv6 uses ICMPv6 Neighbour Discovery instead of ARP. Neighbour Solicitation and Advertisement resolve link-layer addresses and support duplicate-address detection. Router Advertisements supply prefixes and configuration flags; hosts can use SLAAC, DHCPv6 or both depending on the advertised policy.

| Method | Address source | Other settings |
| --- | --- | --- |
| SLAAC | Host builds address from advertised prefix | RA may also provide default gateway and flags |
| Stateless DHCPv6 | SLAAC provides address | DHCPv6 supplies extra information such as DNS |
| Stateful DHCPv6 | DHCPv6 server assigns address | DHCPv6 supplies additional options |

## $ Routing and default-gateway verification

A router must be enabled to forward IPv6 traffic; hosts learn the default gateway from Router Advertisements, not from DHCPv6. Link-local addresses are valid next hops, so verify the outgoing interface whenever a route uses one.

```
ipv6 unicast-routing
interface g0/0
 ipv6 address 2001:db8:1::1/64
```

Enables IPv6 forwarding globally and addresses an interface.

```
show ipv6 route
show ipv6 neighbors
ping ipv6 2001:db8:1::2
```

Checks routes, Neighbour Discovery state and reachable IPv6 destinations.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
ipv6 unicast-routing
```

Enables IPv6 packet forwarding and router advertisements on a Cisco router.

```
show ipv6 route
```

Displays the IPv6 routing table.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

A host learns its IPv6 default gateway from a router’s link-local address, not from a globally routable address learned through DHCPv6.
