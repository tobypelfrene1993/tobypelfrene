> Concept map: Folder redirection flow
>
> 01 User folder
>
> 02 Group Policy target
>
> 03 Server share

## $ What Is Folder Redirection?

REDIRECTING USER FOLDERS FROM THE LOCAL DISK TO A SERVER SHARE

### The Problem It Solves

Employees who correctly save important files — and, where needed,
back them up — is still something many companies fail to enforce,
despite warnings and even strict policy. Folder
Redirection is one of the most widely used solutions when it comes
to centrally preserving user data, because it takes the responsibility out
of the employee's hands.

### How It Works

User folders get stored in a shared folder on a server. To the end user
nothing appears to change — they keep saving into Desktop,
MyDocuments, and so on — but in fact the
data is written immediately to the network share. Specific folders are
*redirected* to that network location and the data is synchronized
straight away. That way the files are guaranteed to be preserved and not
lost if a local disk fails.

### Why Redirect Out of the Profile?

These files could just stay in the user profile — so why store them
anywhere else? By combining redirected
folders with roaming user profiles
(and their associated policies), the user profile itself is unloaded. That
in turn improves login times, because far less data has to travel back and
forth at logon and logoff.

In a Citrix or RDS environment this
combination is strongly recommended. Because the redirected folders
hold the bulk of the user's data on the server share, little to no user
data remains behind on the session host.

## $ Which User Folders Can Be Redirected

THE FAMILIAR PROFILE FOLDERS THAT LIVE IN ONE PLACE, LOOK LOCAL

The study guide names Desktop and
MyDocuments (Documents) as the classic
targets — the folders users save important work into every day.
Windows Server Folder Redirection covers the other profile folders in the
same way (for example the Start Menu, Pictures, and Favorites folders),
selected per folder in the Group Policy editor. Users keep using those
folders in File Explorer just as if they were still local; only their
physical location is moved.

## $ Benefits and Limitations

WHAT REDIRECTION BUYS YOU, AND WHERE THE SOURCE IS SILENT

### Benefits

Benefits supported by the study guide:

**•** User data is preserved on a server regardless of
what the employee does locally — an automatic safety net that does not
depend on employee discipline.

**•** Data is written and synchronized immediately, so
files survive a failed or replaced local disk.

**•** Combined with roaming profiles, the profile is
relieved, which shortens login times.

**•** In Citrix / RDS environments, little to no user data
is left behind on the server.

### Limitations

The study guide does not discuss drawbacks of Folder Redirection explicitly.
The limitation that follows from its own model is that redirection depends on
network availability and on correct share and NTFS permissions — those
are runtime dependencies, not fail-safe guarantees. See the operational
considerations below.

Source gap: availability behavior,
offline caching, and capacity planning are not covered in the study guide.
The redirection dialog's default settings and Offline Files behavior follow
established Windows Server practice, not this source.

## $ Prerequisites

WHAT MUST BE IN PLACE BEFORE THE FIRST REDIRECTION

### Active Directory Domain

Redirected folders are deployed through Group Policy, so client computers
must be domain-joined and users must be domain users. The policy is created
and managed in the GPMC (Group Policy
Management Console) and edited in the GPME
(Group Policy Management Editor).

### Shared Storage on a Server

A shared folder on a file server holds the redirected data. The share is
referenced by UNC path, and Folder Redirection creates the per-user folder
structure on it. Target a location that is itself reliably backed up
— the whole point is that these files must never be lost.

### Share and NTFS Permissions

Permissions on the share (share-level) and on the underlying folders
(NTFS-level) must allow the affected users to read and write. Apply the
least privilege needed: grant access to the correct security groups rather
than to individual users, and avoid blanket “Everyone” write
access. This follows established Windows Server practice — the study
guide references the shared folder but does not detail the permission
breakdown.

Recommendation: on a freshly created
redirection share, let the Group Policy wizard assign ownership of each
user's redirected folder to that user (“Grant the user exclusive
rights”, the default). Users can then manage their own folders while
administrators retain the access needed to administer the share. This is
established GPMC behavior, not a step described by the study guide.

## $ Configuration Flow in Group Policy Management

ONE GPO, A SHARE, AND THE REDIRECTION SETTINGS BEHIND THEM

### Step 1: Create the GPO

In GPMC, either right-click the target OU
and choose “Create a GPO in this domain,
and Link it here...” (created and linked in one action), or
create the policy under Group Policy
Objects and link it to the OU afterwards. GPOs are linked to OUs /
levels (site, domain, OU) — never directly to groups.

### Step 2: Edit the Folder Redirection Settings

Right-click the GPO and choose “Edit...”
to open the GPME. Folder Redirection is a
user-level setting: under User
Configuration → Policies
→ Windows Settings →
Folder Redirection (an established
Windows Server path; the guide confirms the GPME split between Computer and
User Configuration). Right-click a target folder and open its
Properties.

