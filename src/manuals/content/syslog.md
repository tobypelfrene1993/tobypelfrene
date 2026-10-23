## $ Why this matters

Syslog records network events locally or remotely so configuration changes, errors and security-relevant events can be investigated and correlated.

Read this guide in order: establish the vocabulary, follow the behaviour, then use the configuration and verification evidence in a lab.

## $ Core concepts and terminology

> Concept map: CCNA: Syslog & Event Logging
>
> 01 Severity levels
>
> 02 Destinations
>
> 03 Time quality

01

### Severity levels

Cisco syslog uses levels 0 through 7, from emergencies to debugging. Lower numeric values are more severe.

02

### Destinations

Messages can be sent to console, terminal lines, an internal buffer or a remote syslog server. Each destination can use its own severity threshold.

03

### Time quality

NTP synchronization makes log timelines reliable across devices and is a prerequisite for useful cross-device analysis.

| Concept | What to remember in a lab or exam |
| --- | --- |
| Severity levels | Cisco syslog uses levels 0 through 7, from emergencies to debugging. Lower numeric values are more severe. |
| Destinations | Messages can be sent to console, terminal lines, an internal buffer or a remote syslog server. Each destination can use its own severity threshold. |
| Time quality | NTP synchronization makes log timelines reliable across devices and is a prerequisite for useful cross-device analysis. |

## $ Study notes from the source material

Use these notes to connect the definitions above to the decisions, failure modes and verification steps covered in the course material.

NOTE\_01

### Severity numbering runs downward

Cisco syslog levels range from 0 (emergencies) to 7 (debugging). Lower numbers are more severe, so choose destination thresholds carefully to avoid hiding important events or flooding a console.

NOTE\_02

### Use appropriate destinations

Messages may go to console, terminal lines, an internal buffer or a remote collector. Remote logging preserves evidence beyond one device and supports central correlation.

NOTE\_03

### Time quality determines investigative value

Enable detailed timestamps and synchronise clocks through NTP. A log without a reliable time base is difficult to correlate with neighbouring devices or an incident timeline.

### Apply the model

1. **Step 1 — Severity numbering runs downward.** Cisco syslog levels range from 0 (emergencies) to 7 (debugging). Lower numbers are more severe, so choose destination thresholds carefully to avoid hiding important events or flooding a console.
2. **Step 2 — Use appropriate destinations.** Messages may go to console, terminal lines, an internal buffer or a remote collector. Remote logging preserves evidence beyond one device and supports central correlation.
3. **Step 3 — Time quality determines investigative value.** Enable detailed timestamps and synchronise clocks through NTP. A log without a reliable time base is difficult to correlate with neighbouring devices or an incident timeline.

## $ Decode a Syslog message

```
seq:timestamp: %facility-severity-MNEMONIC:description
```

Sequence numbers and timestamps depend on configuration. The facility, severity, mnemonic and description identify the event itself.

| Field | Meaning | Example |
| --- | --- | --- |
| Sequence number | Orders messages so closely spaced events can be reconstructed. | `000043: (only when service sequence-numbers is enabled)` |
| Timestamp | Shows when the event occurred. Use a synchronised clock for cross-device investigation. | `*Feb 11 05:06:43.331: (configured with service timestamps)` |
| Facility | Identifies the IOS process or subsystem that created the message. | `LINK, LINEPROTO, OSPF or SYS` |
| Severity | A number from 0 to 7 that classifies urgency; lower is more severe. | `5 in %SYS-5-CONFIG_I` |
| Mnemonic | Short event code used to identify what happened. | `UPDOWN, ADJCHG, CONFIG_I or CLOCKUPDATE` |
| Description | Human-readable detail needed to identify the interface, neighbour, actor or state change. | `Configured from console by jeremy on console` |

`*Feb 11 03:02:55.304: %LINK-3-UPDOWN: Interface GigabitEthernet0/0, changed state to up`

Here **LINK** is the facility, **3** means Error, **UPDOWN** is the mnemonic, and the remainder identifies the interface and its new state. A subsequent `%LINEPROTO-5-UPDOWN` is a separate line-protocol event at severity 5.

## $ Syslog severity levels — memorize all eight

Severity runs from **0 (most severe)** to **7 (least severe)**. Memory aid: *Every Awesome Cisco Engineer Will Need Ice cream Daily.*

