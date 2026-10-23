## $ Why this matters

FHRPs prevent a single default-gateway router from becoming a host outage by presenting a shared virtual gateway identity to the LAN.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: First Hop Redundancy Protocols (FHRP)
>
> 01 Virtual gateway
>
> 02 Active and standby
>
> 03 Preemption and tracking

01

### Virtual gateway

Hosts use one virtual IP address as default gateway. Active and standby routers cooperate so a backup can take over the same gateway identity.

02

### Active and standby

One router forwards gateway traffic in normal operation; another monitors and can assume the active role after a failure.

03

### Preemption and tracking

Preemption can restore a preferred router to active status. Object tracking can lower priority when an upstream link fails.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Virtual gateway | Hosts use one virtual IP address as default gateway. Active and standby routers cooperate so a backup can take over the same gateway identity. |
| Active and standby | One router forwards gateway traffic in normal operation; another monitors and can assume the active role after a failure. |
| Preemption and tracking | Preemption can restore a preferred router to active status. Object tracking can lower priority when an upstream link fails. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### A virtual gateway removes one host-side failure

Hosts use one default-gateway address, while multiple routers cooperate to provide it. If the active router fails, another router takes over the virtual address and MAC.

NOTE\_02

### Roles matter during normal operation

FHRP designs normally have an active router forwarding for the group and a standby candidate. Priority, preemption and tracking influence which device owns the virtual gateway.

NOTE\_03

### Test the failure path

A redundant gateway is only useful when failover is verified. Check group state, virtual IP/MAC, host default gateway and behaviour after a controlled active-router or upstream failure.

### Apply the model

1. **Step 1 — A virtual gateway removes one host-side failure.** Hosts use one default-gateway address, while multiple routers cooperate to provide it. If the active router fails, another router takes over the virtual address and MAC.
2. **Step 2 — Roles matter during normal operation.** FHRP designs normally have an active router forwarding for the group and a standby candidate. Priority, preemption and tracking influence which device owns the virtual gateway.
3. **Step 3 — Test the failure path.** A redundant gateway is only useful when failover is verified. Check group state, virtual IP/MAC, host default gateway and behaviour after a controlled active-router or upstream failure.

## $ A virtual default gateway

First Hop Redundancy Protocols avoid a single router failure at the host default gateway. Multiple routers present one virtual IP address and virtual MAC address; hosts use the virtual address, not the physical address of one particular router.

| Role | Operational responsibility |
| --- | --- |
| Active router | Currently forwards traffic for the virtual gateway. |
| Standby router | Monitors the group and can assume active forwarding after failure. |
| Virtual IP/MAC | Stable gateway identity configured on hosts. |
| Priority / preemption / tracking | Influence which router owns the active role and whether it regains it after recovery. |

## $ Failure testing and verification

FHRP only improves availability when the failover path is tested. Verify group state, virtual address, host default gateway and upstream reachability. Interface tracking can lower priority when an upstream path fails, preventing a router from staying active while disconnected from the rest of the network.

```
show standby brief
show standby
```

Verifies HSRP group state, active/standby router, priority and virtual address.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show standby brief
```

Shows HSRP groups, virtual addresses and active/standby roles.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

FHRP protects the first hop only. It does not replace redundant switching, dynamic routing or end-to-end path resilience.
