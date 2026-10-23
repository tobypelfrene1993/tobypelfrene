> Concept map: Port-security violation handling
>
> 01 Protect
>
> 02 Restrict
>
> 03 Shutdown

## $ Introduction & CCNA Fundamentals

### Port Security Overview

Port Security restricts interface traffic by
limiting and identifying the set of
allowed MAC addresses that may source frames on
an access port. Once the maximum secure MAC count is reached, any unknown source
address is treated as a security violation.

### Default Behavior

Enabling port security defaults to a maximum of
1 MAC address per interface and applies the
shutdown violation mode — if an unauthorized
frame hits the interface, the port is
error-disabled immediately.

## $ How-To CLI Configuration

EXECUTE IN PRIVILEGED EXEC MODE (Switch#) AND CONFIGURATION MODE (Switch(config)#)

### Prerequisites & Enabling Port Security

// Prerequisite: set static access mode before
enabling port security on the interface.

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
switchport port-security
```

### Static MAC Address Binding

//
Permanently bind a trusted device MAC so the port only accepts frames from that
source.

```
switchport port-security mac-address 0050.56be.a1b2
```

### Violation Mode Options

// Option A: Protect Mode — drops unauthorized
traffic silently.

```
switchport port-security violation protect
```

// Option B: Restrict Mode — drops traffic, logs
Syslog/SNMP, increments counter.

```
switchport port-security violation restrict
```

// Option C: Shutdown Mode — default; error-disables
the interface immediately.

```
switchport port-security violation shutdown
```

### Configuration Persistence

```
copy running-config startup-config
```

## $ Technical Deep-Dive: Violation Mode Comparison

### Protect vs. Restrict vs. Shutdown Mechanics

Protect: Drops unknown source MAC packets.
No Syslog messages generated, no SNMP traps sent, and the
security violation counter does not increment.
The interface remains operational.

Restrict: Drops unknown source MAC packets,
generates Syslog messages, sends
SNMP traps, and increments the security
violation counter. The interface remains
up/up.

Shutdown: Immediately forces the interface
into an err-disabled state (down/down).
Generates Syslog/SNMP alerts and turns off the port LED. Requires
shutdown / no shutdown or
errdisable recovery to restore the port.

## $ Operational Verification

EXECUTE FROM PRIVILEGED EXEC MODE (Switch#) TO CONFIRM PORT SECURITY STATE

| Command | Key Information / Expected Result |
| --- | --- |
| `show port-security interface FastEthernet 0/1` | Displays Port Security status, Violation Mode, Max MACs, and Security Violation Count |
| `show port-security` | Provides a summary of all port-security enabled interfaces across the switch |
| `show interface FastEthernet 0/1` | Checks if the port has been placed into err-disabled status due to a shutdown violation |
