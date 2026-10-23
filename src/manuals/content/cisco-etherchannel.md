> Concept map: EtherChannel link aggregation
>
> 01 Member links
>
> 02 Logical port-channel
>
> 03 LACP or PAgP negotiation

## $ EtherChannel Configuration

THREE METHODS FOR BUNDLING PHYSICAL INTERFACES INTO ONE LOGICAL LINK

### Option 1: PAgP EtherChannel (Cisco Proprietary)

PAgP (Port Aggregation Protocol) is
Cisco-proprietary — it only works between
Cisco switches. It negotiates channel formation dynamically. Two PAgP modes exist:
desirable actively tries to form a channel, while
auto only forms one if the other side is desirable.
auto paired with auto does NOT form a channel
because neither side initiates negotiation.

```
interface range FastEthernet0/1-2
```

```
channel-group 1 mode desirable
```

### Option 2: LACP EtherChannel (Industry Standard)

LACP (Link Aggregation Control Protocol,
802.3ad) is an IEEE industry standard, so it works
across vendors — which is why it is the preferred method and the only one listed
on the official CCNA exam topics. Two LACP modes exist:
active actively tries to form a channel, while
passive only forms one if the other side is active.
passive paired with passive does NOT form a channel
because neither side initiates negotiation.

```
interface range FastEthernet0/1-2
```

```
channel-group 1 mode active
```

### Option 3: Static EtherChannel (No Negotiation)

With static EtherChannel, no negotiation protocol
is used at all — both sides must be manually set to
on. This is generally avoided in practice because
the switch won’t automatically remove a failing member interface the way PAgP
or LACP can, which can lead to traffic black-holing if a cable or port fails silently.

```
interface range FastEthernet0/1-2
```

```
channel-group 1 mode on
```

### Configuring the Port-Channel Interface

Once an EtherChannel is formed (via any of the three methods), the logical
port-channel interface is configured directly.
Settings like trunk mode applied here propagate
automatically to the underlying physical member interfaces, which is confirmable
via show running-config.

```
interface port-channel 1
```

```
switchport mode trunk
```

### Layer 3 EtherChannel

A Layer 3 EtherChannel removes Spanning Tree
from that link entirely, since routed ports don’t forward Layer 2 broadcasts.
Apply no switchport to the member interfaces
before channel-group, turning them into routed
ports. The IP address is then configured on the
port-channel interface itself, never on the
individual members.

```
interface range GigabitEthernet0/0-3
```

```
no switchport
```

```
channel-group 1 mode active
```

```
interface port-channel 1
```

```
ip address 10.0.0.1 255.255.255.0
```

## $ Technical Deep-Dive (CCNA Concepts)

### A. The Problem EtherChannel Solves

Without EtherChannel, adding multiple parallel physical links between two switches
doesn’t help: Spanning Tree Protocol blocks
all but one of them to prevent a Layer 2 loop, so congestion doesn’t improve no
matter how many extra links get added. EtherChannel groups those physical interfaces
into one logical interface; STP then treats the
whole group as a single link, so every member can forward — delivering both
extra bandwidth and
redundancy.

### B. Load Balancing by Flow

Traffic is balanced across member interfaces based on
“flows” (a conversation between two
endpoints). Every frame within the same flow always uses the same physical member,
to avoid frames arriving out of order. The balancing algorithm can key off
source/destination MAC address,
source/destination IP address, or (on some
switches) Layer 4 port numbers.

The keyword to configure the method is
port-channel load-balance \<method>, but the
keyword to view it is
show etherchannel load-balance — genuinely
different words for the same concept, and a common exam mix-up.

### C. Matching Member Interface Configuration

Member interfaces must match on speed,
duplex, and (if trunking) both
allowed VLANs and
native VLAN. A mismatched interface doesn’t
break the whole EtherChannel — it just gets
excluded from it.

Valid and invalid mode combinations —
directly exam-tested content:

| Protocol | Mode Pairing | Result |
| --- | --- | --- |
| `PAgP` | desirable + desirable | ✓ Forms channel |
| `PAgP` | desirable + auto | ✓ Forms channel |
| `PAgP` | auto + auto | ✗ No channel |
| `LACP` | active + active | ✓ Forms channel |
| `LACP` | active + passive | ✓ Forms channel |
| `LACP` | passive + passive | ✗ No channel |
| `Static` | on + on | ✓ Forms channel |
| `Never valid` | Mixing across protocols (e.g. active + desirable, on + desirable) | ✗ No channel |

Maximum 8 active interfaces per EtherChannel
(LACP allows configuring up to 16, with the extra 8 in standby).

## $ Operational Verification

ESSENTIAL CCNA COMMANDS FOR CONFIRMING ETHERCHANNEL STATE

| Verification Command | Purpose / What to Look For |
| --- | --- |
| `show etherchannel summary` | The most useful command. Flags: `S` = Layer 2/switchport, `R` = Layer 3/routed port, `U` = in use, `D` = down, `P` = (member) properly bundled, lowercase `s` = suspended due to mismatched configuration. |
| `show etherchannel port-channel` | More detail, including the configured channel mode (e.g. `active`) that summary doesn’t show. |
| `show etherchannel load-balance` | Shows the current load-balancing method (e.g. src-mix, dst-ip, src-dst-ip). |
| `show spanning-tree` | After EtherChannel configuration, only the `port-channel` interface appears, not the individual physical members — confirms STP treats the group as one logical interface. |
| `show ip interface brief` | Shows the `port-channel` interface and its IP address (for a Layer 3 EtherChannel). |
| `show interfaces trunk` | Shows the `port-channel` interface as the trunk; individual member interfaces are not listed separately. |
