> Concept map: Effective access calculation
>
> 01 Share permission
>
> 02 NTFS permission
>
> 03 Most restrictive result

## $ NTFS Permission Fundamentals

STANDARD NTFS PERMISSIONS DEFINE WHAT EACH USER OR GROUP CAN DO ON A FILE OR FOLDER

### Standard NTFS Permissions

| Permission | What It Allows |
| --- | --- |
| Full Control | Read, write, modify, navigate, delete, and change permissions on the object. |
| Modify | Read, write, modify, and delete — but cannot change permissions. |
| Read and Execute | Read and run executable files; view and traverse folder contents. |
| List Folder Contents | Folders only — see names and contents list; does not automatically open files. |
| Read | Read a file or folder; no execute right. |
| Write | Create new files and subfolders and write to existing content; does not imply delete. |

### Allow Permissions Are Cumulative

Allow permissions from every group a user belongs to, plus any permission
granted directly to the user, are combined. For example: the
Sales group has Read on a folder.
Dan, a member of Sales, is also explicitly granted Modify. Because
Allow permissions combine, Dan's effective permission is
Modify — unless a relevant Deny reduces it.

### Deny Overrides Allow

Deny reduces or fully blocks access and takes precedence over Allow
whenever both apply to the same user. A single Deny entry can cancel
out multiple Allow entries from different groups.

### Explicit vs. Inherited: The Priority Order

Must-memorize priority order — when multiple
permissions conflict, Windows evaluates them in this exact sequence
(highest priority first):

1. Explicit Deny
2. Explicit Allow
3. Inherited Deny
4. Inherited Allow

An explicit setting always beats an inherited one. Among the same
type, Deny always wins over Allow.

### ACE and ACL Defined

An ACE (Access Control Entry) is one
permission rule for a single user or group — it specifies who gets what
level of access. The ACL
(Access Control List) is the complete list of ACEs on a file or folder,
and is what Windows evaluates when determining the effective permission.

### Inheritance & Disabling It

Permissions set on a folder are inherited by default
by its subfolders and files. Disabling inheritance offers two paths:
convert inherited permissions into explicit ones on that object, or
remove them entirely. Converting is the safer default — removing can
leave nobody with permissions until everything is manually reconfigured.

Best practice: assign permissions to groups
rather than individual users, and set permissions primarily at the folder level.

### Managing NTFS Permissions via CLI

```
icacls "C:\Data\Sales"
```

```
icacls "C:\Data\Sales" /grant "DOMAIN\Sales:(OI)(CI)M"
```

```
icacls "C:\Data\Sales" /deny "DOMAIN\Contractors:(OI)(CI)W"
```

```
icacls "C:\Data\Sales" /inheritance:d
```

```
icacls "C:\Data\Sales" /inheritance:r
```

## $ Share Permissions & Effective Access

SHARE PERMISSIONS APPLY ONLY OVER THE NETWORK AND COMBINE WITH NTFS TO DETERMINE EFFECTIVE ACCESS

### Share Permission Levels

| Share Permission | Equivalent NTFS Comparison |
| --- | --- |
| Full Control | Broadest — full control at the share level including changing permissions. |
| Change | Comparable to NTFS Modify — read, write, change, and delete via the share. |
| Read | Comparable to NTFS Read — read-only access via the share. |

### Calculating Effective Access: Most Restrictive Wins

1. Compute the effective share permission.\
2. Compute the effective NTFS permission.\
3. Compare both results.\
4. The most restrictive combination is what actually applies.

Worked example: Share = Change,
NTFS = Read and Execute. The effective permission is
Read and Execute, because it is the
more restrictive of the two.

### Least Privilege in Practice

Grant only what's needed. A common real-world pattern is leaving the
share permission broad (e.g. Everyone: Change)
and doing all fine-grained control through NTFS permissions and groups.
NTFS applies both locally and over the network, while share permissions
only apply over the network.

### Managing Shares via CLI

```
net share Sales=C:\Data\Sales /grant:Everyone,CHANGE
```

```
net share Sales
```

```
New-SmbShare -Name "Sales" -Path "C:\Data\Sales" -ChangeAccess "Everyone"
```

## $ Operational Verification

ESSENTIAL COMMANDS FOR CONFIRMING NTFS AND SHARE PERMISSION STATE

| Verification Command | Purpose / What to Look For |
| --- | --- |
| `icacls "C:\Data\Sales"` | Confirms current NTFS ACL entries and inheritance flags. |
| `net share Sales` | Confirms share-level permissions and the shared path. |
| `Get-SmbShareAccess -Name "Sales"` | Confirms share permissions in a structured PowerShell format. |
| `whoami /groups` | Confirms the current user's group memberships — useful for reasoning through cumulative Allow scenarios. |
