> Concept map: DTP hardening
>
> 01 Static trunk decision
>
> 02 Disable negotiation
>
> 03 Verify trunk state

## $ Introduction & CCNA Fundamentals

### Dynamic Trunking Protocol (DTP)

Dynamic Trunking Protocol (DTP) is a Cisco
proprietary protocol. By default, Cisco switches transmit
DTP frames every 30 seconds on every switchport
to automatically negotiate whether a link should operate as an
access port or a
trunk port.

### The Risk

DTP enabled on an untrusted access port creates
a critical security vulnerability. An attacker can actively negotiate the link into
trunk mode and gain visibility into every VLAN transiting the switch, a technique
known as VLAN hopping.

## $ How-To CLI Configuration

EXECUTE IN PRIVILEGED EXEC MODE (Switch#) AND CONFIGURATION MODE (Switch(config)#)

### Securing an Access Port

// Prerequisite: explicitly set static access mode
before disabling DTP.

```
configure terminal
```

```
interface FastEthernet 0/1
```

```
switchport mode access
```

```
switchport nonegotiate
```

### Securing a Static Trunk Link

//
Statically define trunking and stop DTP frame transmission on switch-to-switch or
switch-to-router links.

```
configure terminal
```

```
interface GigabitEthernet 0/1
```

```
switchport mode trunk
```

```
switchport nonegotiate
```

### Configuration Persistence

```
copy running-config startup-config
```

## $ Technical Deep-Dive: Security Advantages

### VLAN Hopping Attack Mitigation

An attacker connected to an access port with DTP active can craft
dynamic desirable DTP packets. If accepted, the
port transforms into a trunk, granting the attacker access to
all VLANs passing through that switch.

Executing switchport nonegotiate completely
halts DTP frame generation and ignores incoming negotiation requests, closing the
negotiation vector entirely.

### Prerequisite Mode Rule

Important: issuing
switchport nonegotiate returns an error if the
interface is configured as
switchport mode dynamic auto or
switchport mode dynamic desirable. The port must
first be explicitly set to
switchport mode access or
switchport mode trunk.

### Control Plane Overhead Reduction

Stops unneeded layer 2 broadcast traffic — DTP frame transmissions every
30s — on dedicated end-user access ports.

## $ Operational Verification

EXECUTE FROM PRIVILEGED EXEC MODE (Switch#) TO CONFIRM NONEGOTIATE IS ACTIVE

| Verification Command | Key Field / Expected Result |
| --- | --- |
| `show interfaces FastEthernet 0/1 switchport` | Negotiation of Trunking: Off |
| `show dtp interface FastEthernet 0/1` | Confirms DTP protocol status is disabled/inactive on the interface |
| `show running-config interface FastEthernet 0/1` | Confirms switchport nonegotiate line is present in active configuration |
