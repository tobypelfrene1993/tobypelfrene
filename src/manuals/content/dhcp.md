## $ Why this matters

DHCP automates host IPv4 configuration by leasing addresses and related options such as subnet mask, default gateway and DNS server information.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

>

### DHCP DORA with a relay

 CLIENTNO ADDRESS RELAY R1ip helper-address DHCPSERVER   DISCOVER (BROADCAST)REQUEST (BROADCAST) FORWARDED TO SERVEROFFER + ACK RETURN DISCOVEROFFERREQUESTACKNOWLEDGE LOCAL BROADCAST DOES NOT CROSS THE ROUTER WITHOUT A RELAY.\

The client broadcasts locally. The relay forwards the request to the remote server, then the Offer, Request and Acknowledgment complete the lease.



01

### DORA

A client typically uses Discover, Offer, Request and Acknowledgment to obtain a lease.

02

### Broadcast boundary

A client begins with broadcast traffic, which a router does not forward by default. A relay agent forwards the request to a remote server.

03

### Scope design

A DHCP pool needs network information and should exclude infrastructure addresses assigned statically to routers, servers or printers.

| Concept | What to remember in a lab or exam |
| --- | --- |
| DORA | A client typically uses Discover, Offer, Request and Acknowledgment to obtain a lease. |
| Broadcast boundary | A client begins with broadcast traffic, which a router does not forward by default. A relay agent forwards the request to a remote server. |
| Scope design | A DHCP pool needs network information and should exclude infrastructure addresses assigned statically to routers, servers or printers. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Understand the four-message lease exchange

A typical client uses Discover, Offer, Request and Acknowledgment (DORA). DHCP provides the address plus options such as subnet mask, default gateway and DNS servers.

NOTE\_02

### Routers stop the initial broadcast

A client starts with broadcast traffic, which does not cross a router by default. An interface configured as a relay uses ip helper-address to forward the request to a remote DHCP server.

NOTE\_03

### Design pools around fixed infrastructure

Exclude statically addressed routers, servers and printers from dynamic allocation. Then verify leases and options at both server and client rather than checking only whether an address was assigned.

### Apply the model

1. **Step 1 — Understand the four-message lease exchange.** A typical client uses Discover, Offer, Request and Acknowledgment (DORA). DHCP provides the address plus options such as subnet mask, default gateway and DNS servers.
2. **Step 2 — Routers stop the initial broadcast.** A client starts with broadcast traffic, which does not cross a router by default. An interface configured as a relay uses ip helper-address to forward the request to a remote DHCP server.
3. **Step 3 — Design pools around fixed infrastructure.** Exclude statically addressed routers, servers and printers from dynamic allocation. Then verify leases and options at both server and client rather than checking only whether an address was assigned.

## $ Lease lifecycle and DORA

DHCP supplies more than an address: it can provide subnet mask, default gateway, DNS server, domain name and lease time. Clients normally use UDP source port 68 and servers use UDP destination port 67. Leases are temporary so addresses return to the pool when clients leave.

| Message | Direction | Purpose |
| --- | --- | --- |
| Discover | Client broadcast | Finds available DHCP servers before it has an address. |
| Offer | Server to client | Offers an address and options. |
| Request | Client broadcast | Selects an offered address and requests it. |
| Acknowledgment | Server to client | Confirms lease and configuration. |
| Release | Client to server | Returns a lease early when the address is no longer needed. |

## $ Relay agents cross the broadcast boundary

A client begins with a broadcast, and routers do not normally forward broadcasts. An interface configured with ip helper-address relays suitable UDP broadcasts to a remote DHCP server, allowing one central server to serve multiple subnets.

```
interface g0/1
 ip helper-address 192.0.2.10
```

Relays DHCP client broadcasts received on this client-facing interface to the specified server.

## $ Cisco IOS DHCP server, client and verification

Exclude statically assigned infrastructure addresses before defining a pool. A router can also be a DHCP client on an interface. Verify client output, leases and options; a received IP address alone does not prove gateway and DNS options are correct.

```
ip dhcp excluded-address 192.168.1.1 192.168.1.20
ip dhcp pool USERS
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 192.168.1.53
```

Creates a pool while reserving fixed infrastructure addresses.

```
interface g0/0
 ip address dhcp
show ip dhcp binding
```

Uses DHCP on an IOS interface and verifies active lease bindings.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
ip dhcp excluded-address 192.168.1.1 192.168.1.20
```

Reserves a range from dynamic allocation.

```
ip dhcp pool USERS
```

Creates or enters a DHCP pool.

```
ip helper-address 192.0.2.10
```

Relays suitable UDP broadcasts, including DHCP, to a remote server.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

The default gateway and DNS server are DHCP options, not part of the address itself. A host can have an IP address yet still lack correct network service settings.
