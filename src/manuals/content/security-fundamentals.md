## $ Why this matters

Network security is a layered operational practice: reduce attack surface, control access, protect data, monitor events and prepare for recovery rather than relying on one device or feature.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: Network Security Fundamentals
>
> 01 CIA triad
>
> 02 Defense in depth
>
> 03 Hardening

01

### CIA triad

Confidentiality limits disclosure, integrity protects correctness and availability keeps authorized services usable.

02

### Defense in depth

Controls at endpoints, access switches, routers, firewalls, identity systems and monitoring layers reduce the impact of a single failure.

03

### Hardening

Use secure management protocols, strong authentication, least privilege, timely updates, backups and logging to reduce avoidable exposure.

| Concept | What to remember in a lab or exam |
| --- | --- |
| CIA triad | Confidentiality limits disclosure, integrity protects correctness and availability keeps authorized services usable. |
| Defense in depth | Controls at endpoints, access switches, routers, firewalls, identity systems and monitoring layers reduce the impact of a single failure. |
| Hardening | Use secure management protocols, strong authentication, least privilege, timely updates, backups and logging to reduce avoidable exposure. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Apply CIA to every control decision

Confidentiality limits disclosure, integrity prevents unauthorised change and availability keeps authorised services usable. A security event can threaten more than one of these goals at once.

NOTE\_02

### Use the risk vocabulary correctly

A vulnerability is a weakness; an exploit can use it; a threat is the possibility it will be exploited; a mitigation reduces likelihood or impact. Security reduces risk—it does not create an absolute guarantee.

NOTE\_03

### Recognise common attack patterns

The source covers DoS/DDoS, spoofing, reflection/amplification, man-in-the-middle, reconnaissance, malware, social engineering and password attacks. Defence in depth combines technical controls, people, process, monitoring and recovery.

### Apply the model

1. **Step 1 — Apply CIA to every control decision.** Confidentiality limits disclosure, integrity prevents unauthorised change and availability keeps authorised services usable. A security event can threaten more than one of these goals at once.
2. **Step 2 — Use the risk vocabulary correctly.** A vulnerability is a weakness; an exploit can use it; a threat is the possibility it will be exploited; a mitigation reduces likelihood or impact. Security reduces risk—it does not create an absolute guarantee.
3. **Step 3 — Recognise common attack patterns.** The source covers DoS/DDoS, spoofing, reflection/amplification, man-in-the-middle, reconnaissance, malware, social engineering and password attacks. Defence in depth combines technical controls, people, process, monitoring and recovery.

## $ CIA triad and risk vocabulary

Security aims to reduce risk, not guarantee that a system can never be compromised. Confidentiality limits disclosure, integrity protects correctness and availability keeps authorised services usable. A vulnerability is a weakness; an exploit can use it; a threat is the possibility of exploitation; a mitigation reduces likelihood or impact.

| Term | Meaning | Example effect |
| --- | --- | --- |
| Confidentiality | Only authorised access to data | Man-in-the-middle interception can disclose data. |
| Integrity | Data cannot be changed without authorisation | Altered traffic or configuration damages correctness. |
| Availability | Authorised services remain usable | DoS/DDoS can exhaust a service. |
| Defence in depth | Multiple complementary controls | Endpoint, identity, network, logging and recovery controls together. |

## $ Attack categories and their objectives

Attack types can overlap: a spoofed-source SYN flood is both spoofing and denial of service. Recognise the mechanism and which CIA goal is threatened before selecting a control.

| Attack | Core mechanism | Typical impact |
| --- | --- | --- |
| DoS / DDoS | Exhausts capacity or state | Availability |
| Spoofing | Forges source IP or MAC identity | Can enable several attack types |
| Reflection / amplification | Spoofed victim address receives replies from reflectors | Availability |
| ARP spoofing / MITM | Poisons local mapping to intercept or alter traffic | Confidentiality and integrity |
| Reconnaissance | Collects information for a later attack | Increases attacker knowledge |
| Malware / social engineering | Compromises systems or people | Can affect all CIA goals |

## $ Core controls and secure operations

Use strong unique passwords and MFA, secure management protocols, least privilege, timely patching, configuration backups and central logging. Certificates bind an identity to a public key; AAA separates Authentication (who are you?), Authorization (what may you do?) and Accounting (what did you do?). Security also requires physical protection and a tested response process.

```
show login
show access-lists
show logging
```

Reviews example IOS evidence for login policy, ACL policy and operational logging; configuration alone is not a complete security programme.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show login
```

Shows login-related security configuration and counters on Cisco IOS.

```
show access-lists
```

Shows configured ACL entries and match counters.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Security is a continuous process. A configuration is only one control; monitoring, patching, access review and incident response are equally important.
