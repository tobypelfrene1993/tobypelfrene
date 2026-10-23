## $ Why this matters

DHCP Snooping is a Cisco Layer 2 security feature that inspects DHCP messages arriving on untrusted switchports, preventing rogue DHCP servers and providing bindings for later security controls.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: DHCP Snooping
>
> 01 Trusted and untrusted ports
>
> 02 Binding table
>
> 03 Rate limiting

01

### Trusted and untrusted ports

All switchports begin untrusted. Trust only the controlled uplink toward the DHCP server or relay; leave client-facing downlinks untrusted.

02

### Binding table

Successful leases create a MAC, IP, lease, VLAN and interface record, allowing later DHCP messages to be validated.

03

### Rate limiting

A per-port limit helps stop DHCP starvation floods, but exceeding it err-disables the port rather than merely dropping excess packets.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Trusted and untrusted ports | All switchports begin untrusted. Trust only the controlled uplink toward the DHCP server or relay; leave client-facing downlinks untrusted. |
| Binding table | Successful leases create a MAC, IP, lease, VLAN and interface record, allowing later DHCP messages to be validated. |
| Rate limiting | A per-port limit helps stop DHCP starvation floods, but exceeding it err-disables the port rather than merely dropping excess packets. |

## $ Trust boundary and message decision rules

DHCP Snooping only filters DHCP traffic that arrives on an untrusted port. Ordinary non-DHCP traffic is unaffected. Trust the controlled uplink toward the DHCP server or relay; keep end-device downlinks untrusted. The decision always applies where a message enters an individual switch, so a client message can be inspected again on the next switch.

| Incoming message | Ingress port | Snooping result |
| --- | --- | --- |
| Any DHCP message | Trusted | Forwards without DHCP Snooping inspection. |
| Non-DHCP traffic | Untrusted | DHCP Snooping does not filter it. |
| OFFER, ACK or NAK | Untrusted | Always dropped: these are server-originated messages. |
| DISCOVER or REQUEST | Untrusted | Forwards only when Ethernet source MAC equals DHCP CHADDR. |
| RELEASE or DECLINE | Untrusted | Forwards only when source IP and ingress interface match the binding table. |

## $ Attacks prevented and residual risk

DHCP starvation/exhaustion floods a server with DISCOVER messages using spoofed MAC addresses until the address pool is unavailable to legitimate clients. DHCP poisoning uses a rogue server that supplies the attacker as default gateway, enabling a man-in-the-middle path. The MAC-to-CHADDR check helps but is not enough against an attacker who spoofs both values; rate limiting is the complementary control.

| Threat | DHCP Snooping control | Important limitation |
| --- | --- | --- |
| Rogue DHCP server / poisoning | Server messages from untrusted ports are dropped. | Correct uplinks must be trusted or legitimate replies are blocked. |
| Starvation / exhaustion | Rate limits restrict DHCP packet floods on untrusted access ports. | A rate-limit breach err-disables the interface. |
| Forged release / decline | IP and ingress interface must match a learned binding. | Only clients with valid bindings can pass the validation. |

## $ Binding table, rate limiting and recovery

After a successful lease the switch records MAC address, IP address, remaining lease, type, VLAN and interface. The table does not store a default gateway. In the source demonstration, a limit of one message per second is intentionally too low for production and is used only to show the err-disabled behaviour.

```
show ip dhcp snooping binding
```

Verifies MAC, IP, lease, VLAN and interface entries created from successful DHCP leases.

```
interface range g0/1 - 3
 ip dhcp snooping limit rate 1
```

Applies the demonstration rate limit to untrusted access ports; choose a realistic higher value in production.

```
errdisable recovery cause dhcp-rate-limit
show errdisable recovery
```

Enables and verifies automatic recovery after a DHCP rate-limit violation.

```
interface g0/1
 shutdown
 no shutdown
```

Manually recovers an affected err-disabled port after investigating the cause.

## $ Configuration order and Option 82

Enable Snooping globally and for each intended VLAN, then trust only the path toward legitimate DHCP infrastructure. Cisco switches can add DHCP Option 82 by default and can drop Option 82-bearing messages received on untrusted links. In the study topology with multiple snooping switches and no matching relay design, disabling the information option on both switches is needed for client traffic to pass. This is a topology-specific remedy, not a universal rule: Option 82 can be useful in a correctly designed relay environment.

```
ip dhcp snooping
ip dhcp snooping vlan 1
no ip dhcp snooping information option
```

Enables Snooping for VLAN 1 and disables Option 82 insertion for the source topology.

```
interface g0/0
 ip dhcp snooping trust
```

Trusts the uplink toward the managed DHCP server or relay path.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
ip dhcp snooping
ip dhcp snooping vlan 1
```

Enables DHCP Snooping globally and for the protected VLAN.

```
ip dhcp snooping trust
```

Marks the selected, controlled uplink as trusted.

```
show ip dhcp snooping binding
```

Shows learned MAC/IP/lease/VLAN/interface bindings.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

On an untrusted port, DHCP OFFER, ACK and NAK are always dropped. DISCOVER and REQUEST require Ethernet source MAC to match DHCP CHADDR; RELEASE and DECLINE must match the binding table.
