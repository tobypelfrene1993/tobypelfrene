## $ Why this matters

IPv6 troubleshooting follows the same disciplined approach as IPv4: verify interface state and addresses, local neighbors, routing entries and the return path.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: IPv6 Services & Troubleshooting
>
> 01 Static routing
>
> 02 Dual stack
>
> 03 ICMPv6 importance

01

### Static routing

IPv6 static routes use an IPv6 prefix and next hop or exit interface. A link-local next hop generally needs an exit interface too.

02

### Dual stack

IPv4 and IPv6 can run in parallel. Success with one protocol family does not prove reachability with the other.

03

### ICMPv6 importance

ICMPv6 supports error reporting and critical control functions such as Neighbor Discovery and Path MTU Discovery; indiscriminate filtering causes failures.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Static routing | IPv6 static routes use an IPv6 prefix and next hop or exit interface. A link-local next hop generally needs an exit interface too. |
| Dual stack | IPv4 and IPv6 can run in parallel. Success with one protocol family does not prove reachability with the other. |
| ICMPv6 importance | ICMPv6 supports error reporting and critical control functions such as Neighbor Discovery and Path MTU Discovery; indiscriminate filtering causes failures. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Start with link-local reachability

Every IPv6-enabled interface uses a link-local address. Verify the local link, neighbour table and router advertisements before assuming a global-address or routing failure.

NOTE\_02

### Avoid IPv4 assumptions

IPv6 has no broadcast and uses ICMPv6 for essential control functions. Diagnosis should inspect neighbour discovery, prefixes, routes and firewall handling rather than expecting ARP broadcasts.

NOTE\_03

### Test exact address families

Use IPv6-aware ping and show commands. Confirm that DNS returns AAAA records when testing names, and distinguish a name-resolution issue from an IPv6 forwarding issue.

### Apply the model

1. **Step 1 — Start with link-local reachability.** Every IPv6-enabled interface uses a link-local address. Verify the local link, neighbour table and router advertisements before assuming a global-address or routing failure.
2. **Step 2 — Avoid IPv4 assumptions.** IPv6 has no broadcast and uses ICMPv6 for essential control functions. Diagnosis should inspect neighbour discovery, prefixes, routes and firewall handling rather than expecting ARP broadcasts.
3. **Step 3 — Test exact address families.** Use IPv6-aware ping and show commands. Confirm that DNS returns AAAA records when testing names, and distinguish a name-resolution issue from an IPv6 forwarding issue.

## $ IPv6 troubleshooting sequence

Begin on the local link: check interface state, link-local addresses and neighbour entries. Then validate global address/prefix, Router Advertisements or DHCPv6 policy, routing and ICMPv6 filtering. Do not search for ARP or broadcast behaviour: neither exists in IPv6.

| Symptom | Evidence to inspect | Likely boundary |
| --- | --- | --- |
| No local neighbour reachability | show ipv6 interface, show ipv6 neighbors | Link, VLAN, link-local address or ICMPv6 ND |
| Address but no default route | RA flags/prefix and show ipv6 route | Router advertisement or router forwarding |
| Name fails but numeric ping works | AAAA lookup and DNS settings | DNS rather than IPv6 forwarding |
| Remote path fails | Route table and hop-by-hop tests | Routing, ACL/firewall or return path |

## $ Service and security awareness

ICMPv6 carries more than diagnostics: it underpins Neighbour Discovery and Router Advertisements. Permit the required control messages deliberately while still applying security policy. When a hostname is tested, confirm whether it resolved to an AAAA record before diagnosing the network path.

```
ping ipv6 2001:db8::1
traceroute ipv6 2001:db8::1
show ipv6 neighbors
```

Tests reachability, identifies the routed path and validates local Layer 2 neighbour resolution.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show ipv6 neighbors
```

Shows the IPv6 neighbor cache and its associated Layer 2 addresses.

```
ping ipv6 2001:db8::1
```

Tests IPv6 reachability to a specified address.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

IPv6 does not use broadcast. If Neighbor Discovery fails, check ICMPv6 handling rather than looking for an ARP broadcast.
