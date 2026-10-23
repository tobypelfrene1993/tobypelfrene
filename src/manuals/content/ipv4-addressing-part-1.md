## $ Why this matters

An IPv4 address contains 32 bits. A prefix length marks the network portion; the remaining host bits identify addresses inside that subnet.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: IPv4 Addressing Fundamentals
>
> 01 Prefix and mask
>
> 02 Private ranges
>
> 03 Network and broadcast

01

### Prefix and mask

A /24 has 24 network bits and 8 host bits, equivalent to mask 255.255.255.0. CIDR replaces the old class-boundary assumption.

02

### Private ranges

RFC 1918 reserves 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 for private internal use.

03

### Network and broadcast

All-zero host bits form the network address; all-one host bits form the directed broadcast address for conventional IPv4 subnets.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Prefix and mask | A /24 has 24 network bits and 8 host bits, equivalent to mask 255.255.255.0. CIDR replaces the old class-boundary assumption. |
| Private ranges | RFC 1918 reserves 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 for private internal use. |
| Network and broadcast | All-zero host bits form the network address; all-one host bits form the directed broadcast address for conventional IPv4 subnets. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Calculate from bits, not from a class label

IPv4 has 32 bits. The prefix identifies network bits and the remainder are host bits; /24 equals 255.255.255.0. CIDR is the operational method, while class A/B/C ranges are useful historical context.

NOTE\_02

### Recognise reserved private space

RFC 1918 private ranges are 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. They are intended for internal addressing and normally need translation or routing control at an Internet edge.

NOTE\_03

### Find the boundaries

With conventional IPv4 subnetting, all-zero host bits identify the network and all-one host bits identify the directed broadcast. Addresses between those boundaries are candidate host addresses.

### Apply the model

1. **Step 1 — Calculate from bits, not from a class label.** IPv4 has 32 bits. The prefix identifies network bits and the remainder are host bits; /24 equals 255.255.255.0. CIDR is the operational method, while class A/B/C ranges are useful historical context.
2. **Step 2 — Recognise reserved private space.** RFC 1918 private ranges are 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. They are intended for internal addressing and normally need translation or routing control at an Internet edge.
3. **Step 3 — Find the boundaries.** With conventional IPv4 subnetting, all-zero host bits identify the network and all-one host bits identify the directed broadcast. Addresses between those boundaries are candidate host addresses.

## $ Layer 3 boundaries, notation and binary

IPv4 is Layer 3 logical addressing for communication between networks. A router has an IP address on every connected network and stops Layer 2 broadcasts; switches extend rather than divide a broadcast domain. An IPv4 address is 32 bits: four 8-bit octets written in dotted decimal.

| Binary position | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Example: 192 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| Example: 168 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 0 |
| Example: 254 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |

## $ Prefix, mask, address types and private space

A prefix identifies network bits; remaining bits identify hosts. A /24 means the first 24 bits are network bits and corresponds to 255.255.255.0. All-zero host bits identify the network address; all-one host bits identify directed broadcast. Neither is normally assigned to a host.

| Range / type | CIDR or rule | Use |
| --- | --- | --- |
| 10.0.0.0–10.255.255.255 | 10.0.0.0/8 | RFC 1918 private addressing |
| 172.16.0.0–172.31.255.255 | 172.16.0.0/12 | RFC 1918 private addressing |
| 192.168.0.0–192.168.255.255 | 192.168.0.0/16 | RFC 1918 private addressing |
| 127.0.0.0/8 | Loopback | Reserved; 127.0.0.1 tests local TCP/IP stack |

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Always convert the prefix into network bits and host bits before calculating a subnet. Class A/B/C ranges are historical context; CIDR is the operational rule.