### Step 3: Choose Basic or Advanced

In the folder's Target tab you pick the
redirection mode — Basic redirects
everyone to one location, Advanced
targets different groups differently. Details in the next section.

### Step 4: Set the Target Folder Path

Point at the server share and let the policy create a per-user subfolder.
The %USERNAME% variable makes the per-user
path automatic (established practice; the guide states that per-user subfolders
are created).

```
\\SRV01\Redirected\%USERNAME%\Documents
```

### Step 5: Link the GPO Once to the Users OU

In the most common case the policy is linked a single time, to the OU that
contains the users. If the policy should reach only a subset of that OU,
use Security Filtering (filter on users
or groups) instead of building extra OUs — the guide covers this as a
general GPO mechanism.

GPOs are never linked to groups. Groups
influence a GPO through security filtering and, for Advanced redirection,
through the per-group target selection — but the link itself is always
on an OU, site, or the domain level.

### Step 6: Refresh Policy on Clients

Policy applies at logon (user policies load at sign-in, computer policies at
startup). To test a change without waiting for the refresh cycle, force a
policy update on the client.

```
gpupdate /force
```

Relevant parameters: `/target:computer` or `/target:user`, and
optionally `/logoff` or `/reboot` when a logout/reboot is required.

## $ Basic Versus Advanced Redirection

ONE TARGET FOR EVERYONE, OR DIFFERENT TARGETS PER GROUP

### Basic Redirection

Send everyone's files to one target folder; the policy creates a separate
subfolder automatically for each user. This is the most used and easiest
option, because in most cases the GPO needs to be linked only once, to the
OU where the users live.

### Advanced Redirection

Specify different target locations for different groups. This works on the
basis of group membership: the user folders of everyone in a given group are
redirected to that group's designated shared folder.

### Which One to Pick

Start with Basic. It is the default
choice unless departments or teams genuinely need separate storage targets
(different shares, different backup schemes, capacity separation). Only move
to Advanced when one target folder no longer fits — it adds
configuration surface for each group.

## $ Security and Operational Considerations

GUARD THE SHARE, KNOW WHAT REDIRECTION DOES AND DOES NOT GUARANTEE

### Data Safety on the Server

The immediate synchronization to the share is what makes the files
“guaranteed preserved” against local data loss. That guarantee
lives and dies with the server and its backup: back up the redirected share
like any other production data, and never leave the contents only on the
client.

### Permissions Discipline

Both share and NTFS permissions apply, and the effective access is the
strictest of the two. Assign via security groups, verify before rollout, and
keep the exclusive-rights default so users control their own folders while
administrators retain administrative access to the share.

### Offline Files and Network Dependence

The study guide does not cover Offline Files. In established Windows Server
practice, redirected folders are cached locally through Offline Files, which
keeps the folders available when the network or server is temporarily
unreachable. The trade-off is disk use on the client and the need to manage
sync conflicts. Treat this as operating guidance, not as a claim from the
study guide. In Citrix / RDS deployments the whole benefit is that
little-to-no data stays on the session host — plan caching accordingly.

### Login Time and Session Hosts

The redirection + roaming profile combination exists specifically to lighten
the profile and therefore speed up logon, and to keep user data off shared
session hosts. Do not defeat this by storing large detachments back into
non-redirected profile locations.

## $ Validation and Troubleshooting

PROVE THE POLICY APPLIED AND THE SHARE HOLDS THE DATA

### Confirm the Policy Applied

gpresult shows which policies were
applied for the identity that runs it. The /r
parameter is mandatory. A normal end user does not get the computer-side
policy list — insufficient rights — so run an elevated Command
Prompt to query computer policies.

```
gpresult /r
```

```
gpresult /r /scope computer
```

```
gpresult /r /scope user
```

### Structural Checks

| Check | What to Look For |
| --- | --- |
| `gpresult /r /scope user` | Folder Redirection and the GPO appear in the applied user policy list after logon. |
| `Test-Path "\\SRV01\Redirected\jdoe\Documents"` | The per-user redirected folder exists on the share — rules out path or share problems. |
| `Get-SmbShareAccess -Name "Redirected"` | Share-level permissions reach the intended groups — rules out “Access is denied”. |
| `Event Viewer → Application` | Folder Redirection / UserProfile log errors, for example failed moves or sync failures. |

The PowerShell validation commands follow the same pattern as the sibling
user-profiles page and are established practice; the study guide itself only
documents `gpresult` and `gpupdate`.

### Common Failure Signs

**“Access is denied”** on the redirected folder:
share or NTFS permissions missing — the user belongs to no group that
has access. Fix by adding the user to the correct group, not by relaxing the
share.

**Data still local:** the policy likely did not apply —
confirm with gpresult, check the link
target OU and security filtering, then re-run
gpupdate /force.

**Slow logon:** redirection is meant to fix this; if it persists,
too much data still lives in the roaming profile (non-redirected locations) or
in the offline cache.
