> Concept map: Physical interface selection
>
> 01 Interface type
>
> 02 Cable and connector
>
> 03 Link capability

## $ Physical Interfaces & Connectors

LAYER 1 HARDWARE — PORTS, PROTOCOLS & SPEED UNITS

### Switch & Router Interface Types

Switches typically have many
RJ-45 ports — used for connecting end hosts
like PCs and servers — plus a handful of
SFP (Small Form-factor Pluggable) slots for fiber
uplinks. Routers typically have
fewer RJ-45 ports and more SFP-style interfaces,
since routers usually connect network segments rather than large numbers of end hosts
directly.

### What Is Ethernet?

Ethernet is a family of protocols and standards,
not a single protocol — all defined under
IEEE 802.3 (IEEE = Institute of Electrical and
Electronics Engineers). Standards exist so that different vendors’ cables,
connectors, and equipment are guaranteed to
interoperate — both physical standards (connectors, cabling) and logical
standards (like IP) serve this same purpose.

### Measuring Network Speed

Network speed is always measured in bits per second,
never bytes per second. Storage capacity is measured in bytes; a
gigabyte is
8 times larger than a gigabit — a common
point of confusion.

Speed reference units — the bit prefixes
used in every network speed:

| Unit | Equals |
| --- | --- |
| `1 kilobit` | 1,000 bits |
| `1 megabit` | 1,000,000 bits |
| `1 gigabit` | 1,000,000,000 bits |
| `1 terabit` | 1,000,000,000,000 bits |

## $ Copper Ethernet Standards (IEEE 802.3)

TWISTED-PAIR COPPER — FROM 10BASE-T TO 10GBASE-T

### The Copper Standards Table

Every copper standard tops out at 100 meters
— that’s the defined limit for twisted-pair cabling regardless of speed:

| Speed | Common Name | IEEE Standard | Informal Name | Max Cable Length |
| --- | --- | --- | --- | --- |
| 10 Mbps | Ethernet | `802.3i` | `10BASE-T` | 100 meters |
| 100 Mbps | Fast Ethernet | `802.3u` | `100BASE-T` | 100 meters |
| 1 Gbps | Gigabit Ethernet | `802.3ab` | `1000BASE-T` | 100 meters |
| 10 Gbps | 10 Gigabit Ethernet | `802.3an` | `10GBASE-T` | 100 meters |

### UTP Cabling & Pin Usage

UTP (Unshielded Twisted Pair) has
4 twisted pairs (8 wires total); the twisting
protects against EMI (ElectroMagnetic
Interference) despite having no metallic shielding.
10BASE-T and
100BASE-T use only
2 of the 4 pairs (pins 1 & 2 and
3 & 6); 1000BASE-T and
10GBASE-T use
all 4 pairs (also pins 4 & 5 and
7 & 8), and at those higher speeds each pair is
bidirectional rather than fixed to transmit-only
or receive-only.

### Straight-Through vs. Crossover Cables

Devices transmit and receive on different pin pairs, which determines which cable
type connects them:

| Device | Transmits On | Receives On |
| --- | --- | --- |
| Router | Pins 1 & 2 | Pins 3 & 6 |
| Firewall | Pins 1 & 2 | Pins 3 & 6 |
| PC | Pins 1 & 2 | Pins 3 & 6 |
| Switch | Pins 3 & 6 | Pins 1 & 2 |

A straight-through cable (pin 1↔1,
2↔2, etc.) connects devices with
opposite transmit/receive behavior —
PC-to-switch, switch-to-router. A crossover
cable (pins 1 & 2 swap with 3 & 6) connects devices with
identical transmit/receive behavior —
router-to-router, switch-to-switch, PC-to-PC, and PC-to-router (since both PC and
router transmit on 1 & 2).

### Auto MDI-X

Modern network interfaces automatically detect which pins a connected neighbor
transmits on and adjust their own transmit/receive
roles accordingly, making the straight-through-vs-crossover distinction
irrelevant in practice on any reasonably modern
equipment — it only still matters when working with
old hardware that lacks Auto MDI-X.

## $ Fiber-Optic Cabling

LIGHT-BASED TRANSMISSION — BEYOND COPPER’S 100-METER LIMIT

### Why Fiber?

Fiber overcomes copper’s
100-meter distance limit by sending
light instead of electrical signals, via an
SFP transceiver plugged into the interface.
Unlike copper’s single RJ-45 connector, fiber cabling uses
two separate physical connectors per end —
one dedicated to transmit, one to receive.

### Fiber Cable Structure

Four layers, center to outside: the
fiber core (carries the light),
cladding (reflects the light back into the
core), a protective buffer (guards against
breakage), and the outer jacket.

### Single-Mode vs. Multimode Fiber

The two fiber types differ in core diameter, light propagation, and cost:

| Characteristic | Multimode | Single-Mode |
| --- | --- | --- |
| Core Diameter | Wider | Narrower |
| Light Modes | Multiple angles | One angle (laser) |
| Transmitter Type | Cheaper, usually LED | More expensive, laser-based |
| Max Distance | Longer than UTP, shorter than single-mode | Longest distances possible |
| Cost | Cheaper than single-mode | More expensive |

### The Fiber Standards Table

Fiber standards cover far longer distances than copper — from 400 meters up
to 30 kilometers:

| Standard | IEEE Standard | Speed | Fiber Type | Max Cable Length |
| --- | --- | --- | --- | --- |
| `1000BASE-LX` | `802.3z` | 1 Gbps | Multimode or Single-mode | 550 m (multimode) / 5 km (single-mode) |
| `10GBASE-SR` | `802.3ae` | 10 Gbps | Multimode | 400 m |
| `10GBASE-LR` | `802.3ae` | 10 Gbps | Single-mode | 10 km |
| `10GBASE-ER` | `802.3ae` | 10 Gbps | Single-mode | 30 km |

## $ Choosing the Right Cable

COPPER VS. FIBER — MATCH THE MEDIUM TO THE SCENARIO

### Copper vs. Fiber Comparison

The full trade-off picture across cost, distance, and security:

| Characteristic | UTP (Copper) | Fiber |
| --- | --- | --- |
| Cost | Cheaper | More expensive |
| Max Distance | ~100 meters | Much longer (up to 550 m / 5 km / 10 km / 30 km, depending on standard) |
| EMI Vulnerability | Yes (partially protected by pair twisting) | No |
| Port Cost | RJ-45 = cheaper | SFP = more expensive (single-mode costlier than multimode) |
| Signal Leakage / Security Risk | Weak signal detectable outside the cable — a possible security risk | No signal leaks outside the cable — no equivalent risk |

### Practical Selection Guidance

Connecting many end hosts to a switch on the same floor →
UTP (cheapest, matches standard NIC/switch
ports). Connecting two buildings ~150 meters apart on a budget →
multimode fiber (UTP can’t reach that
distance, single-mode costs more than needed). Connecting two offices several
kilometers apart → single-mode fiber
(the only option that reaches that distance, despite the higher cost).
