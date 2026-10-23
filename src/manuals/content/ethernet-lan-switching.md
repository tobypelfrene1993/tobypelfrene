## $ Why this matters

An Ethernet switch learns source MAC addresses on ingress ports and uses its MAC address table to forward known unicast frames only where they need to go.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

>

### Switch learning and unknown-unicast flooding

 PC-1AAAA.AA00.0001 SW1F0/1 F0/2 F0/3learn source MAC PC-2AAAA.AA00.0002 PC-3AAAA.AA00.0003  SOURCE LEARNEDUNKNOWN DESTINATION: FLOOD MAC TABLEAAAA.AA00.0001 → F0/1\

SW1 learns PC-1 from the source MAC on F0/1. Before PC-2 is known, traffic for PC-2 is flooded out every other port.



01

### Ethernet frame

Preamble and SFD synchronize reception; destination and source MAC fields identify endpoints; Type/Length identifies payload; FCS detects corruption.

02

### Learning and forwarding

The switch learns from the source MAC. For a known destination it forwards to one port; an unknown unicast is flooded except on the ingress port.

03

### MAC addresses

A MAC address is 48 bits. The first 24 bits are the OUI and the remaining 24 bits identify a device within that vendor space.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Ethernet frame | Preamble and SFD synchronize reception; destination and source MAC fields identify endpoints; Type/Length identifies payload; FCS detects corruption. |
| Learning and forwarding | The switch learns from the source MAC. For a known destination it forwards to one port; an unknown unicast is flooded except on the ingress port. |
| MAC addresses | A MAC address is 48 bits. The first 24 bits are the OUI and the remaining 24 bits identify a device within that vendor space. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Read the frame as a Layer 2 unit

Ethernet uses the preamble and SFD for synchronization, destination and source MAC addresses for local delivery, a Type/Length field for the payload and an FCS trailer for error detection.

NOTE\_02

### Learn first, decide second

On every received frame a switch records the source MAC against the incoming interface and VLAN. It then looks up the destination: known unicast is sent to one port; broadcast and unknown unicast are flooded except back out the ingress port.

NOTE\_03

### Keep the forwarding scope clear

A switch forwards within a LAN/VLAN. A router interface creates the Layer 3 boundary between networks; adding more switches does not create a new IP network.

### Apply the model

1. **Step 1 — Read the frame as a Layer 2 unit.** Ethernet uses the preamble and SFD for synchronization, destination and source MAC addresses for local delivery, a Type/Length field for the payload and an FCS trailer for error detection.
2. **Step 2 — Learn first, decide second.** On every received frame a switch records the source MAC against the incoming interface and VLAN. It then looks up the destination: known unicast is sent to one port; broadcast and unknown unicast are flooded except back out the ingress port.
3. **Step 3 — Keep the forwarding scope clear.** A switch forwards within a LAN/VLAN. A router interface creates the Layer 3 boundary between networks; adding more switches does not create a new IP network.

## $ LAN scope and Ethernet frame fields

Ethernet covers Layer 1 and Layer 2. A switch extends a LAN; it does not create a new routed network. Different router interfaces identify separate LANs. Ethernet frames carry a packet locally and are rebuilt at a router for the next link.

| Frame field | Size | Function |
| --- | --- | --- |
| Preamble | 7 bytes | Alternating bits synchronize the receiver clock. |
| SFD | 1 byte | 10101011 marks the end of the preamble and start of the frame. |
| Destination / source | 6 bytes each | 48-bit Layer 2 MAC addresses. |
| Type / Length | 2 bytes | ≤1500 means length; ≥1536 identifies protocol, such as 0x0800 IPv4 or 0x86DD IPv6. |
| FCS | 4 bytes | Detects transmission corruption at the receiver. |

## $ MAC learning and forwarding decisions

A switch learns a dynamic MAC-table entry from every received frame’s source MAC and incoming interface. It then looks up the destination MAC. Known unicast leaves only the matching port; unknown unicast and broadcast are flooded out all other ports. The first 24 MAC bits are the vendor OUI; the final 24 identify the interface within that vendor allocation.

```
show mac address-table
show mac address-table dynamic
```

Displays learned MAC-to-VLAN-to-interface mappings and isolates dynamic entries for troubleshooting.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show mac address-table
```

Displays dynamically learned and statically configured MAC entries with their VLAN and interface.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

A switch expands a LAN; it does not create a new routed network. Different router interfaces, not the number of switches, identify separate LANs.
