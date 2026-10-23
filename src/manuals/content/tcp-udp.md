## $ Why this matters

Transport-layer protocols identify applications with port numbers and provide the service model used by the application: reliable connection-oriented TCP or lightweight connectionless UDP.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: TCP & UDP Transport
>
> 01 TCP
>
> 02 UDP
>
> 03 Ports and sockets

01

### TCP

TCP establishes a connection, sequences bytes, acknowledges receipt, retransmits loss and uses flow/congestion control.

02

### UDP

UDP provides ports and a checksum but no connection setup, sequencing or retransmission. Applications choose it when low overhead or timing matters.

03

### Ports and sockets

A port identifies an application service. A transport conversation is distinguished by protocol plus source/destination IP addresses and ports.

| Concept | What to remember in a lab or exam |
| --- | --- |
| TCP | TCP establishes a connection, sequences bytes, acknowledges receipt, retransmits loss and uses flow/congestion control. |
| UDP | UDP provides ports and a checksum but no connection setup, sequencing or retransmission. Applications choose it when low overhead or timing matters. |
| Ports and sockets | A port identifies an application service. A transport conversation is distinguished by protocol plus source/destination IP addresses and ports. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Ports identify the application conversation

Transport-layer port numbers let one host deliver traffic to the correct application. A socket combines an IP address and port; a flow is identified by source and destination IP/port values plus protocol.

NOTE\_02

### TCP trades overhead for reliability

TCP establishes a connection with SYN, SYN-ACK and ACK, then uses sequence numbers, acknowledgements, flow control and retransmission. This supports ordered, reliable byte delivery.

NOTE\_03

### UDP prioritises low overhead

UDP is connectionless and does not provide TCP-style reliability or ordering. Applications such as DNS, voice and streaming choose it when low latency or application-level handling is preferable.

### Apply the model

1. **Step 1 — Ports identify the application conversation.** Transport-layer port numbers let one host deliver traffic to the correct application. A socket combines an IP address and port; a flow is identified by source and destination IP/port values plus protocol.
2. **Step 2 — TCP trades overhead for reliability.** TCP establishes a connection with SYN, SYN-ACK and ACK, then uses sequence numbers, acknowledgements, flow control and retransmission. This supports ordered, reliable byte delivery.
3. **Step 3 — UDP prioritises low overhead.** UDP is connectionless and does not provide TCP-style reliability or ordering. Applications such as DNS, voice and streaming choose it when low latency or application-level handling is preferable.

## $ Ports, sockets and the transport choice

Transport protocols deliver data to the correct application using port numbers. A socket combines an IP address and port; a flow is identified by source and destination IP address, port numbers and transport protocol. TCP and UDP can use the same numeric port without being the same service.

| Property | TCP | UDP |
| --- | --- | --- |
| Connection | Connection-oriented | Connectionless |
| Reliability | Sequence numbers, acknowledgments and retransmission | No built-in delivery/order guarantee |
| Flow control | Receiver window | Application responsibility if needed |
| Header / overhead | Larger | Smaller |
| Typical fit | Web, file transfer, ordered application data | DNS, voice/video and latency-sensitive traffic |

## $ TCP three-way handshake and teardown

TCP establishes state before application data: client SYN, server SYN-ACK, client ACK. Sequence and acknowledgement numbers make reliable ordered delivery possible. TCP closes with a controlled exchange so both ends can release state; UDP does not create equivalent connection state.

| Protocol number | Protocol |
| --- | --- |
| 6 | TCP |
| 17 | UDP |

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show tcp brief all
```

Shows TCP connection information on platforms that support the command.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

TCP and UDP are Layer 4. IP delivers packets between hosts; TCP or UDP delivers traffic to the intended application process on that host.
