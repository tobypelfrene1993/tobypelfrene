## $ Why this matters

Dynamic ARP Inspection validates ARP traffic received on untrusted switchports, using DHCP Snooping bindings or explicit ARP ACLs to stop ARP poisoning and man-in-the-middle attempts.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: Dynamic ARP Inspection (DAI)
>
> 01 ARP poisoning
>
> 02 Binding validation
>
> 03 Rate limiting

01

### ARP poisoning

A forged ARP reply or gratuitous ARP can map the gateway IP to an attacker MAC, diverting traffic through the attacker.

02

### Binding validation

On untrusted ports, DAI compares ARP sender IP/MAC with a DHCP Snooping binding; static hosts need an explicit ARP ACL.

03

### Rate limiting

DAI limits received ARP traffic on untrusted ports by default and err-disables a port that exceeds the configured threshold.

| Concept | What to remember in a lab or exam |
| --- | --- |
| ARP poisoning | A forged ARP reply or gratuitous ARP can map the gateway IP to an attacker MAC, diverting traffic through the attacker. |
| Binding validation | On untrusted ports, DAI compares ARP sender IP/MAC with a DHCP Snooping binding; static hosts need an explicit ARP ACL. |
| Rate limiting | DAI limits received ARP traffic on untrusted ports by default and err-disables a port that exceeds the configured threshold. |

## $ ARP, gratuitous ARP and poisoning

ARP maps a known IPv4 address to a MAC address on the local LAN. It is carried directly in an Ethernet frame with EtherType 0x0806, so there is no IP header around an ARP message. A normal request is broadcast and the normal reply is unicast to the requester. A gratuitous ARP (GARP) is a broadcast ARP reply sent without a prior request; it has legitimate uses, but an attacker can abuse it to update victims' ARP caches with a false mapping.

| ARP form | Destination MAC | Purpose or risk |
| --- | --- | --- |
| Normal request | ff:ff:ff:ff:ff:ff | Discovers the MAC address for a known target IPv4 address. |
| Normal reply | Requester MAC address | Returns the learned IP-to-MAC mapping. |
| Gratuitous ARP | ff:ff:ff:ff:ff:ff | Announces a mapping without a request; a forged mapping can poison a cache. |

## $ DAI trust boundary and binding validation

Dynamic ARP Inspection (DAI) is a switch security feature that filters ARP traffic only when it enters an untrusted port. Every interface is untrusted by default. Trust controlled infrastructure-facing paths, such as an uplink, and leave endpoint-facing access ports untrusted. On an untrusted port, DAI compares the ARP sender IP and MAC information against the DHCP Snooping binding table. This blocks a forged gateway mapping before it reaches other hosts, reducing ARP spoofing and man-in-the-middle risk.

| Port or host type | DAI behaviour |
| --- | --- |
| Trusted infrastructure ingress | Forwards ARP without DAI inspection. |
| Untrusted DHCP client | Validates sender IP and MAC against the DHCP Snooping binding. |
| Untrusted static-address host | Has no DHCP binding; use an ARP ACL to permit its valid mapping. |
| Untrusted attack port | Drops invalid ARP before it can update other hosts' ARP caches. |

## $ Enable DAI, rate limiting and recovery

Enable DAI per VLAN. Unlike DHCP Snooping, the source does not use a separate global DAI enable command. The default limit on an untrusted port is 15 ARP packets per second with a one-second burst interval; trusted ports have no default limit. Exceeding the configured rate causes an err-disabled interface, so investigate the cause before recovery.

```
ip arp inspection vlan 1
interface g0/0
 ip arp inspection trust
```

Enables DAI for VLAN 1 and trusts only the controlled infrastructure-facing interface.

```
show ip arp inspection interfaces
show ip dhcp snooping binding
```

Checks port trust, rate and burst settings, then confirms the DHCP Snooping bindings DAI can use.

```
interface range g0/1 - 2
 ip arp inspection limit rate 25 burst interval 2
```

Sets a limit of 25 ARP packets during each two-second interval on selected untrusted ports.

```
errdisable recovery cause arp-inspection
show errdisable recovery
```

Enables and verifies automatic recovery after an ARP inspection violation.

```
interface g0/1
 shutdown
 no shutdown
```

Manually recovers an affected interface after the underlying cause is resolved.

## $ Extra validation and ARP ACLs for static hosts

DAI can apply additional consistency checks. A single validate command replaces the previous validation selection, so place every desired keyword in one command. Use an ARP access list when a legitimate statically addressed device needs to pass DAI without a DHCP Snooping binding.

```
ip arp inspection validate ip src-mac dst-mac
```

Enables IP, source-MAC and destination-MAC validation together. Source-MAC checks the Ethernet source against the ARP sender MAC; destination-MAC checks a reply's Ethernet destination against its ARP target MAC; IP validation rejects invalid sender or target address use.

```
do show running-config | include validate
```

Verifies which optional DAI validation checks are currently configured.

```
arp access-list ARP-ACL-1
 permit ip host 192.168.1.100 mac host 0c29.2f1e.7700
ip arp inspection filter ARP-ACL-1 vlan 1
```

Permits the specified static IPv4-to-MAC mapping for DAI in VLAN 1.

```
show ip arp inspection
```

Reviews DAI status, VLAN coverage, configured checks and inspection counters.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
ip arp inspection vlan 1
```

Enables DAI for VLAN 1; unlike DHCP Snooping, this is the enabling command used by the source.

```
ip arp inspection trust
```

Trusts a controlled infrastructure-facing port.

```
show ip arp inspection
```

Shows DAI status, validation choices, ACLs and forward/drop counters.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

DAI is per VLAN. On untrusted ports it uses DHCP Snooping bindings or ARP ACLs; its default rate limit is 15 received ARP packets per second, while trusted ports are not rate-limited by default.
