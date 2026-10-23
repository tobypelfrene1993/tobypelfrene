> Concept map: Secure remote management
>
> 01 Management IP
>
> 02 SSH version 2
>
> 03 VTY access control

## $ Introduction & CCNA Fundamentals

### Securing Remote Administration

Telnet transmits the entire
management session — passwords, configuration writes, and CLI
keystrokes — in
cleartext across the wire.
Any host on the shared subnet can sniff administrative
credentials without any cryptographic effort. For this reason
Telnet must be disabled on production network devices.

SSH v2 encrypts the full
session and, combined with a
local AAA database
(username ... secret plus
login local), forms the
CCNA baseline standard for secure remote management. It is the
default answer whenever an exam or a design question asks how
to administer a Cisco device from a distance.

TELNET CLEARTEXT   SSH ENCRYPTED   AUTH LOCAL AAA

### Key Requirements

// SSH cannot start until four
prerequisites are in place. Missing any one of them produces a
configuration-time error or a refused session.

#### REQ 1 Unique Hostname

// The device must carry a
distinct hostname. It feeds
the fully-qualified domain name (FQDN) used to seed the RSA key
generation. The default Switch
/ Router names are not
sufficient for a production identity.

#### REQ 2 IP Domain Name

// ip domain-name example.com
defines the domain suffix. Combined with the hostname it forms
the FQDN (for example
Router1.example.com) that
names the generated RSA key.

#### REQ 3 RSA Key Pair

// crypto key generate rsa
creates the asymmetric key pair. SSH v2 requires at least a
1024-bit modulus to function on modern IOS.

#### REQ 4 Local Admin Credentials

// A local username with
privilege 15 and a hashed
secret is the account the
VTY lines consult via
login local. Without it the
encrypted channel exists but nobody can authenticate.

## $ How-To CLI Configuration

### Step 1: Base Credentials & RSA Keys

// Enter global configuration mode.

```
configure terminal
```

// Assign a unique hostname (prerequisite for RSA key generation).

```
hostname Router1
```

// Define the IP domain name (prerequisite for RSA key generation).

```
ip domain-name example.com
```

// Create a local administrator account with privilege 15 and a hashed secret.

```
username admin privilege 15 secret CHANGE_ME_STRONG_SECRET
```

// Generate the RSA crypto key pair (1024-bit minimum for SSH v2).

```
crypto key generate rsa
```

// Force the device to negotiate SSH v2 only (never v1).

```
ip ssh version 2
```

### Step 2: VTY Line Hardening

// Restrict virtual terminal lines to SSH only and enforce local database login.

// Enter all 16 virtual terminal lines (0 through 15) at once.

```
line vty 0 15
```

// Enforce authentication against the local username database.

```
login local
```

// Block Telnet entirely — only encrypted SSH sessions may connect.

```
transport input ssh
```

// Return to global configuration mode.

```
exit
```

### Step 3A: Switch Management IP Assignment (SVI)

// Configure a Switched Virtual Interface (VLAN 1) and default gateway for out-of-subnet management.

// Enter the VLAN 1 switched virtual interface.

```
interface vlan 1
```

// Assign the management IP address and subnet mask.

```
ip address 192.168.1.10 255.255.255.0
```

// Bring the management interface administratively up.

```
no shutdown
```

// Return to global configuration mode.

```
exit
```

// Set the default gateway for management traffic leaving the local subnet.

```
ip default-gateway 192.168.1.1
```

### Step 3B: Router Physical Interface Assignment

// Assign a direct Layer 3 IP address to a physical router port.

// Enter the physical routed interface.

```
interface GigabitEthernet 0/0
```

// Assign the Layer 3 IP address and subnet mask directly on the port.

```
ip address 192.168.1.1 255.255.255.0
```

// Bring the physical interface administratively up.

```
no shutdown
```

### Step 4: Save Configuration

// Commit the running configuration to NVRAM so everything survives a reload.

```
copy running-config startup-config
```

## $ Technical Deep-Dive: Key Security Mechanics

### RSA Key Modulus Selection

// Standard CCNA practice requires
at least a 1024-bit key modulus
to support SSH v2. A
2048-bit modulus is
recommended for production hardening — larger moduli strengthen the
encryption at the cost of slower key generation and slightly higher
session overhead. Never accept the old 512-bit default when asked
to secure a device.

### Transport Security

// transport input ssh
prevents active Telnet brute-force attacks by completely blocking
TCP port 23 traffic on the VTY
lines. Even if Telnet remains configured, the line refuses the
connection outright — an inbound plaintext session is impossible
to open against these lines.

### SVI vs. Physical Management

// Layer 2 switches require an
SVI (interface vlan 1) plus an
ip default-gateway for remote
management from external subnets, because a pure L2 switch has no
routing engine to forward management traffic itself. Layer 3
routers, by contrast, route natively on physical interfaces such
as GigabitEthernet — the IP
address is assigned directly to the port and the default gateway
mechanism is not used.

## $ Operational Verification

EXECUTE FROM PRIVILEGED EXEC MODE (Router1#) TO CONFIRM SSH OPERATION, MANAGEMENT REACHABILITY, AND VTY ENFORCEMENT

| Command | Key Information / Expected Result |
| --- | --- |
| `show ip interface brief` | Verifies the Management SVI or physical interface status (up/up) and IP assignment. |
| `show ip ssh` | Confirms SSH v2 is enabled, the authentication timeout, and the maximum retry limits. |
| `show ssh` | Lists active SSH sessions, connected user accounts, and ciphers in use. |
| `show line vty 0 15` | Confirms `transport input ssh` and `login local` enforcement on the virtual lines. |
