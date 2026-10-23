> Concept map: NAT source translation
>
> 01 Inside local address
>
> 02 Translation at the edge
>
> 03 Inside global address

## $ The Concept: A Necessary Identity Change

Devices on your internal network use private IP addresses
(like 192.168.1.100). These addresses work perfectly
inside your building, but they are not routable on the public internet.
Without translation, your internal devices simply cannot reach the outside world.

The NAT router acts as a security checkpoint at the edge of
your network. It sits between your private network and the internet, and it "translates" a private
identity into a valid, public identity for every outgoing packet. This single change is what makes
internet access possible from a private LAN.

### The Passport Control Analogy

Think of your internal IP address as your driver's license:
it is a perfectly valid form of identification locally, but it is
not accepted once you travel abroad. When you want to visit the internet, the NAT router is like
passport control at the border: it takes your local driver's
license and swaps it for a temporary, globally accepted passport
(a public IP address). When you come back, your passport is swapped back for your driver's license,
and your connection is returned to your own device.

## $ Key Terminology: Inside & Outside

### Inside Network

// Your local, private internal network (e.g., your office LAN,
labeled green in the infographic).

### Outside Network

// The public network (e.g., the internet cloud, labeled
blue in the infographic).

### Inside Interface

// The router interface connected to your private network
(e.g., GigabitEthernet0/1).

### Outside Interface

// The router interface connected to the public internet
(e.g., GigabitEthernet0/0).

## $ The Packet Flow: Visualizing Translation

A standard Inside-to-Outside flow happens when an internal
computer (like PC1: 192.168.1.100) sends a packet destined
for a web server on the internet. Follow the four steps below and trace them on the infographic.

![Source NAT flow diagram: inside network (green) to outside network (blue) via the NAT translation engine on a Cisco router](https://axelhuts.be/_astro/image_7.Dld59rs9.png)

### Step 1 — Entering the Router

The packet travels from the Inside Network, arrives at the
Inside Interface (G0/1), and is processed by the
NAT engine. Its source IP is currently
192.168.1.100.

### Step 2 — Translation Engine

The router checks its NAT configuration, finds a matching
rule, and decides to translate the packet's source IP.

### Step 3 — Applying the Translation

The router swaps the original private source IP
(192.168.1.100) for a temporary, valid public source IP
(203.0.113.10).

### Step 4 — Exiting the Router

The transformed packet travels through the Outside Interface (G0/0)
and out to the Outside Network (the public internet).

## $ Verifying the Translation Table

EXECUTE FROM PRIVILEGED EXEC MODE (R1#) TO CONFIRM NAT/PAT OPERATION AND VIEW ACTIVE TRANSLATIONS

| Command | Purpose / Exam Notes |
| --- | --- |
| `show ip nat translations` | Display all active NAT/PAT translations including inside/outside local and global addresses. |
| `show ip nat statistics` | Show total active translations, peak counts, and hit/miss statistics for NAT operations. |
| `clear ip nat translation *` | Clear all dynamic translations from the table. Useful for testing and forcing re-translation. |
