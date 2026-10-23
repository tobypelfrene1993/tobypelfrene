## $ Why this matters

IPv6 uses 128-bit hexadecimal addresses and a prefix-based design. It removes broadcast and relies on unicast, multicast and anycast behavior.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: IPv6 Addressing Fundamentals
>
> 01 Notation
>
> 02 Address types
>
> 03 Prefix structure

01

### Notation

Eight hexadecimal hextets represent 128 bits. Leading zeros can be removed and one contiguous zero sequence can be compressed with double colon.

02

### Address types

Global unicast is publicly routable, unique local is private-like, link-local works only on the local link, and multicast replaces broadcast.

03

### Prefix structure

A /64 is the standard LAN prefix length in most IPv6 designs, leaving 64 bits for an interface identifier.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Notation | Eight hexadecimal hextets represent 128 bits. Leading zeros can be removed and one contiguous zero sequence can be compressed with double colon. |
| Address types | Global unicast is publicly routable, unique local is private-like, link-local works only on the local link, and multicast replaces broadcast. |
| Prefix structure | A /64 is the standard LAN prefix length in most IPv6 designs, leaving 64 bits for an interface identifier. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Read IPv6 in hextets

IPv6 addresses contain 128 bits written as hexadecimal groups. Leading zeros in a group may be omitted; one consecutive run of all-zero groups may be compressed with ::.

NOTE\_02

### Use the address type to infer scope

Global unicast addresses are routable beyond the local network, unique local addresses support private use, and link-local addresses are used on the local link for control and next-hop functions.

NOTE\_03

### Prefixes define the subnet

A typical LAN uses /64, leaving a 64-bit interface identifier. The prefix and default-gateway design remain essential even though IPv6 removes broadcast.

### Apply the model

1. **Step 1 — Read IPv6 in hextets.** IPv6 addresses contain 128 bits written as hexadecimal groups. Leading zeros in a group may be omitted; one consecutive run of all-zero groups may be compressed with ::.
2. **Step 2 — Use the address type to infer scope.** Global unicast addresses are routable beyond the local network, unique local addresses support private use, and link-local addresses are used on the local link for control and next-hop functions.
3. **Step 3 — Prefixes define the subnet.** A typical LAN uses /64, leaving a 64-bit interface identifier. The prefix and default-gateway design remain essential even though IPv6 removes broadcast.

## $ 128-bit notation and compression rules

IPv6 addresses are 128 bits written as eight hexadecimal 16-bit groups (hextets). Leading zeros inside any hextet may be omitted. A single consecutive run of all-zero hextets may be compressed with ::; use :: only once in an address so its full expansion remains unambiguous.

| Address type | Typical prefix / scope | Purpose |
| --- | --- | --- |
| Global unicast | 2000::/3 | Globally routable IPv6 address |
| Unique local | fc00::/7 | Private-style internal addressing |
| Link-local | fe80::/10 | Local-link communication and next-hop operation |
| Loopback | ::1/128 | Local host stack |
| Unspecified | ::/128 | No address assigned yet |

## $ Prefix, interface ID and multicast

A typical LAN uses a /64 prefix: the first 64 bits identify the subnet and the remaining 64 bits identify the interface. IPv6 has no broadcast. It uses multicast, including solicited-node multicast for neighbour discovery, so controls that blindly block ICMPv6 break essential functions.

```
show ipv6 interface brief
show ipv6 interface g0/0
```

Verifies global and link-local addresses, interface state and IPv6 configuration.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show ipv6 interface brief
```

Shows IPv6 addresses and state for router interfaces.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

A double colon can appear only once in a valid IPv6 address because it represents an unknown number of zero hextets.
