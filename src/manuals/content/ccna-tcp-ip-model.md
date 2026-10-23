## $ Why this matters

Layered networking separates responsibilities so that devices and protocols from different vendors can interoperate and faults can be isolated systematically.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

>

### Encapsulation through the TCP/IP stack

  APPLICATIONDATA TRANSPORTSEGMENT NETWORKPACKET DATA LINKFRAME PHYSICALBITS ENCAPSULATION: each lower layer adds its own control information.\

The sender adds information as traffic moves down the stack: data becomes a segment, packet, frame and finally bits on the medium.



01

### Five TCP/IP layers

Application, Transport, Network, Data Link and Physical divide communication from software service down to signals on a medium.

02

### Encapsulation

A sender adds protocol information as data travels down the stack; the receiver removes and processes it in reverse order.

03

### PDUs

Common names are data, segment or datagram, packet, frame and bits. Each name identifies the layer currently handling the information.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Five TCP/IP layers | Application, Transport, Network, Data Link and Physical divide communication from software service down to signals on a medium. |
| Encapsulation | A sender adds protocol information as data travels down the stack; the receiver removes and processes it in reverse order. |
| PDUs | Common names are data, segment or datagram, packet, frame and bits. Each name identifies the layer currently handling the information. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Standards make interoperability possible

IETF specifications define Internet protocols such as IP, TCP, UDP and OSPF, while IEEE standards define technologies such as Ethernet (802.3) and Wi-Fi (802.11). Layering lets one layer change—for example copper to fibre—without redesigning IP.

NOTE\_02

### Follow the PDU on the wire

Application data becomes a TCP segment or UDP datagram, then an IP packet, an Ethernet frame and finally bits. The receiver removes each header in the opposite direction; same-layer peers communicate logically, adjacent layers provide services locally.

NOTE\_03

### Map OSI accurately

The five-layer TCP/IP application layer combines OSI application, presentation and session. Memorise OSI from Layer 1 upward: Physical, Data Link, Network, Transport, Session, Presentation, Application.

### Apply the model

1. **Step 1 — Standards make interoperability possible.** IETF specifications define Internet protocols such as IP, TCP, UDP and OSPF, while IEEE standards define technologies such as Ethernet (802.3) and Wi-Fi (802.11). Layering lets one layer change—for example copper to fibre—without redesigning IP.
2. **Step 2 — Follow the PDU on the wire.** Application data becomes a TCP segment or UDP datagram, then an IP packet, an Ethernet frame and finally bits. The receiver removes each header in the opposite direction; same-layer peers communicate logically, adjacent layers provide services locally.
3. **Step 3 — Map OSI accurately.** The five-layer TCP/IP application layer combines OSI application, presentation and session. Memorise OSI from Layer 1 upward: Physical, Data Link, Network, Transport, Session, Presentation, Application.

## $ Standards, layers and protocol data units

Open standards let devices from different vendors interoperate. IETF defines Internet protocols such as TCP, UDP, IP and OSPF; IEEE defines lower-layer technologies such as Ethernet 802.3 and Wi-Fi 802.11. The five-layer TCP/IP model divides each responsibility without making every device implement the other layers.

| TCP/IP layer | Examples | PDU after processing |
| --- | --- | --- |
| Application | HTTP, HTTPS, DNS, SSH, FTP | Data / message |
| Transport | TCP, UDP and port numbers | TCP segment or UDP datagram |
| Network | IP and ICMP; routing | Packet |
| Data Link | Ethernet, Wi-Fi, MAC addressing | Frame |
| Physical | Copper, fibre, radio signals | Bits |

## $ Encapsulation, decapsulation and OSI mapping

At the sender, every lower layer adds its own control information: L4 header, L3 header, then L2 header and trailer. The physical layer transmits bits. The receiver processes and removes those fields in reverse. TCP/IP Application combines OSI Application, Presentation and Session; the remaining TCP/IP layers map one-for-one to OSI Transport through Physical.

| Interaction | Meaning | Example |
| --- | --- | --- |
| Same-layer | Logical peer communication on separate devices | Transport sequence information is interpreted by the remote transport layer. |
| Adjacent-layer | A lower layer provides a service to the one above it on the same device | IP routing relies on Layer 2 delivery to the next hop. |

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Know both models: TCP/IP application combines OSI application, presentation and session. For troubleshooting, first identify the failing layer before changing configuration.
