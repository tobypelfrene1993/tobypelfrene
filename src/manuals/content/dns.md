## $ Why this matters

DNS maps names to network information so applications can use stable human-readable names instead of requiring users to remember addresses.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: DNS Fundamentals
>
> 01 Hierarchy
>
> 02 Record types
>
> 03 Resolution

01

### Hierarchy

The DNS namespace is hierarchical: root, top-level domains, authoritative domains and individual records.

02

### Record types

A and AAAA map names to IPv4 and IPv6 addresses; CNAME aliases a name; MX identifies mail exchangers; PTR supports reverse lookup.

03

### Resolution

A recursive resolver obtains or caches an answer for a client. Caching improves speed but means changes may not appear until TTLs expire.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Hierarchy | The DNS namespace is hierarchical: root, top-level domains, authoritative domains and individual records. |
| Record types | A and AAAA map names to IPv4 and IPv6 addresses; CNAME aliases a name; MX identifies mail exchangers; PTR supports reverse lookup. |
| Resolution | A recursive resolver obtains or caches an answer for a client. Caching improves speed but means changes may not appear until TTLs expire. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Resolution follows a hierarchy

Resolvers obtain answers from a hierarchy of root, top-level-domain and authoritative servers, then cache them according to TTL. Caching improves speed but means record changes are not instantly visible everywhere.

NOTE\_02

### Match the record to the question

A maps a name to IPv4, AAAA to IPv6, CNAME aliases a name, MX identifies mail exchangers and PTR supports reverse lookup. A successful answer only proves name resolution.

NOTE\_03

### Separate lookup from application testing

If a hostname resolves but a service fails, continue with reachability, transport ports, policy and application checks. DNS is one dependency in the connection path, not the whole path.

### Apply the model

1. **Step 1 — Resolution follows a hierarchy.** Resolvers obtain answers from a hierarchy of root, top-level-domain and authoritative servers, then cache them according to TTL. Caching improves speed but means record changes are not instantly visible everywhere.
2. **Step 2 — Match the record to the question.** A maps a name to IPv4, AAAA to IPv6, CNAME aliases a name, MX identifies mail exchangers and PTR supports reverse lookup. A successful answer only proves name resolution.
3. **Step 3 — Separate lookup from application testing.** If a hostname resolves but a service fails, continue with reachability, transport ports, policy and application checks. DNS is one dependency in the connection path, not the whole path.

## $ Resolution flow, records and transport

DNS translates names into addresses before an application creates its connection. The client asks its configured DNS server; the reply is then used for the actual IP connection. A successful lookup proves only name resolution, not that the destination service is reachable.

| Item | Purpose | CCNA detail |
| --- | --- | --- |
| A record | Hostname to IPv4 address | Example: youtube.com → IPv4 address. |
| AAAA record | Hostname to IPv6 address | Pronounced “quadruple A”. |
| CNAME | Alias to another name | The alias is resolved through its canonical name. |
| DNS transport | Carries DNS query and response | Usually UDP/53; TCP/53 is used for larger messages, including the source example above 512 bytes. |

## $ Client verification, caching and local overrides

A Windows endpoint usually receives DNS server information manually or through DHCP. ipconfig /all exposes the configured server. nslookup sends an explicit lookup request; ping hostname triggers resolution automatically when needed. DNS cache speeds repeat lookups, while a hosts file can override normal lookup locally.

```
ipconfig /all
```

Shows the client IPv4/IPv6 settings and configured DNS server addresses.

```
nslookup example.com
```

Queries the configured DNS server and displays the returned answer.

```
show hosts
```

Displays Cisco IOS hostname information and cached results.

## $ Cisco IOS as a DNS client or server

A router that merely forwards a client DNS packet is neither a DNS client nor DNS server. IOS becomes a DNS client when its own CLI resolves names through configured name servers. It can also answer from statically configured host entries when used as a basic DNS server in a lab.

```
ip name-server 192.0.2.53
ip domain lookup
```

Configures a DNS resolver and permits IOS name lookups.

```
ip host server1 192.0.2.10
```

Creates a static hostname entry for local resolution.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
ip name-server 192.0.2.53
```

Configures an IPv4 DNS server for Cisco IOS name lookups.

```
show hosts
```

Shows configured and cached hostname information on Cisco IOS.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

DNS can resolve a name successfully while the application remains unreachable. Name resolution and service connectivity are separate checks.
