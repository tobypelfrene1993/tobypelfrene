> Concept map: Windows account scopes
>
> 01 Local account
>
> 02 Built-in account
>
> 03 Domain account

## $ User Account Fundamentals

WHAT A USER ACCOUNT IS, WHAT IT CONTAINS, AND WHY IT EXISTS

### What Is a User Account?

A user account is the established mechanism for connecting a person to an
information service or computer network. It determines whether that person
can connect to a computer, network, or related systems, and is one of the
primary ways to authenticate and gain access to a system's resources.

Single-user systems don't need multiple accounts; multi-user systems and
most networks do — email accounts are a familiar everyday example. A user
account consists of a username, a password, and account metadata: whether
the account is enabled or disabled, whether the user can change their own
password, and whether the password ever expires.

### Standard vs. Administrator Accounts

On a PC there are two main account types: an Administrator
account has full privileges to perform tasks like installing applications,
while a Standard account is limited to
whatever the administrator has configured. The split exists so that
day-to-day work happens with the least privilege necessary — only elevation
to administrator when the task truly requires it.

## $ Local, Built-In & Domain Accounts

THREE CATEGORIES OF USER ACCOUNTS AND HOW THEY DIFFER

### Local User Accounts

The account type most people use at home unless they're signed in with a
Microsoft account. A local account can only sign in locally and can only
access local resources — files and folders that live on that same machine.
It cannot be used on a different PC because it simply doesn't exist there.

Every local account is stored in that machine's Local Security Database and
is never replicated to other computers; on disk it exists as a
SAM file under
%systemroot%\system32\config\SAM.

### Built-In Accounts

Created automatically during Windows installation. The best known are
Administrator and
Guest. Even though they exist from the
moment Windows is installed, they aren't usable yet — both are disabled by
default and must be enabled manually or via policy. Another commonly used
built-in account is HelpAssistant, used
for Remote Assistance sessions where someone helps a colleague remotely.

Built-in accounts existing is not the same as
built-in accounts being usable. Always check enabled/disabled state
before assuming an account is active. A disabled account is inert — it
cannot authenticate, cannot be used for Remote Desktop, and will not appear
on the login screen regardless of its presence in the SAM database.

### Domain User Accounts

Only exist within an Active Directory environment — the kind used in
business settings, built on one or more domain controllers. Domain accounts
are stored in a database that's replicated across every domain controller.
With a domain account, a user can sign in on any computer that's joined to
that domain and reach whatever resources they're permitted to use within it.
This is what gives a company flexibility — nobody is tied to one specific
computer to do their work.

A local account only works on the one machine
it was created on. A domain account works on every computer joined
to that domain — that portability is the entire
point of Active Directory user accounts.

### Managing Accounts via CLI

```
net user
```

```
net user Administrator
```

```
Get-LocalUser
```

```
Enable-LocalUser -Name "Administrator"
```

```
Get-ADUser -Filter * -Properties Enabled
```

```
New-ADUser -Name "Jane Doe" -SamAccountName "jdoe" -Enabled $true -AccountPassword (ConvertTo-SecureString "CHANGE_ME_STRONG_SECRET" -AsPlainText -Force)
```

## $ Operational Verification

ESSENTIAL COMMANDS FOR CONFIRMING USER ACCOUNT STATE

| Verification Command | Purpose / What to Look For |
| --- | --- |
| `net user` | Lists all local accounts on this machine. |
| `Get-LocalUser` | PowerShell equivalent — shows Enabled/Disabled status per account. |
| `Get-ADUser -Filter * -Properties Enabled` | Confirms domain accounts and their enabled state (AD environments only). |
| `whoami /user` | Confirms the currently signed-in account's name and SID. |
