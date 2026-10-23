## $ Why this matters

A command reference is useful only when every command is tied to the correct configuration mode, topology role and verification step. This guide turns the supplied cheat sheet into a safe, task-oriented lab reference.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: Cisco IOS CLI Command Reference
>
> 01 Configuration modes
>
> 02 Role before syntax
>
> 03 Evidence-driven verification

01

### Configuration modes

Cisco IOS commands are mode-specific. Move from user EXEC to privileged EXEC, global configuration and then the appropriate feature or interface submode before entering a command.

02

### Role before syntax

A valid command can still be wrong if it is applied to the wrong interface, VLAN, direction or device role. Define the topology and traffic flow first.

03

### Evidence-driven verification

Use show commands, counters and controlled traffic after configuration. An accepted command proves syntax, not a working design.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Configuration modes | Cisco IOS commands are mode-specific. Move from user EXEC to privileged EXEC, global configuration and then the appropriate feature or interface submode before entering a command. |
| Role before syntax | A valid command can still be wrong if it is applied to the wrong interface, VLAN, direction or device role. Define the topology and traffic flow first. |
| Evidence-driven verification | Use show commands, counters and controlled traffic after configuration. An accepted command proves syntax, not a working design. |

## $ Mode navigation, identity and secure local access

The basic navigation commands are correct, but credentials shown in a cheat sheet are examples of syntax only. Never reuse sample passwords such as `class`, `cisco` or `Cisco123`. Prefer `enable secret` and named local users with a strong unique secret. `service password-encryption` only obscures legacy line passwords; it is not a substitute for strong authentication.

```
enable
configure terminal
hostname SW1
banner motd #Authorized users only#
no ip domain-lookup
ip domain-name lab.example
```

Moves into global configuration, establishes device identity and prevents accidental CLI typos from causing DNS lookups.

```
enable secret <strong-unique-secret>
username admin privilege 15 secret <strong-unique-secret>
line console 0
 login local
line vty 0 4
 login local
 transport input ssh
```

Uses local user authentication for console and VTY access while allowing SSH only on the VTY lines. SSH also needs an RSA key pair and an IOS version compatible with SSH.

```
end
exit
do show running-config
```

`end` returns to privileged EXEC, `exit` moves up one configuration level, and `do` runs an EXEC command without leaving configuration mode.

## $ Configuration files and interface foundations

Saving the running configuration is routine; loading startup-config into running-config merges configuration and can disrupt an existing session, so use it only deliberately. Erasing startup-config and reloading are destructive lab-reset operations. Interface names and supported speed/duplex commands vary by platform.

```
copy running-config startup-config
show startup-config
show running-config
```

Saves the active configuration to NVRAM and compares stored versus active configuration.

```
interface gigabitethernet0/1
 description Uplink to R1
 ip address 192.168.1.1 255.255.255.0
 no shutdown
```

Documents, addresses and administratively enables a routed interface.

```
interface range gigabitethernet0/1 - 2
 shutdown
```

Applies the same operation to a contiguous supported interface range; verify platform numbering before use.

```
show interfaces status
show interfaces gigabitethernet0/1
show interfaces counters errors
```

Checks port state, negotiated settings and error counters before forcing speed or duplex.

## $ VLANs, trunks, STP and EtherChannel

The VLAN, trunk and STP commands are valid, but the VLAN must exist before it can be assigned or used as a native VLAN. Restricting an allowed-VLAN list replaces the default list, so include every VLAN that must cross the trunk. Enable PortFast and BPDU Guard only on genuine end-device access ports. EtherChannel members must match in speed, duplex and Layer 2 settings.

```
vlan 10
 name SALES
vlan 20
 name VOICE
vlan 99
 name NATIVE
```

Creates the VLANs before assigning access, voice or native-VLAN roles.

```
interface gigabitethernet0/1
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 20
 spanning-tree portfast
 spanning-tree bpduguard enable
```

Builds an end-device port with a data VLAN and optional voice VLAN. Do not use this pattern on a switch-to-switch link.

```
interface gigabitethernet0/24
 switchport mode trunk
 switchport trunk native vlan 99
 switchport trunk allowed vlan 10,20,99
show interfaces trunk
```

Configures and verifies a trunk; the same native VLAN and allowed VLAN policy must be compatible at the far end.

```
spanning-tree mode rapid-pvst
spanning-tree vlan 10 root primary
show spanning-tree vlan 10
```

Uses Rapid PVST+ and expresses root-bridge intent for VLAN 10. Confirm the elected root rather than relying on the configuration request.

```
interface range gigabitethernet0/1 - 2
 channel-group 1 mode active
interface port-channel 1
 switchport mode trunk
show etherchannel summary
```

