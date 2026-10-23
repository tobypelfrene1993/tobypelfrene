> Concept map: VLAN trunking and ROAS
>
> 01 Access VLANs
>
> 02 802.1Q trunk
>
> 03 Router subinterfaces

## $ VLAN Trunk Overview

VLANs segment a physical LAN into
multiple logical broadcast domains. A trunk
port carries traffic for multiple VLANs between switches using
802.1Q tagging, while
Router-on-a-Stick (ROAS) enables
inter-VLAN routing through a single physical router interface using
subinterfaces.

A native VLAN is the only VLAN that
traverses a trunk link untagged. By shifting this away from the default
VLAN 1, you reduce the control-plane attack surface and avoid
spanning-tree conflicts.

VLAN ID 1-4094   TRUNK PROTOCOL 802.1Q   NATIVE VLAN UNTAGGED

## $ Switch Configuration

### Creating Data & Native VLANs

```
vlan 150
```

```
name Productie
```

```
vlan 900
```

```
name NativeVlan
```

### Assigning VLANs to Access Interfaces

```
interface range fa0/1-4
```

```
switchport mode access
```

```
switchport access vlan 150
```

### Configuring the Trunk Link & Native VLAN

```
interface fa0/24
```

```
switchport mode trunk
```

```
switchport trunk native vlan 900
```

```
switchport trunk allowed vlan 150
```

// Append additional VLANs separated by commas
(e.g., 150,200,250,300).

## $ Router Configuration

### Subinterface Creation (dot1q Encapsulation)

```
interface g0/0.150
```

```
encapsulation dot1Q 150
```

```
ip address 192.168.1.254 255.255.255.0
```

### DHCP Relay Configuration (IP Helper Address)

If a centralized DHCP server exists on a different subnet, configure the
ip helper-address directly on the router
subinterface serving as the default gateway for that VLAN. If the subinterface
session is no longer active, re-select it first using
interface g0/0.150.

```
ip helper-address 10.10.110.1
```

## $ Verification Commands

EXECUTE FROM PRIVILEGED EXEC MODE TO CONFIRM VLAN AND TRUNKING STATUS

| Command | Purpose / Exam Notes |
| --- | --- |
| `show vlan brief` | Verify the VLAN database, assigned access ports, and VLAN status on the switch. |
| `show interface trunk` | Verify trunking status, allowed VLANs, and native VLAN on trunk ports. |
| `show ip interface brief` | Verify subinterface status and assigned IP addresses on the router. Prefix with `do` from configuration modes. |
