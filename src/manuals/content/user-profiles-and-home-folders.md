> Concept map: User data location
>
> 01 Local profile
>
> 02 Roaming profile
>
> 03 Home folder

## $ Windows User Profile Types

THE FOUR PROFILE TYPES AND WHERE THEY LIVE

### The Four Profile Types

Windows recognizes four distinct user profile types:
Local,
Roaming,
Mandatory, and
Temporary.
A company environment won't need the same profile type as a home
environment — what differs between them is where the data lives
and who controls it.

### Local User Profile

Created locally the first time a user logs in and no profile exists
anywhere else for them. A typical home user almost always has this
profile type present on their machine, even when signing in with a
“Microsoft account” — which is a slightly misleading
name, since it's really a user profile that remembers the user's working
environment. The user has full control over their own profile, stored at
%userprofile%\<username>,
viewable at
C:\users\\<username>.

### Roaming User Profile

Used by almost every company for its employees, unless an alternative
like FSLogix Profiles is used instead. Ensures a user gets the same
working environment no matter which computer they log into. The user
still has full control — every change is saved back to the profile
at logoff. These profiles are typically stored in a shared folder on a
file server, referenced via a UNC path configured in the user account's
properties.

### Mandatory User Profile

The user has zero control over their own profile; the administrator
manages it, not the user. Used whenever a login should always present
the exact same pre-configured environment, defined in advance by the
administrator. Classic examples: libraries and airports, where every user
logging in to do lookup work should see an identical environment.

### Temporary User Profile

Created locally whenever Windows fails to load a user's real profile at
logon. The user can still log in and has full control during that session,
but none of it is saved permanently to their real profile — changes
are written instead to a temporary file,
%username%.temp.

## $ Configuring Roaming & Mandatory Profiles

SETTING UP SERVER-BASED PROFILES VIA UNC PATHS

### Why Use Roaming Profiles?

Avoids overloading every computer locally with every employee's profile;
centralizing profiles on a server makes management far simpler, with no
difference to the end user, who always gets the same environment
regardless of which company computer they log into.

Roaming profile technology is around 25
years old and starts to strain against company globalization and
multi-site growth — which would require profiles replicated across
multiple local servers, a real infrastructure investment — and
against increasing cloud connectivity, which this technology wasn't built
for. Modern centralized alternatives exist that work both locally and in
the cloud — one is FSLogix, which stores profiles as a VHDX file,
for example on a cloud server.

### Setting Up a Roaming Profile

**Step 1.** Create a shared folder for profiles (e.g. named
“Userprofiles”), share it, and assign the correct permissions
to everyone who needs access.

```
New-SmbShare -Name "Userprofiles" -Path "D:\Shares\Userprofiles" -FullAccess "Everyone"
```

**Step 2.** In the affected user's account Properties, set
the correct UNC path so the account knows to use that profile location.

```
Set-ADUser -Identity jdoe -ProfilePath "\\SRV01\Userprofiles\jdoe"
```

**Step 3.** On first login, that user's roaming profile is
automatically created in the shared folder.

UNC path structure: `\\IP-adres_server\shared_foldername\%username%`

### Setting Up a Mandatory Profile

First create a roaming profile exactly as above. Once it exists correctly,
rename the file NTUSER.DAT to
NTUSER.MAN inside that user's profile
(just change the extension) — from that point on, the user gets a
mandatory profile at login.

NTUSER.DAT is a hidden file and
won't be visible by default inside the profile on the server —
make sure hidden files are set to visible before attempting this.

### Why Can't the Administrator Access the Profile?

By default, only the user themselves has full control over their own
profile; the administrator has zero access to the folders and files inside
it. Two ways to fix this:

**Option 1.** Use a GPO (Group Policy Object) to grant
administrators access to user profiles — the recommended approach.

**Option 2.** Take ownership of the user's profile —
this works, but every permission previously attached to that profile is
lost in the process and must be manually reconfigured from scratch.

Taking ownership should only be used as
an absolute last resort when nothing else is possible —
otherwise strongly discouraged. The process strips every existing ACL
entry from the profile, requiring a complete manual rebuild of
permissions from scratch. Always prefer the GPO approach.

