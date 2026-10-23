> Concept map: Static route selection
>
> 01 Destination prefix
>
> 02 Next hop or exit interface
>
> 03 Backup administrative distance

## $ Introduction & CCNA Fundamentals

A static route is a route that an administrator
configures manually on the router. Unlike dynamic protocols (OSPF, EIGRP), it does not
learn or advertise paths on its own — the router simply follows the entries you type in.

Static routes shine in small networks,
hub-and-spoke topologies, and
stub networks where only one path exists to a
destination. They are also the standard way to implement a
default gateway forwarder for the whole network.

### Administrative Distance (AD)

Every route has a numeric trust value called the
Administrative Distance (AD). The lower the AD,
the more trustworthy the source of the route. A directly connected interface is AD
0, and a manual static route is AD
1 by default — the highest
trust ranking available to a manually configured path.

## $ General Syntax Breakdown

THE CORE STATIC ROUTE COMMAND USED IN GLOBAL CONFIGURATION MODE

```
Router(config)# ip route <destination-network> <subnet-mask> {next-hop-ip | exit-interface} [distance]
```

### Anatomy of the Command

// destination-network — the target subnet prefix you want to reach
(e.g., 192.168.20.0).

// subnet-mask — the mask of that destination subnet
(e.g., 255.255.255.0 for /24).

// next-hop-ip — the IP of the adjacent router that will carry the traffic
onward, OR exit-interface — the local interface out which the router
should send the packet.

// distance — an optional Administrative Distance override.
Omit it for the default AD 1; supply a higher value to build a
floating backup route.

## $ Complete CLI Command Blocks

SEQUENTIAL COMMANDS COVERING ALL FOUR STATIC ROUTE TYPES AND THE SAVE

### Option 1: Standard Next-Hop Static Route

```
Router# configure terminal
```

```
Router(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.2
```

### Option 2: Directly Connected Exit Interface Static Route

```
Router# configure terminal
```

```
Router(config)# ip route 192.168.30.0 255.255.255.0 GigabitEthernet0/0/1
```

### Option 3: Default Static Route (Gateway of Last Resort)

```
Router# configure terminal
```

```
Router(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2
```

### Option 4: Floating Static Route (Backup Route)

```
Router# configure terminal
```

```
Router(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.6 130
```

### Configuration Persistence

```
Router# copy running-config startup-config
```

Commands entered in global configuration mode only change the
running configuration. Without the final
copy running-config startup-config, every static route is
lost on the next reload.

## $ Technical Deep-Dive (CCNA Concepts)

### A. Next-Hop IP vs. Exit Interface

Next-Hop IP is the best practice on
multi-access broadcast networks (Ethernet). The router performs
a recursive lookup: it consults the routing table again to find
the exit interface for the next-hop address, then resolves the MAC address via
ARP.

Exit Interface is best for
point-to-point links (Serial / HDLC). It eliminates the
recursive lookup entirely because the outgoing interface is declared directly. On Ethernet,
however, an exit-interface static route can cause
ARP table bloat if proxy ARP is enabled, since the router
proxies ARP requests for every destination using that route.

### B. Default Static Route (0.0.0.0 0.0.0.0)

The quad-zero notation
(0.0.0.0 0.0.0.0) represents a
/0 prefix: a network and mask of all zeros that matches
any destination address. This route catches everything not
explicitly listed in the routing table and becomes the router's
Gateway of Last Resort.

### C. Floating Static Route & Administrative Distance

By setting an Administrative Distance higher than the primary
route (e.g., AD 130 versus the default
AD 1), the backup route stays
hidden from the routing table while the primary path is alive.
Only when the primary route drops out of the table does the floating route become visible and take
over forwarding — the simplest form of automatic failover.

## $ Operational Verification Table

ESSENTIAL CCNA COMMANDS FOR CONFIRMING STATIC ROUTE OPERATION

| Verification Command | Purpose / What to Look For |
| --- | --- |
| `show ip route` | View the full routing table. Look for the `S` code for static routes and `S*` for candidate default routes. |
| `show ip route static` | Filter the routing table to display only statically configured routes. |
| `show ip route 192.168.20.1` | Perform a specific route lookup to see which next-hop or exit interface handles a target IP. |
| `ping 192.168.20.1` | Verify end-to-end Layer 3 reachability. |
| `traceroute 192.168.20.1` | Trace the path hop-by-hop to confirm traffic uses the expected static next-hop. |
