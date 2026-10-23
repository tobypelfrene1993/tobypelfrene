## $ Why this matters

FTP and TFTP are used to move IOS images and configuration files. FTP includes authentication and reliable TCP transport; TFTP is simple UDP-based transfer with fewer protections.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: FTP & TFTP File Transfer
>
> 01 FTP
>
> 02 TFTP
>
> 03 Configuration safety

01

### FTP

FTP uses TCP and authenticates a user. It is more feature-rich but may need additional firewall handling because of its control/data behavior.

02

### TFTP

TFTP uses UDP port 69 and is designed for simple transfers. It has no built-in user authentication or encryption.

03

### Configuration safety

Back up a known-good configuration before upgrades or major changes, and verify the destination filename and transfer completion.

| Concept | What to remember in a lab or exam |
| --- | --- |
| FTP | FTP uses TCP and authenticates a user. It is more feature-rich but may need additional firewall handling because of its control/data behavior. |
| TFTP | TFTP uses UDP port 69 and is designed for simple transfers. It has no built-in user authentication or encryption. |
| Configuration safety | Back up a known-good configuration before upgrades or major changes, and verify the destination filename and transfer completion. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Know the transport and security trade-off

FTP uses TCP and user authentication; TFTP uses UDP port 69 and deliberately keeps the transfer model simple. TFTP has no built-in authentication or encryption and belongs only on a controlled management network.

NOTE\_02

### Treat configuration restore as a change

Copying a configuration into running-config merges commands rather than automatically replacing the running state. Verify the source file and understand the impact before restoring it.

NOTE\_03

### Back up before high-risk work

Keep a known-good configuration before upgrades or broad changes, validate the remote destination and confirm transfer completion. A backup is useful only when it can be identified and restored safely.

### Apply the model

1. **Step 1 — Know the transport and security trade-off.** FTP uses TCP and user authentication; TFTP uses UDP port 69 and deliberately keeps the transfer model simple. TFTP has no built-in authentication or encryption and belongs only on a controlled management network.
2. **Step 2 — Treat configuration restore as a change.** Copying a configuration into running-config merges commands rather than automatically replacing the running state. Verify the source file and understand the impact before restoring it.
3. **Step 3 — Back up before high-risk work.** Keep a known-good configuration before upgrades or broad changes, validate the remote destination and confirm transfer completion. A backup is useful only when it can be identified and restored safely.

## $ FTP and TFTP comparison

Both protocols transfer files between a client and server. For network engineers, a common use is moving a Cisco IOS image to flash memory. The protocol choice changes authentication, transport, firewall behaviour and available functionality.

| Property | FTP | TFTP |
| --- | --- | --- |
| Transport | TCP | UDP |
| Ports | TCP 21 control; TCP 20 data in active mode | UDP 69 only for the first request; transfer then uses negotiated TIDs |
| Authentication / encryption | Username/password but plain text in base FTP | Neither authentication nor encryption |
| Capabilities | Transfer, listing and directory operations | Only read or write a file |
| Reliability | TCP reliability | Protocol acknowledgments, timers and retransmissions |
| Use | When authentication and richer operations are needed | Small transfers in a controlled environment |

## $ Transfer behaviour and firewall implications

TFTP uses lock-step communication: one side sends a data block and waits for an acknowledgement before the next block. It is UDP-based but supplies its own basic reliability. FTP has a persistent control connection; the data connection is separate. Active versus passive mode changes who initiates only the data connection, never the control connection.

| Mode / protocol | Initiates data connection | Operational consequence |
| --- | --- | --- |
| FTP active mode | FTP server | A client-side firewall may block the inbound server-initiated data connection. |
| FTP passive mode | FTP client | Useful behind a firewall because the client initiates both connections. |
| TFTP Read Request | Client to UDP/69 | The server replies from a random Transfer Identifier; subsequent packets use the two TIDs, not UDP/69. |

## $ Cisco IOS image upgrade workflow

An IOS upgrade is a controlled change, not merely a copy operation. Confirm the current version and free flash, copy the known image, verify the new file, set the next boot image, reload in an approved window and verify the running version. Keep the old known-good image until the new boot is proven.

```
show version
show flash
```

Records current IOS version and checks flash capacity before copying.

```
copy tftp: flash:
```

Prompts for remote host, source filename and destination filename. TFTP cannot list server files, so know the exact source name first.

```
boot system flash:new-image.bin
show running-config | include boot system
```

Selects the intended image for the next reload and verifies that the boot instruction is present.

```
copy running-config tftp:
```

Creates a configuration backup before a high-risk change; use a controlled management network because TFTP is unencrypted.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
copy running-config tftp:
```

Copies the current configuration to a reachable TFTP server after interactive destination prompts.

```
copy tftp: running-config
```

Merges a configuration retrieved from TFTP into the running configuration.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

TFTP simplicity is not security. Use it only on a controlled management network and verify the exact file before copying it into a device configuration.
