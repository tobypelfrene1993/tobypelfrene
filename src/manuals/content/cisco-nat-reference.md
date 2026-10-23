> Concept map: NAT translation choices
>
> 01 Inside and outside terms
>
> 02 One-to-one translation
>
> 03 PAT overload

## $ Why NAT Exists

PRIVATE ADDRESSING, PUBLIC REACHABILITY & SOURCE TRANSLATION

Private IPv4 addresses can be reused inside independent networks, but they are not globally routable. A NAT router translates an inside host's private source address to an address that is valid on the outside network.

| Private range | CIDR | Typical use |
| --- | --- | --- |
| `10.0.0.0 - 10.255.255.255` | /8 | Large private networks |
| `172.16.0.0 - 172.31.255.255` | /12 | Medium private networks |
| `192.168.0.0 - 192.168.255.255` | /16 | Home and small private networks |

### The Four NAT Address Terms

| Term | Meaning | Example |
| --- | --- | --- |
| Inside local | Inside host address as known on the internal network. | `192.168.0.167` |
| Inside global | Inside host address as known on the outside network. | `100.0.0.1` |
| Outside local | Outside host address as known from inside. | `8.8.8.8` |
| Outside global | Outside host address as known on the outside network. | `8.8.8.8` |

Without destination NAT, the outside local and outside global addresses are normally identical. NAT's most common CCNA use is translating an inside local address into an inside global address.

## $ Static NAT: Permanent One-to-One Mappings

ONE INSIDE HOST, ONE FIXED INSIDE GLOBAL ADDRESS

Static NAT creates a fixed, manual mapping. It is useful when an inside host needs a predictable outside address, but it does not conserve public IPv4 addresses: each mapped inside host needs its own inside global address.

### Configuration Order

// Mark the internal-facing interface as inside and the Internet-facing interface as outside.

```
interface g0/1
```

```
ip nat inside
```

```
interface g0/0
```

```
ip nat outside
```

```
ip nat inside source static 192.168.0.167 100.0.0.1
```

```
ip nat inside source static 192.168.0.168 100.0.0.2
```

The inside global addresses must be addresses assigned to your organization or valid addresses from the relevant provider. Do not select an arbitrary public range.

## $ Dynamic NAT: Select Traffic, Allocate from a Pool

ACL SELECTS THE SOURCE TRAFFIC; THE POOL PROVIDES INSIDE GLOBAL ADDRESSES

Dynamic NAT automatically allocates an available address from a pool to traffic selected by an ACL. It remains one-to-one while active: every active inside host consumes one pool address.

The ACL is a NAT selection tool here. A denied source is excluded from translation; it is not automatically dropped unless that ACL is also applied as an interface security policy.

### Dynamic NAT Configuration

```
access-list 1 permit 192.168.0.0 0.0.0.255
```

```
ip nat pool POOL1 100.0.0.0 100.0.0.255 prefix-length 24
```

```
ip nat inside source list 1 pool POOL1
```

// IOS also accepts netmask 255.255.255.0 instead of prefix-length 24. The pool start and end addresses must be in the same subnet.

## $ PAT / NAT Overload: Many Hosts, Shared Public Address

PORT NUMBERS IDENTIFY SIMULTANEOUS FLOWS

PAT, also called NAT overload, lets multiple inside hosts share one inside global address. The router uses TCP or UDP source ports to keep their flows distinct. This is the common model for Internet access from a home or enterprise LAN.

### PAT Using a Pool

```
ip nat pool POOL1 100.0.0.0 100.0.0.3 prefix-length 24
```

```
ip nat inside source list 1 pool POOL1 overload
```

### PAT Using the Outside Interface Address

```
ip nat inside source list 1 interface g0/0 overload
```

This method uses the current address configured on g0/0 as the inside global address. It avoids defining a separate pool and is commonly used when a router has one public WAN address.

## $ Compare NAT Forms & Verify Operation

| Form | Mapping | Public address use | Typical purpose |
| --- | --- | --- | --- |
| Static NAT | Manual, fixed one-to-one | One address per inside host | Predictable outside reachability |
| Dynamic NAT | Automatic, one-to-one from pool | One pool address per active host | Temporary use of a public pool |
| PAT / overload | Flow-based, many-to-one possible | Many hosts can share one address | Internet access for many inside hosts |

### Operational Verification

| Command | What it confirms |
| --- | --- |
| `show ip nat translations` | Inside and outside local/global addresses, active protocol entries, and port mappings. |
| `show ip nat statistics` | Inside/outside interfaces, translation counters, hits/misses, and dynamic mapping or pool state. |
| `clear ip nat translation *` | Clears dynamic translations for testing. Permanent static mappings remain until removed from configuration. |

```
show ip nat translations
```

```
show ip nat statistics
```

```
clear ip nat translation *
```