| Level | Keyword | Meaning |
| --- | --- | --- |
| 0 | Emergency | The system is unusable. |
| 1 | Alert | Immediate action is required. |
| 2 | Critical | Critical conditions exist. |
| 3 | Error | Error conditions exist. |
| 4 | Warning | Warning conditions exist. |
| 5 | Notice / Notification | Normal but significant condition. RFC uses Notice; Cisco IOS CLI uses Notification. |
| 6 | Informational | Informational message. |
| 7 | Debugging | Debug-level diagnostic message. |

A configured threshold includes that level and every numerically lower level. For example, `logging buffered 6` stores levels 0 through 6, but excludes Debugging (7). It does not mean “only level 6”.

## $ Where messages go

| Destination | Default state | Operational detail |
| --- | --- | --- |
| Console line | Enabled by default | Displays messages in real time on a console connection. Default filtering includes levels 0 through 7. |
| Logging buffer (RAM) | Enabled by default | Keeps recent messages locally. Use show logging; contents are lost when the device restarts. |
| VTY / SSH / Telnet session | Disabled by default | Requires logging monitor at configuration level and terminal monitor in every active remote session. |
| External Syslog server | Not configured by default | Centralises records from multiple devices and normally receives Syslog on UDP port 514. |

## $ Syslog configuration and verification

The commands below are taken from the study guide. Substitute the server address and choose severity thresholds appropriate to the lab.

```
service timestamps log datetime
```

**Adds absolute date and time to messages.**\
Prefer this to uptime when correlating multiple devices; NTP should supply a reliable clock.

```
service sequence-numbers
```

**Adds a sequence number to every message.**\
Useful for ordering bursts of events; it is optional and less important than timestamps.

```
logging console informational
```

**Sends levels 0 through 6 to the console.**\
The configured value is the highest numeric level included; lower numbers are more severe and are included too.

```
logging buffered 8192 6
```

**Stores levels 0 through 6 in an 8192-byte RAM buffer.**\
Debugging (7) is excluded. Size is in bytes and should be chosen with device RAM in mind.

```
logging monitor informational
```

**Sets the VTY monitor threshold to levels 0 through 6.**\
This alone does not display messages in an SSH/Telnet session.

```
terminal monitor
```

**Displays messages in the current remote session.**\
Run from privileged EXEC in each new SSH/Telnet session; it is not persistent.

```
logging host 192.168.1.100
```

**Sets an external Syslog destination.**\
The server must be reachable; logging 192.168.1.100 is an equivalent IOS form.

```
logging trap debugging
```

**Sends levels 0 through 7 to the external server.**\
logging trap 7 is the numeric equivalent.

```
line console 0
 logging synchronous
```

**Redraws an interrupted CLI command after a log message.**\
Prevents incoming events from making typed console input unreadable.

```
show logging
```

Inspect configured destinations, severity thresholds and buffered messages. Generate a controlled event—for example an interface state change—to prove the selected destination receives it.

## $ Syslog and SNMP are complementary

| Aspect | Syslog | SNMP |
| --- | --- | --- |
| Primary role | Logs events generated by the device. | Retrieves and organises managed-device information. |
| Information | Event messages with facility and severity. | Managed variables such as status, addresses, temperature and CPU use. |
| Interaction | Device pushes messages to a collector. | NMS can poll with Get and, where permitted, change values with Set. |
| Operational value | Incident timeline, analysis and troubleshooting. | Monitoring and state management. |

## $ Configuration & verification

Each command is isolated so it can be copied independently. Adapt interface names, addresses, ACLs and authentication values to the actual topology.

```
logging host 192.0.2.20
```

Configures a remote syslog destination.

```
service timestamps log datetime msec
```

Adds detailed timestamps to log messages.

```
show logging
```

Displays local logging configuration and buffered messages.

Do not treat an accepted command as proof of a working design. Generate relevant traffic, inspect the operational state, and compare it to the intended topology and policy.

## $ Troubleshooting sequence

| Check | Question to answer | Next action |
| --- | --- | --- |
| 01 · Scope | Is the symptom one endpoint, one link, a subnet, or the whole path? | Define the expected flow before changing configuration. |
| 02 · Foundations | Are addressing, physical/link state and the relevant neighbour relationship correct? | Verify lower-layer evidence first. |
| 03 · Control plane | Has the feature selected the expected state, route, role or lease? | Use the feature-specific show command and compare it to the design. |
| 04 · Data plane | Does real traffic take the intended path and receive a valid return path? | Test in both directions and re-check counters, tables or logs. |

## $ Exam focus

Severity 0 is the most severe and severity 7 is debugging. Do not reverse the scale under exam pressure.