Forms an LACP EtherChannel and verifies that member links bundle into the port-channel.

## $ IPv4 routing, OSPF and IPv6

The static-route, OSPF and IPv6 commands are syntactically sound. A static route needs a reachable next hop or an appropriate exit interface. Configure the same OSPF reference bandwidth on every router in the OSPF domain. `default-information originate` normally requires an existing default route; add `always` only when deliberate. An IPv6 link-local next hop requires the outgoing interface in a static route.

```
ip route 0.0.0.0 0.0.0.0 10.1.1.254
ip route 192.168.10.0 255.255.255.0 10.1.2.2
show ip route
```

Adds a default route and a specific IPv4 route, then checks installation in the routing table.

```
router ospf 1
 router-id 1.1.1.1
 auto-cost reference-bandwidth 1000
 network 10.1.1.0 0.0.0.255 area 0
 passive-interface gigabitethernet0/0
show ip ospf neighbor
show ip route ospf
```

Enables single-area OSPF, sets a stable router ID and a 1,000-Mbps reference bandwidth. Use passive-interface only where OSPF neighbours must not form.

```
ipv6 unicast-routing
interface gigabitethernet0/0
 ipv6 address 2001:db8:1::1/64
 ipv6 address fe80::1 link-local
 no shutdown
ipv6 route ::/0 gigabitethernet0/0 fe80::2
show ipv6 interface brief
show ipv6 route
```

Enables IPv6 forwarding, configures global and link-local addressing, then uses a link-local next hop with its required outgoing interface.

## $ ACLs, port security, DHCP, NAT and management

The source examples are valid as basic patterns, with important boundaries: every ACL ends in an implicit deny, an ACL direction changes what traffic it sees, Port Security needs a Layer 2 access port, and NAT inside/outside labels must reflect the actual traffic flow. Choose a real DNS and NTP service instead of copying public example addresses into a production configuration.

```
ip access-list extended WEB-ONLY
 permit tcp 192.168.10.0 0.0.0.255 any eq 80
 permit tcp 192.168.10.0 0.0.0.255 any eq 443
 deny ip any any
interface gigabitethernet0/1
 ip access-group WEB-ONLY out
show access-lists
```

Builds a named extended ACL and applies it outbound. Check the direction against the intended source, destination and policy before attaching it.

```
interface gigabitethernet0/1
 switchport mode access
 switchport port-security
 switchport port-security maximum 2
 switchport port-security mac-address sticky
 switchport port-security violation restrict
show port-security interface gigabitethernet0/1
```

Enables and verifies sticky-MAC Port Security on an access port.

```
ip dhcp excluded-address 192.168.10.1 192.168.10.10
ip dhcp pool LAN
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server <dns-server-ip>
show ip dhcp binding
```

Defines a simple IPv4 DHCP pool and confirms leases.

```
access-list 1 permit 192.168.10.0 0.0.0.255
interface gigabitethernet0/0
 ip nat inside
interface gigabitethernet0/1
 ip nat outside
ip nat inside source list 1 interface gigabitethernet0/1 overload
show ip nat translations
show ip nat statistics
```

Configures interface PAT. The ACL must match only internal addresses meant for translation, and the outside interface must be the internet-facing interface.

```
logging host <syslog-server-ip>
ntp server <ntp-server-ip>
cdp run
lldp run
show cdp neighbors
show lldp neighbors
```

Configures common management services and verifies Layer 2 discovery. Apply a suitable logging severity and secure management policy for production.

## $ Troubleshooting workflow and debug safety

The listed show, ping and traceroute commands are good first checks. Start at Layer 1/2, then validate addressing and routes, then test the actual path. Debug commands can consume CPU and flood a terminal; use them briefly in a controlled lab, turn them off explicitly and use `terminal monitor` when connected through VTY.

```
show interfaces status
show interfaces counters errors
show vlan brief
show interfaces trunk
show spanning-tree
show mac address-table
```

Collects Layer 1/2 evidence for interface, VLAN, trunk, STP and forwarding-table problems.

```
show ip interface brief
show ip route
show arp
show ip protocols
show ip ospf neighbor
```

Collects Layer 3 and routing-protocol evidence before changing configuration.

```
ping 8.8.8.8
traceroute 8.8.8.8
show version
show running-config
```

Tests reachability and path, then identifies platform/software context and active configuration.

```
terminal monitor
debug ip icmp
undebug all
```

Observes ICMP debugging during a short test and then disables all debug output. Avoid leaving debug active on a production device.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show running-config
show ip interface brief
show ip route
```

A compact first inspection of active configuration, interface state and IPv4 forwarding state.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Memorise command families and configuration context, not isolated strings. On an exam and in a lab, identify the feature, enter the correct mode, configure only the required scope, then verify the operational result.
