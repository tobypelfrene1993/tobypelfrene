> Concept map: SSH management path
>
> 01 Identity and keys
>
> 02 Local authentication
>
> 03 Encrypted remote session

## $ Why Secure Shell

Telnet transmits device management
credentials and CLI traffic in plain text.
Any host on the same network segment can sniff administrative sessions
— including passwords, configuration writes, and routing protocol changes.

Implementing Secure Shell (SSH) encrypts
all terminal communication across
virtual terminal lines (VTY),
protecting network administration channels from sniffing and
man-in-the-middle attacks. SSHv2 is the modern standard.

TELNET PLAINTEXT   SSH ENCRYPTED   VTY LINES 0-15

## $ Command Timeline

EXECUTION ORDER — 9 COMMANDS, ONE CONTIGUOUS SESSION

// Step 1: Enter global configuration mode.

```
configure terminal
```

// Step 2: Define the IP domain name (required for RSA key generation).

```
ip domain-name it1.com
```

// Step 3: Generate the RSA crypto key pair (1024-bit modulus for SSHv2 compliance).

```
crypto key generate rsa general-keys modulus 1024
```

// Step 4: Create a local administrator user account with a secure secret.

```
username admin secret CHANGE_ME_STRONG_SECRET
```

// Step 5: Enter virtual terminal line configuration (all 16 available channels).

```
line vty 0 15
```

// Step 6: Enforce local database authentication for login attempts.

```
login local
```

// Step 7: Explicitly restrict inbound transport to SSH only (disables plain-text Telnet).

```
transport input ssh
```

// Step 8: Return to privileged EXEC mode.

```
end
```

// Step 9: Save the running configuration to NVRAM.

```
write memory
```

## $ Configuration Breakdown

### Prerequisites: Domain & Keys

#### Step 1-2 Domain Name & Global Config

// Asymmetric RSA key pairs require a
valid ip domain-name before generation.
Without a domain, crypto key generate
will reject the operation.

#### Step 3 RSA Key Generation

// The modulus 1024
flag produces a 1024-bit key, the minimum for
SSHv2 compliance. Larger moduli
(2048, 4096) improve security at the cost of generation time.
The general-keys flag generates
both an encryption and a signature key pair.

### User Authentication

#### Step 4 Local Administrator Account

// The secret
keyword stores the password using a cryptographic hash (MD5)
rather than the reversible type-7 Vigenère cipher used by
enable password. This local
database is consulted by login local
on the VTY lines.

### VTY Line Hardening

#### Step 5-7 Line Configuration Lockdown

// Enter line vty 0 15
to configure all 16 virtual terminal channels simultaneously.
login local forces every inbound
session to authenticate against the local username database.
transport input ssh drops unencrypted Telnet
connections entirely — any attempt on TCP/23 is rejected at
the line level.

#### Step 8-9 Persist & Verify

// end
returns to privileged EXEC mode.
write memory (aliased as
wr) commits the running
configuration to NVRAM so the SSH configuration survives
a reload.

## $ Verification Commands

EXECUTE FROM PRIVILEGED EXEC MODE (R1#) TO CONFIRM SSH OPERATION AND TROUBLESHOOT CONNECTIVITY

| Command | Purpose / Exam Notes |
| --- | --- |
| `show ip ssh` | Verify SSH version, auth timeout, and retry counts. |
| `show ssh` | List all active SSH sessions on the router. |
| `show line vty 0 15` | Confirm transport input is set to SSH on the VTY lines. |
| `show run | include username` | Review configured local username accounts. |
| `show crypto key mypubkey rsa` | Inspect the generated RSA public key. |
| `debug ip ssh` | Real-time SSH negotiation trace for troubleshooting. |
