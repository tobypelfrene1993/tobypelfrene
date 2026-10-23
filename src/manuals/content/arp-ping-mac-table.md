## $ Why this matters

Before an IPv4 host can place a local packet in an Ethernet frame, it normally needs the destination MAC address. ARP provides that local resolution.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: ARP, Ping & MAC Address Tables
>
> 01 ARP request and reply
>
> 02 Default gateway
>
> 03 Ping and ICMP

01

### ARP request and reply

The requester broadcasts an ARP request. The owner of the IPv4 address replies with its MAC address, which is cached for later use.

02

### Default gateway

For a remote destination, a host resolves the MAC address of its default gateway, not the MAC address of the remote host.

03

### Ping and ICMP

Ping uses ICMP Echo Request and Echo Reply to test Layer 3 reachability. A reply proves a path and return path, not that every application service works.

| Concept | What to remember in a lab or exam |
| --- | --- |
| ARP request and reply | The requester broadcasts an ARP request. The owner of the IPv4 address replies with its MAC address, which is cached for later use. |
| Default gateway | For a remote destination, a host resolves the MAC address of its default gateway, not the MAC address of the remote host. |
| Ping and ICMP | Ping uses ICMP Echo Request and Echo Reply to test Layer 3 reachability. A reply proves a path and return path, not that every application service works. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### ARP is local-link resolution

An ARP request asks “who has this IPv4 address?” using an Ethernet broadcast. The matching host replies with its MAC address, allowing the sender to cache an IPv4-to-MAC mapping before framing local traffic.

NOTE\_02

### Remote traffic uses the gateway MAC

When the destination IP is outside the local subnet, the host sends the packet toward its default gateway. ARP therefore resolves the gateway’s MAC address; the remote host MAC is resolved only on its own LAN.

NOTE\_03

### Separate the evidence

arp -a shows a host’s IP-to-MAC cache. A switch MAC table shows MAC-to-port learning. Ping uses ICMP Echo and tests reachability and return connectivity, not application health.

### Apply the model

1. **Step 1 — ARP is local-link resolution.** An ARP request asks “who has this IPv4 address?” using an Ethernet broadcast. The matching host replies with its MAC address, allowing the sender to cache an IPv4-to-MAC mapping before framing local traffic.
2. **Step 2 — Remote traffic uses the gateway MAC.** When the destination IP is outside the local subnet, the host sends the packet toward its default gateway. ARP therefore resolves the gateway’s MAC address; the remote host MAC is resolved only on its own LAN.
3. **Step 3 — Separate the evidence.** arp -a shows a host’s IP-to-MAC cache. A switch MAC table shows MAC-to-port learning. Ping uses ICMP Echo and tests reachability and return connectivity, not application health.

## $ ARP request and reply on the local LAN

ARP resolves a known IPv4 address to the MAC address required for Ethernet delivery. An ARP Request is broadcast to FFFF.FFFF.FFFF because the destination MAC is unknown. The owning host recognises its target IPv4 address and sends a unicast Reply, because the requester’s MAC was present in the request source field.

| Step | Frame delivery | Switch behaviour |
| --- | --- | --- |
| Request enters switch | Broadcast destination MAC | Learns requester source MAC and floods all ports except ingress. |
| Non-owner receives request | Broadcast reaches all local hosts | Host ignores it when target protocol address is not its own. |
| Owner replies | Unicast to requester MAC | Switches learn owner source MAC and forward known unicast toward requester. |
| Cache use | Later data uses learned MAC | Host ARP cache maps IPv4-to-MAC; switch table maps MAC-to-port. |

## $ Frame size, remote destinations and ping evidence

An Ethernet frame is at least 64 bytes excluding preamble and SFD. Header plus trailer occupies 18 bytes, so payload must be at least 46 bytes; a smaller payload is padded with zeros. For remote IPv4 destinations, the host ARPs for the default gateway MAC, not the remote host MAC. Ping uses ICMP Echo Request/Reply and proves network reachability and return path, not application availability.

```
arp -a
ping 192.0.2.1
show mac address-table dynamic
```

Separates host ARP evidence, IP/ICMP reachability evidence and switch Layer 2 learning evidence.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
arp -a
```

Shows the local ARP cache on a host.

```
show mac address-table dynamic
```

Shows dynamic Layer 2 entries learned from received frames.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Do not confuse an ARP cache with a switch MAC table: a host maps IPv4-to-MAC; a switch maps MAC-to-port.
