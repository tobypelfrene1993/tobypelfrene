> Concept map: Active Directory domain controller lifecycle
>
> 01 Install AD DS
>
> 02 Promote the forest
>
> 03 Demote safely

## $ Domain Controller Promotion

INSTALL THE AD DS ROLE AND PROMOTE A NEW SERVER TO THE FIRST DOMAIN CONTROLLER IN A FOREST

### Prerequisite: Install the AD DS Role

The Active Directory Domain Services role must be installed before any promotion
can occur. The -IncludeManagementTools flag pulls
in the AD PowerShell module and GUI tools that you will need for day-to-day
administration.

```
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
```

### Promote to Domain Controller (New Forest)

```
Import-Module ADDSDeployment
Install-ADDSForest `
  -CreateDnsDelegation:$false `
  -DatabasePath "C:\Windows\NTDS" `
  -DomainMode "WinThreshold" `
  -DomainName "AD.Training.com" `
  -DomainNetbiosName "AD" `
  -ForestMode "WinThreshold" `
  -InstallDns:$true `
  -LogPath "C:\Windows\NTDS" `
  -NoRebootOnCompletion:$false `
  -SysvolPath "C:\Windows\SYSVOL" `
  -Force:$true
```

### Understanding the Key Parameters

DomainName vs.
DomainNetbiosName —
DomainName is the fully qualified DNS name
(AD.Training.com), while
DomainNetbiosName is the legacy NetBIOS name
(AD) used by older systems
and visible in user principal names like AD\username.

ForestMode / DomainMode "WinThreshold" —
this is the PowerShell enum name for the Windows Server 2016 functional
level, not literally "2016" — a common point of confusion. The
functional level governs which AD features (like Privileged Access
Management) are available across the forest or domain.

InstallDns:$true —
co-locates the DNS Server role on this DC. In most small-to-medium
environments the first DC is also the first DNS server, and the AD-integrated
zone it creates replicates automatically to every other DC in the domain.

DatabasePath / LogPath / SysvolPath —
specify where the NTDS.dit database, transaction logs, and the SYSVOL
folder are stored. SYSVOL replicates Group Policy objects and logon scripts
between DCs via DFS Replication (or FRS on older functional levels).
The defaults (C:\Windows\NTDS and
C:\Windows\SYSVOL) are almost always
correct for a standard deployment.

CreateDnsDelegation:$false —
only matters when this domain is a child of an existing DNS namespace.
Since this is a new root domain, there is no parent zone to create a
delegation in, so it stays false.

Force:$true —
suppresses the interactive confirmation prompts that would otherwise
require a manual "yes" at each stage. This is what makes the command
scriptable and suitable for unattended deployment.

### The Missing DSRM Password

Notice that the command above has no
-SafeModeAdministratorPassword parameter.
Install-ADDSForest requires a Directory Services Restore Mode (DSRM)
password; if it is omitted, PowerShell prompts for it interactively
during execution. For a fully unattended deployment you would add:

-SafeModeAdministratorPassword (ConvertTo-SecureString "CHANGE_ME_STRONG_SECRET" -AsPlainText -Force)

But be aware that hardcoding a plaintext password inside a script is
itself a real operational security risk — not just a syntax detail.
Secrets in scripts are one of the most common paths to credential exposure
in production environments.

## $ Domain Controller Demotion

SAFELY DEMOTE A DOMAIN CONTROLLER USING THE ADDSDEPLOYMENT POWERSHELL MODULE

### Demoting a Domain Controller

```
Import-Module ADDSDeployment
Uninstall-ADDSDomainController `
  -DemoteOperationMasterRole:$true `
  -IgnoreLastDnsServerForZone:$true `
  -LastDomainControllerInDomain:$true `
  -RemoveApplicationPartitions:$true `
  -Force:$true
```

### Understanding the Key Parameters

DemoteOperationMasterRole:$true —
transfers (or, if the role owner is unreachable, seizes) any FSMO roles
this DC holds before it is demoted. FSMO roles include Schema Master,
Domain Naming Master, PDC Emulator, RID Master, and Infrastructure Master.
A DC that holds a FSMO role cannot be demoted cleanly unless the role is
moved first.

IgnoreLastDnsServerForZone:$true —
allows the demotion to proceed even though this DC is the last DNS server
hosting the AD-integrated zone. Without this flag, the system would block
demotion to prevent losing the only copy of the zone.

LastDomainControllerInDomain:$true —
confirms that this really is the final DC in the domain. See the critical
warning below.

RemoveApplicationPartitions:$true —
removes AD application partitions (such as the DNS application partition)
since nothing remains to host them after this DC is gone.

Force:$true —
suppresses the interactive confirmation that would otherwise require a
manual "yes," making the command scriptable.

### LastDomainControllerInDomain Is a One-Way Door

Setting -LastDomainControllerInDomain:$true
does not just remove one DC from a pool of several — because no other
domain controller holds a replica of the domain, running this command
destroys the entire Active Directory domain.
There is no undo short of restoring from a system state backup taken before
the demotion.

This is not a warning about a reversible setting. The domain, its objects,
its Group Policy structure, and its trust relationships cease to exist once
the last DC completes its demotion. Verify with
Get-ADDomainController -Filter \* before
ever passing this flag, and confirm that no other DCs remain in the domain.

## $ Operational Verification

ESSENTIAL COMMANDS FOR CONFIRMING DOMAIN CONTROLLER PROMOTION AND DEMOTION STATE

| Verification Command | Purpose / What to Look For |
| --- | --- |
| `Get-ADDomainController -Filter *` | Lists all domain controllers currently in the domain — confirms a promotion succeeded, or confirms what (if anything) remains after a demotion. |
| `dcdiag /v` | Comprehensive domain controller health check covering DNS, replication, FSMO roles, SYSVOL, and more. |
| `Get-ADForest` | Confirms the forest name and functional level match what was set during promotion. |
| `Get-ADDomain` | Confirms the domain name and functional level match what was set during promotion. |
| `Resolve-DnsName <DomainName>` | Confirms DNS is answering for the new AD-integrated zone (relevant since -InstallDns:$true was set). |
