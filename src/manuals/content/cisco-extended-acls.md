> Concept map: Extended ACL decision flow
>
> 01 Match source and destination
>
> 02 Match protocol and port
>
> 03 Apply in the correct direction

## $ Extended ACL Configuration

NUMBERED AND NAMED EXTENDED ACLS FILTER BY SOURCE, DESTINATION, PROTOCOL, AND PORT

### Option 1: Numbered Extended ACL

```
Router# configure terminal
```

```
Router(config)# access-list 100 permit tcp 192.168.10.0 0.0.0.255 host 192.168.20.10 eq 80
```

```
Router(config)# access-list 100 deny ip any any
```

```
Router(config)# interface GigabitEthernet0/0
```

```
Router(config-if)# ip access-group 100 in
```

### Option 2: Named Extended ACL

```
Router# configure terminal
```

```
Router(config)# ip access-list extended ALLOW_WEB
```

```
Router(config-ext-nacl)# permit tcp 192.168.10.0 0.0.0.255 host 192.168.20.10 eq 443
```

```
Router(config-ext-nacl)# deny ip any any
```

```
Router(config-ext-nacl)# exit
```

```
Router(config)# interface GigabitEthernet0/1
```

```
Router(config-if)# ip access-group ALLOW_WEB out
```

### Option 3: Filtering Multiple Ports in One ACL

```
Router# configure terminal
```

```
Router(config)# ip access-list extended LIMIT_MGMT
```

```
Router(config-ext-nacl)# permit tcp 192.168.30.0 0.0.0.255 any eq 22
```

```
Router(config-ext-nacl)# permit tcp 192.168.30.0 0.0.0.255 any eq 23
```

```
Router(config-ext-nacl)# deny tcp any any eq 22
```

```
Router(config-ext-nacl)# permit ip any any
```

### Configuration Persistence

```
Router# copy running-config startup-config
```

Every ACL ends with an implicit deny ip any any
even though it is invisible in the config. If the goal is to block only specific
traffic, the ACL must end with an
explicit permit ip any any statement —
otherwise, all other traffic silently drops.

## $ Technical Deep-Dive (CCNA Concepts)

### A. Extended vs. Standard: Matching Source AND Destination

Extended ACLs match on
source AND destination address plus protocol
and port, unlike standard ACLs which only match on source. This is also why placement
differs: extended ACLs should sit as close to the
traffic source as possible — the exact opposite of standard ACLs, which sit
close to the destination. Since an extended ACL can already tell exactly which traffic
to drop, there is no reason to let it cross the whole network first.

### B. Wildcard Masks & Port Keywords

Wildcard masks are the inverse of a subnet mask:
a 0 bit means "must match" and a
1 bit means "don't care". Port-matching keywords
include eq, gt,
lt, range, and
established (for matching return TCP traffic that
already belongs to an existing session).

### C. Placement Strategy & the Implicit Deny

Reinforce the source-side placement principle
for extended ACLs and the implicit deny ip any any
behavior that terminates every ACL. The best practice is to end every ACL with an
explicit statement so the security intent is
unambiguous to the next person reading the config.

## $ Operational Verification

ESSENTIAL CCNA COMMANDS FOR CONFIRMING EXTENDED ACL OPERATION

| Verification Command | Purpose / What to Look For |
| --- | --- |
| `show access-lists` | Shows all configured ACLs with per-line match counters that increment every time a rule is hit. |
| `show ip interface gi0/0` | Shows which ACLs are applied inbound/outbound on that specific interface. |
| `show running-config | section access-list` | Displays the raw ACL definition from the running configuration. |
