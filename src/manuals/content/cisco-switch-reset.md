> Concept map: Switch factory-reset lifecycle
>
> 01 Erase startup config
>
> 02 Remove vlan.dat
>
> 03 Reload and verify

## $ VLAN.dat Trap

Wiping a switch's startup-config does
not clear its VLAN configurations. Cisco
Catalyst switches store all custom VLAN allocations inside a dedicated binary
file named vlan.dat located directly in
the local flash storage file system (flash:).

To truly restore a switch to its factory out-of-the-box state, an administrator
must explicitly erase both the NVRAM
configuration and purge this flash-resident VLAN database.

NVRAM STARTUP-CONFIG   FLASH VLAN.DAT   RESULT FACTORY

## $ Reset Timeline

EXECUTION ORDER — 4 COMMANDS, ONE CONTIGUOUS SESSION

// Step 1: Enter privileged EXEC mode.

```
enable
```

// Step 2: Erase the existing NVRAM startup configuration file.

```
erase startup-config
```

// Output: Erasing the nvram filesystem will remove all configuration files! Continue? [confirm]
— press [Enter] to confirm.

// Step 3: Purge the standalone VLAN database file from flash memory.

```
delete flash:vlan.dat
```

// Output: Delete filename [vlan.dat]? — press
[Enter], then
Delete flash:/vlan.dat? [confirm] — press
[Enter] to confirm.

// Step 4: Software-reload the hardware to initialize the factory-default state.

```
reload
```

// Output: System configuration has been modified. Save? [yes/no] — type
no, then Proceed with reload? [confirm]
— press [Enter] to confirm.

## $ Critical Save Warning

You must type no
at the System configuration has been modified. Save? [yes/no]
prompt during the reload sequence. Choosing yes will dump
the current active memory contents back into NVRAM, completely undoing the
erase startup-config step.

A single keystroke of yes at this prompt
rewrites the very configuration you just deleted — leaving the switch in its
pre-reset state with all VLANs and interface settings intact.
