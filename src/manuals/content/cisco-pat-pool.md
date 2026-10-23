> Concept map: PAT using a pool
>
> 01 Select inside sources
>
> 02 Allocate pool address
>
> 03 Overload transport ports

## $ Port Address Translation Overview

Port Address Translation (PAT) extends
dynamic NAT by mapping multiple inside local addresses to a shared pool of
inside global addresses, distinguishing each session by its
source port. The
overload keyword on the mapping enables
this many-to-one translation behavior.

Traffic permitted by the access-list is
eligible for translation. Addresses are drawn from the defined
NAT pool, and the router tracks each
translated flow in its NAT translation table so return traffic is correctly
demultiplexed back to the original inside host.

ACL 1   POOL POOL1   TYPE OVERLOAD

## $ Configuration Steps

### Step 1 — Define Inside Interface

// Define the inside
interface(s) connected to the internal network.

```
int g0/1
```

```
ip nat inside
```

### Step 2 — Define Outside Interface

// Define the outside
interface(s) connected to the external network.

```
int g0/0
```

```
ip nat outside
```

```
exit
```

### Step 3 — Define Traffic to Translate

// Define the traffic that should be translated.
Traffic permitted by this ACL will be translated.

```
access-list 1 permit 192.168.0.0 0.0.0.255
```

### Step 4 — Define the NAT Pool

// Define the pool of inside global IP addresses.
You can define the subnet size using either the
prefix-length or the
netmask keyword.

```
ip nat pool POOL1 100.0.0.0 100.0.0.3 prefix-length 24
```

```
ip nat pool POOL1 100.0.0.0 100.0.0.3 netmask 255.255.255.0
```

### Step 5 — Configure PAT Mapping

// Configure PAT by mapping the ACL to the pool
and using the overload keyword at the end.

```
ip nat inside source list 1 pool POOL1 overload
```

### Step 6 — Verify NAT Translations

EXECUTE FROM PRIVILEGED EXEC MODE (R1#) TO CONFIRM PAT POOL OPERATION

| Command | Purpose / Exam Notes |
| --- | --- |
| `show ip nat translations` | Display all active NAT/PAT translations. Confirms the pool overload mapping is working. |
| `show ip nat statistics` | Show total active translations, peak counts, and hit/miss statistics. |

## $ Key Configuration Pointers & Checklist

To ensure your PAT setup functions correctly in production or Packet Tracer, keep these essential rules in mind:

- **Subinterface NAT Configuration:**  ip nat inside must be explicitly applied to
  *every* subinterface individually—subinterfaces do
  **not** inherit NAT settings from the physical parent interface.
- **Access Control List (ACL):**
  You must configure an ACL to explicitly define and permit the internal IP ranges
  that require translation.
- **NAT Overload Keyword:**
  The overload keyword must be included at the
  end of the NAT mapping command to enable Port Address Translation (PAT) rather than
  standard 1-to-1 Static NAT.
- **Default Route:**
  A valid default route (e.g., ip route 0.0.0.0 0.0.0.0 ...)
  must be configured on the router pointing toward your ISP/outside gateway so
  non-local traffic knows where to go.
