> Concept map: Switch baseline hardening
>
> 01 Identity and access
>
> 02 Management connectivity
>
> 03 Save and verify

## $ Baseline Overview

Bringing a new Cisco Catalyst switch into an enterprise network requires a
standardized initial configuration baseline. Leaving the device on default
out-of-the-box settings exposes the LAN to unauthorized
physical access, unauthenticated remote management,
and operational security risks.

This sequence deploys a device identity, a legal banner, an administratively
disabled (Zero-Trust) default port state, local line authentication, a
privileged secret, and NVRAM persistence before any active VLAN or
layer-2 defense feature is provisioned.

ENABLE HASH Type 5 (MD5)   PORT DEFAULT SHUTDOWN   LINE PASSWORDS Type 7 (reversible)

## $ Command Breakdown

### 1. Hostname & Device Identification

```
hostname HK-SW-CORE01
```

//
Replaces the default Switch prompt with a unique device
identifier. Standard naming conventions (e.g., [Site]-[DeviceType]-[Role])
prevent accidental changes on the wrong hardware during operational workflows.

### 2. Legal Warning Banner

```
banner motd # Authorized Access Only! This is the property of the network. #
```

//
Defines a Message of the Day (MOTD) banner using # as the
delimiter. Banners provide explicit legal notice that unauthorized access is prohibited
before a prompt is presented.

### 3. Port Hardening (Zero-Trust Access Baseline)

```
interface range FastEthernet 0/1 - 24
```

```
shutdown
```

//
Administratively disables all access ports by default. Ports remain shut down until
explicitly enabled and assigned to an authorized access VLAN during host provisioning,
enforcing a Zero-Trust physical access model. Use
interface range FastEthernet 0/1 - 24 to select 24 ports
in a single block.

### 4. Out-of-Band Console Access Protection

```
line con 0
```

```
password CHANGE_ME_STRONG_SECRET
```

```
login
```

//
Secures physical serial console connections (RS-232 / RJ45). Requiring authentication
ensures anyone physically connected to the front panel must present credentials.

### 5. Remote VTY Lines (Telnet / SSH Baseline)

```
line vty 0 15
```

```
password CHANGE_ME_STRONG_SECRET
```

```
login
```

//
Secures virtual terminal lines 0 through 15 (16 simultaneous remote management sessions).
login forces IOS to prompt for the line password on
connection.

### 6. Privileged EXEC Mode Protection

```
enable secret CHANGE_ME_STRONG_SECRET
```

//
Restricts access to privileged EXEC (enable) mode. By default this uses
Type 5 (MD5 hashing), replacing the deprecated cleartext
enable password command. For higher enterprise security,
modern IOS supports SHA-256:

```
enable algorithm-type sha256 secret CHANGE_ME_STRONG_SECRET
```

// enable algorithm-type sha256 secret uses
Type 8 (SHA-256), the modern enterprise standard, and is
preferred over Type 5 where supported.

### 7. Global Password Encryption

```
service password-encryption
```

//
Enables Cisco's global Type 7 password obfuscation engine.
This prevents local line passwords from appearing as plain text in
show running-config output. Note: Type 7 is
reversible obfuscation, not strong encryption — treat it
as protection against casual shoulder-surfing, not against a motivated attacker.

### 8. NVRAM Persistence

```
copy running-config startup-config
```

//
Commits active operational settings from volatile RAM (running-config) into
Non-Volatile RAM (startup-config) so the configuration persists across power
cycles and reloads.

## $ Validation & Verification

| Goal | Command | Expected Result |
| --- | --- | --- |
| Check Port Status | `show ip interface brief` | Interfaces f0/1 - 24 report administratively down |
| Verify Encrypted Passwords | `show running-config` | Line passwords appear obfuscated/encrypted (Type 7) |
| Verify Startup Persistence | `show startup-config` | Startup configuration matches active (running) state |
