> Concept map: Sticky MAC port security
>
> 01 Learn MAC address
>
> 02 Persist the binding
>
> 03 Verify secure port state

## $ Introduction & Fundamentals

### What is Sticky MAC?

Sticky MAC learning bridges the gap between
dynamic MAC learning and manual static configuration, combining the automation of
the former with the persistence of the latter.

### How It Works

The switch dynamically learns connected MAC addresses up to the configured
maximum and automatically injects them directly
into running-config as
secure static bindings.

## $ How-To CLI Configuration

EXECUTE IN PRIVILEGED EXEC MODE (Switch#) AND CONFIGURATION MODE (Switch(config)#)

### Enabling Sticky MAC Learning

// Prerequisite: set static access mode and enable
port security before activating sticky learning.

```
configure terminal
```

```
interface FastEthernet 0/2
```

```
switchport mode access
```

```
switchport port-security
```

```
switchport port-security mac-address sticky
```

### Adjusting Maximum Allowed Addresses

//
Raise the default of 1 secure MAC so sticky learning can capture multiple connected
devices.

```
switchport port-security maximum 2
```

### Critical Step: Saving Sticky Addresses to NVRAM

// Persistence: sticky addresses only survive a
reboot if written to startup-config.

```
copy running-config startup-config
```

## $ Technical Deep-Dive: Persistence & Security Benefits

### Boot Persistence & Memory Mechanics

Sticky MAC addresses reside in RAM (running-config).
If the switch reboots without saving, dynamically learned sticky addresses are
lost. Executing
copy running-config startup-config writes the
learned switchport port-security mac-address sticky
\<MAC> lines into NVRAM for reboot
persistence.

### Operational Scalability

Eliminates manual typing errors and tedious MAC address lookup tasks across hundreds
of access ports while maintaining
strict Layer 2 access control.

### Anti-Spoofing Defense

Locks the learned device to that
specific switch port, blocking unauthorized
rogue devices or network drop replacements.

## $ Operational Verification

EXECUTE FROM PRIVILEGED EXEC MODE (Switch#) TO CONFIRM STICKY MAC BINDINGS

| Command | Key Information / Expected Result |
| --- | --- |
| `show port-security interface FastEthernet 0/2` | Verifies Sticky MAC Addresses count and operational status |
| `show port-security address` | Displays table of all secure MAC addresses, marked as type SecureSticky |
| `show running-config interface FastEthernet 0/2` | Displays automatically appended switchport port-security mac-address sticky \<MAC> entries |