## $ Troubleshooting Profile Loading Issues

COMMON PROFILE-LOADING FAILURES AND THEIR FIXES

### Temporary Profile as a Symptom

If a user gets logged in with a temporary profile instead of their own, and
the company uses centralized server-based profiles, that's usually where to
look. Always read the actual error message in Event Viewer first —
the details reveal the real problem.

### “Network Path Cannot Be Found”

Means the client computer can't reach the profile at all. Three possible
causes and fixes:

**Cause 1.** No shared folder has been configured for profiles
yet — configure it correctly.

**Cause 2.** The network itself isn't functioning even though
the profiles genuinely exist in the shared folder — test and repair
the network.

**Cause 3 (most common).** The UNC path set in the user's
properties doesn't match the actual profile location — correct the
UNC path on that account.

### “Access Is Denied”

The shared folder IS found, but the user has no access to it. Usually
missing or incorrect permissions on the shared folder — either share
permissions, NTFS permissions, or both. Could also be that permissions are
configured correctly but the user simply isn't a member of one of the
groups granted access — the better fix is always adding the user to
the correct group(s), rather than adding a new group, and being careful not
to accidentally grant other users access they shouldn't have.

### Works on One Computer But Not Others

If a user can log in fine on Computer 1 but not on Computer 2 or 3, their
profile isn't actually reaching them from the server — one of the
two errors above will show up on Computer 2/3, while Computer 1
“succeeds” only because it's using a local profile there. Fix:
restore server-based profile login and log in first on Computer 1 —
at logoff, the local profile merges back into the server-based one,
bringing it up to date again.

## $ Home Folders

PERSONAL FILE STORAGE ON A CENTRAL SERVER

### What Is a Home Folder?

Like the profiles folder, a home folder is a shared folder on a server for
personal file storage. To the end user it's not just a folder in File
Explorer — it's offered as a network location (mapped drive).
Benefits: accessible from any computer on the network; easier centralized
backup of user files; centralized storage also lets admins manage capacity
via quotas or restrict certain file types (covered elsewhere, in later
Server 2022 material).

### Home Folders vs. Redirected Folders

Home folders are sometimes used alongside Redirected Folders — the
familiar profile folders like MyDocuments, Desktop, and Pictures, whose
data gets redirected to a central network location (covered in the Group
Policies material). Both store data on a server, but a home folder is
presented as its own network drive, while with redirected folders the user
keeps using the normal MyDocuments/Desktop/etc. folders in File Explorer as
if they were still local. Home folders make it more obvious to the user
that their data lives somewhere other than locally.

### Creating a Home Folder

**Step 1.** Create a shared folder to hold the home folders
and assign the correct permissions on it (same as for profiles).

**Step 2.** In the user's account properties, add a drive
letter (e.g. “H”) and a UNC path.

```
Set-ADUser -Identity jdoe -HomeDirectory "\\SRV01\Homefolders\jdoe" -HomeDrive "H:"
```

Key difference from profiles: the home folder is created automatically as
soon as the shared folder, its permissions, and the UNC path are correctly
configured — the user does NOT need to log in first, unlike roaming
profiles which are only created on first login.

UNC path structure: `\\IP-adres_server\shared_foldername\%username%`

## $ Operational Verification

ESSENTIAL COMMANDS FOR CONFIRMING PROFILE AND HOME FOLDER STATE

| Verification Command | Purpose / What to Look For |
| --- | --- |
| `Get-ADUser -Identity jdoe -Properties ProfilePath,HomeDirectory,HomeDrive | Select Name,ProfilePath,HomeDirectory,HomeDrive` | Confirms the configured roaming profile path and home folder settings for a user. |
| `Test-Path "\\SRV01\Userprofiles\jdoe"` | Confirms the shared profile path is reachable from a client — useful for ruling out “Network path cannot be found”. |
| `Get-SmbShareAccess -Name "Userprofiles"` | Confirms share-level permissions on the profiles share — useful for ruling out “Access is denied”. |
| `Event Viewer → Windows Logs → User Profile Service` | The authoritative source for the real underlying error when a profile fails to load. |
