## $ Why this matters

Subnet calculations determine the valid address range. On Cisco routers, an interface needs an address, a dotted-decimal mask and an enabled administrative state.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: IPv4 Subnet Calculations & Interface Setup
>
> 01 Usable hosts
>
> 02 Range boundaries
>
> 03 Interface state

01

### Usable hosts

For conventional IPv4 subnets, usable host addresses are 2 to the power of host bits minus two because network and broadcast are reserved.

02

### Range boundaries

First usable equals network address plus one; last usable equals broadcast address minus one.

03

### Interface state

Router interfaces are commonly administratively down until no shutdown is applied. show ip interface brief summarizes Layer 1 and Layer 2 status.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Usable hosts | For conventional IPv4 subnets, usable host addresses are 2 to the power of host bits minus two because network and broadcast are reserved. |
| Range boundaries | First usable equals network address plus one; last usable equals broadcast address minus one. |
| Interface state | Router interfaces are commonly administratively down until no shutdown is applied. show ip interface brief summarizes Layer 1 and Layer 2 status. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Use a repeatable subnet workflow

Determine prefix and host-bit count, calculate the block size, locate the network boundary, then derive broadcast, first usable and last usable. Conventional usable-host capacity is 2^host-bits minus two.

NOTE\_02

### An address is not enough

A router interface needs the IPv4 address and dotted-decimal mask, plus no shutdown where the interface is administratively disabled. Verify rather than assuming the command succeeded.

NOTE\_03

### Interpret interface state precisely

show ip interface brief separates physical Status from line Protocol. up/up is operational; administratively down signals configuration; up/down is possible, while down/up is not a valid normal combination.

### Apply the model

1. **Step 1 — Use a repeatable subnet workflow.** Determine prefix and host-bit count, calculate the block size, locate the network boundary, then derive broadcast, first usable and last usable. Conventional usable-host capacity is 2^host-bits minus two.
2. **Step 2 — An address is not enough.** A router interface needs the IPv4 address and dotted-decimal mask, plus no shutdown where the interface is administratively disabled. Verify rather than assuming the command succeeded.
3. **Step 3 — Interpret interface state precisely.** show ip interface brief separates physical Status from line Protocol. up/up is operational; administratively down signals configuration; up/down is possible, while down/up is not a valid normal combination.

## $ Network, broadcast and usable-address calculation

Count host bits (32 minus prefix), calculate total addresses as 2^host-bits, then reserve network and broadcast for conventional IPv4 subnets. Usable host count is 2^host-bits minus 2. First usable is network + 1; last usable is broadcast − 1.

| Network | Host bits | Network / first host / last host / broadcast | Usable hosts |
| --- | --- | --- | --- |
| 192.168.1.0/24 | 8 | .0 / .1 / .254 / .255 | 254 |
| 172.16.0.0/16 | 16 | 172.16.0.0 / 172.16.0.1 / 172.16.255.254 / 172.16.255.255 | 65,534 |
| 10.0.0.0/8 | 24 | 10.0.0.0 / 10.0.0.1 / 10.255.255.254 / 10.255.255.255 | 16,777,214 |

## $ Cisco router interface configuration and state

Router interfaces begin administratively down. Configure the address and dotted-decimal mask in interface configuration mode, then use no shutdown. show ip interface brief separates Status (Layer 1 / administrative condition) and Protocol (Layer 2). Down/up does not occur; up/down can.

```
enable
configure terminal
interface gigabitethernet0/0
ip address 192.168.1.254 255.255.255.0
no shutdown
```

Enters the interface, assigns a /24 address and administratively enables the port.

```
show ip interface brief
```

Verifies address, assignment method, Status and Protocol for every interface.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
interface gigabitethernet0/0
```

Enters interface configuration mode.

```
ip address 192.168.1.1 255.255.255.0
```

Assigns an IPv4 address and subnet mask.

```
no shutdown
```

Administratively enables the interface.

```
show ip interface brief
```

Verifies addressing and interface status.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Status represents the physical condition and Protocol represents the line protocol. Down/up cannot occur, but up/down can.
