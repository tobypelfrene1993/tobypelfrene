> Concept map: Standard ACL decision flow
>
> 01 Match source address
>
> 02 Permit or deny
>
> 03 Apply near destination

## $ Introduction & Key Concept

A Standard IPv4 ACL filters traffic based
only on the source IPv4 address. It cannot inspect
the destination address, the protocol, or the port numbers, which makes it coarse-grained
but extremely fast and simple to build.

Because a standard ACL only knows where traffic came from, it is typically applied
close to the destination of the traffic it protects,
keeping the filtering effective without accidentally blocking legitimate transit traffic.

### Standard Number Ranges

// Standard ACLs are identified by their number range:
1-99 for the classic range, and the
expanded range 1300-1999 added in newer IOS versions
when the original numbers ran out.

### Implicit Deny

Remember: all Cisco ACLs end with an invisible
deny any rule at the bottom. If a packet does not
match any of your explicit permit statements, it is
silently dropped. Always plan your permits explicitly — there is no "allow by default".

## $ Step 1: Numbered Standard ACLs (Global Config)

CONFIGURE ACLS USING NUMBERS DIRECTLY IN GLOBAL CONFIGURATION MODE

```
access-list <1-99|1300-1999> {permit|deny} <source-ip> <wildcard-mask>
```

```
access-list <1-99|1300-1999> {permit|deny} host <source-ip>
```

```
access-list <1-99|1300-1999> {permit|deny} any
```

```
access-list <1-99|1300-1999> remark <documentation text>
```

Rules are evaluated top to bottom and processing
stops at the first match. There is no way to insert or reorder a rule inside a
numbered ACL, so plan the sequence carefully before committing.

## $ Step 2: Named Standard ACLs (Sub-configuration Mode)

NAMED ACLS PROVIDE BETTER ORGANIZATION AND ALLOW DIRECT EDITING VIA SEQUENCE NUMBERS

```
ip access-list standard <ACL-NAME>
```

```
{permit|deny} <source-ip> <wildcard-mask>
```

```
{permit|deny} host <source-ip>
```

```
{permit|deny} any
```

```
remark <documentation text>
```

## $ Step 3: Applying Standard ACLs

An ACL does nothing until it is applied to an
interface or a
management line.

### A. Applying to Physical or Virtual Interfaces (Routed Interfaces / VLANs)

```
interface <interface-id>
```

```
ip access-group <NUMBER|NAME> {in|out}
```

### B. Applying to VTY Lines (Restricting SSH/Telnet Management Access)

Exam Note: When securing VTY lines, use the
access-class command, not
ip access-group. Interfaces are governed by
access-group; VTY management lines are governed by access-class.

```
line vty 0 4
```

```
access-class <NUMBER|NAME> in
```

## $ Step 4: Editing ACLs using Sequence Numbers

CISCO AUTOMATICALLY ASSIGNS SEQUENCE NUMBERS (10, 20, 30...) INSIDE NAMED ACLS

You can insert a new rule between existing rules
or delete specific lines without removing the entire ACL. This is only possible with
named ACLs — numbered ACLs must be deleted and rebuilt as a whole.

```
ip access-list standard <ACL-NAME>
```

```
no <sequence-number>
```

```
<sequence-number> {permit|deny} host <source-ip>
```

//
Example: Inserting a rule at line 15 between lines
10 and 20.

```
15 permit host 192.168.1.50
```

## $ Step 5: Verification & Troubleshooting

EXECUTE THESE COMMANDS FROM PRIVILEGED EXEC MODE (Router#) TO VERIFY ACL OPERATION AND RULE MATCHES

| Command | Purpose / Exam Notes |
| --- | --- |
| `show ip access-lists` | Displays all IPv4 ACLs, sequence numbers, rule order, and packet match counters. |
| `show access-lists` | Shows all configured ACLs (including IPv6 or MAC-layer ACLs if configured). |
| `show ip access-lists <NAME|NUMBER>` | Displays match statistics and rules for a specific ACL. |
| `show ip interface <interface-id>` | Crucial: Displays which ACL is applied to an interface and in which direction (Inbound / Outbound). |
| `show running-config | section access-list` | Filters active configuration to display all ACL definitions. |
| `clear access-list counters [<NAME>]` | Resets packet match counters back to 0 for testing and validation. |
