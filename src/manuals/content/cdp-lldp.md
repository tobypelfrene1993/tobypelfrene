## $ Why this matters

CDP and LLDP advertise local device information to directly connected neighbors, helping engineers discover topology and validate cabling.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: CDP & LLDP Neighbor Discovery
>
> 01 CDP
>
> 02 LLDP
>
> 03 Scope

01

### CDP

CDP is Cisco-proprietary and commonly enabled on Cisco interfaces by default, subject to platform and configuration.

02

### LLDP

LLDP is vendor-neutral and supports multi-vendor neighbor discovery.

03

### Scope

Discovery advertisements stay on the local link. They do not replace a documented topology or prove end-to-end reachability.

| Concept | What to remember in a lab or exam |
| --- | --- |
| CDP | CDP is Cisco-proprietary and commonly enabled on Cisco interfaces by default, subject to platform and configuration. |
| LLDP | LLDP is vendor-neutral and supports multi-vendor neighbor discovery. |
| Scope | Discovery advertisements stay on the local link. They do not replace a documented topology or prove end-to-end reachability. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Discovery is one hop only

CDP and LLDP exchange information with directly connected neighbours. They are excellent for identifying the local peer, interface and platform but do not prove reachability beyond that link.

NOTE\_02

### Choose the interoperable protocol deliberately

CDP is Cisco-proprietary. LLDP is the vendor-neutral standard and is therefore preferred for multi-vendor environments where the same discovery information must cross platform boundaries.

NOTE\_03

### Use but do not overtrust the output

Neighbour detail output supports cabling validation and topology documentation. Treat exposed platform and address information appropriately, especially on untrusted access ports.

### Apply the model

1. **Step 1 — Discovery is one hop only.** CDP and LLDP exchange information with directly connected neighbours. They are excellent for identifying the local peer, interface and platform but do not prove reachability beyond that link.
2. **Step 2 — Choose the interoperable protocol deliberately.** CDP is Cisco-proprietary. LLDP is the vendor-neutral standard and is therefore preferred for multi-vendor environments where the same discovery information must cross platform boundaries.
3. **Step 3 — Use but do not overtrust the output.** Neighbour detail output supports cabling validation and topology documentation. Treat exposed platform and address information appropriately, especially on untrusted access ports.

## $ Discovery scope and the CDP versus LLDP decision

Both protocols are Layer 2 neighbour-discovery protocols. They send frames to a multicast MAC address; the directly connected neighbour processes and discards the frame, so it is never forwarded beyond one link. The advertisements can reveal topology and platform information, so enable them only where that disclosure is acceptable.

| Property | CDP | LLDP |
| --- | --- | --- |
| Standard | Cisco proprietary | IEEE 802.1AB industry standard |
| Default on Cisco | Enabled globally and on interfaces | Usually disabled |
| Multicast MAC | 0100.0CCC.CCCC | 0180.C200.000E |
| Advertisement / hold | 60 seconds / 180 seconds | 30 seconds / 120 seconds |
| Multi-vendor use | Cisco-to-Cisco | Preferred |
| Interface control | Enabled or disabled as one feature | Transmit and receive are independent |

## $ Read neighbour output correctly

show cdp neighbors and show lldp neighbors report direct peers only. Local Interface is the port on the device where you run the command; Port ID is the remote peer’s port. For CDP, holdtime counts down and is refreshed by a new advertisement. LLDP summary shows the configured holdtime; detail output shows remaining time.

```
show cdp
show cdp traffic
show cdp interface
show cdp neighbors detail
show cdp entry R2
```

Checks global status, counters, interface state, all detailed neighbours or one named neighbour.

```
show lldp
show lldp traffic
show lldp interface
show lldp neighbors detail
show lldp entry SW1
```

Uses the equivalent LLDP verification flow.

## $ Configuration, capabilities and security boundary

CDP capability output may show R for router and S for switch. LLDP represents a switch as B (bridge), not S. CDP can expose Cisco-specific VTP data; LLDP cannot. LLDP System Capabilities means what a device supports, while Enabled Capabilities means what it actively uses.

```
cdp run
interface g0/0
 cdp enable
cdp timer 60
cdp holdtime 180
```

Enables or tunes CDP globally and per interface; use no forms to disable.

```
lldp run
interface g0/0
 lldp transmit
 lldp receive
lldp timer 30
lldp holdtime 120
```

Enables LLDP globally and both directions on a selected interface; transmit and receive can be controlled separately.

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
show cdp neighbors detail
```

Displays detailed CDP information for directly connected Cisco neighbors.

```
show lldp neighbors detail
```

Displays detailed LLDP neighbor information when LLDP is enabled.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

CDP is Cisco-specific; LLDP is the interoperable standard. Both are Layer 2 discovery mechanisms and do not cross routers.
