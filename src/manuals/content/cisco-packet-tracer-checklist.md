> Concept map: Network build checklist
>
> 01 Plan addressing
>
> 02 Configure services
>
> 03 Verify end to end

#### A. IP ADDRESSES

☐ Which IP addresses or range am I going to use? — Define the overarching network blocks (e.g., 10.0.0.0/8 or 192.168.0.0/16) for the entire topology.

☐ Can I incorporate my VLAN ID into my IP notation to maintain overview? — For example, mapping VLAN 10 to 192.168.10.0/24 makes troubleshooting instantly intuitive.

☐ Reserved space for servers, printers, and other fixed IP devices? — Dedicate a static block outside the DHCP pool for infrastructure that shouldn't change IPs.

☐ Should / can a separate range be provided for infrastructure? — Isolating management interfaces on a dedicated management subnet enhances security.

#### B. VLANS

☐ Native VLAN created? — A non-default native VLAN prevents VLAN hopping attacks.

☐ All VLANs established? — Ensure every required VLAN exists in the local database of all switches.

#### C. ROUTER

☐ Hostname configured? — Give the device a recognizable, unique name to prevent configuration errors.

☐ MOTD banner configured? — Display a legal warning to unauthorized users attempting to log in.

☐ Are all routes set up? — Verify static routes or dynamic protocols reach all intended networks.

[Static IP & Default Routing →](https://axelhuts.be/mac/cisco-static-ip-routing)

☐ Are all floating routes set up? — Configure backup routes with a higher administrative distance for redundancy.

☐ Are IPs configured on the physical interfaces? — Ensure primary interfaces have the correct gateway addresses and are enabled.

☐ Are IPs configured on the sub-interfaces? — Assign dot1Q tags and gateway IPs for Router-on-a-Stick setups.

☐ Helper address configured for DHCP server? — Point the router to a centralized DHCP server so broadcast requests can cross subnets.

☐ NAT (PAT) settings configured? — Translate internal private IPs to external public IPs for internet access.

[📖 NAT Concepts](https://axelhuts.be/mac/cisco-nat-concepts) [⚡ PAT Pool Config](https://axelhuts.be/mac/cisco-pat-pool) [⚡ PAT Interface Config](https://axelhuts.be/mac/cisco-pat-interface)

☐ ACLs configured, and do all devices have correct access? — Apply standard or extended access lists to permit or deny specific traffic.

☐ Console line configured? — Secure physical terminal access with a password.

☐ VTY lines configured? — Secure remote Telnet/SSH access with proper authentication.

[SSH v2 Remote Access →](https://axelhuts.be/mac/cisco-ssh-remote-access)

☐ Passwords added: User EXEC? — Restrict basic read-only access to the device.

☐ Passwords added: Console line? — Require a password upon physical serial connection.

☐ Passwords added: VTY lines? — Require a password for incoming remote management sessions.

☐ Password encryption enabled? — Use service password-encryption to hide plaintext passwords in the running config.

☐ Unused ports shutdown? — Disable unneeded interfaces to minimize attack surfaces.

☐ Copy run start executed? — Save the running configuration to NVRAM so it survives a reboot.

#### D. SWITCHES

☐ Hostname configured? — Assign a clear identifier to the switch.

[Switch Baseline Guide →](https://axelhuts.be/mac/cisco-switch-initial-config)

☐ MOTD banner configured? — Present a security warning upon login attempt.

☐ Console line configured? — Secure physical serial access.

☐ VTY lines configured? — Secure remote management sessions.

☐ VLAN access applied to the correct ports? — Assign endpoint-facing ports to their designated access VLAN.

[Port Security & Violation Modes →](https://axelhuts.be/mac/cisco-port-security-violation-modes) [Sticky MAC Learning →](https://axelhuts.be/mac/cisco-port-security-mac-sticky)

☐ Trunking applied where necessary? — Configure inter-switch or switch-to-router links to carry multiple VLANs.

[DTP Hardening (nonegotiate) →](https://axelhuts.be/mac/cisco-switchport-nonegotiate)

☐ Native VLAN modified and active? — Assign the trunk's untagged traffic to your custom native VLAN.

☐ Passwords added: User EXEC? — Secure the initial privilege level.

☐ Passwords added: Console line? — Protect direct terminal access.

☐ Passwords added: VTY lines? — Protect remote SSH/Telnet access.

☐ Password encryption enabled? — Hash plaintext passwords in the configuration file.

☐ Unused ports shutdown? — Administratively disable empty ports to prevent unauthorized access.

☐ Copy run start executed? — Persist your switch configuration across reboots.

#### E. DHCP SERVER

☐ Static IP configured for server? — The server itself must have a fixed, reachable address on its subnet.

☐ All pools configured? — Ensure DHCP scopes, default gateways, and DNS servers are defined for every dynamic VLAN.

#### F. CABLES

☐ Correct cable type connected? — Use straight-through for different devices (PC to Switch) and crossover for similar devices (Switch to Switch).

☐ Cable connected to the correct port (VLAN)? — Double-check that physical connections match your planned access ports.

#### // SCRATCHPAD
