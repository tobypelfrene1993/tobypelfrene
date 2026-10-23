> Concept map: Router factory-reset lifecycle
>
> 01 Remove startup state
>
> 02 Reload the router
>
> 03 Validate clean state

## $ System Behavior

A complete Cisco factory reset requires two distinct phases:
clearing the non-volatile storage (NVRAM) where the
startup-config lives, and resetting the
hardware configuration register to its default value
0x2102.

If a router was previously subjected to a password recovery procedure, its
register might be sitting at 0x2142 —
which instructs the device to bypass the configuration on boot. Forcing it back
to 0x2102 ensures normal boot operations
resume seamlessly post-wipe.

PHASE 1 ERASE NVRAM   PHASE 2 REGISTER 0x2102   DANGER TOTAL LOSS

## $ Reset Timeline

EXECUTION ORDER — 6 COMMANDS, ONE CONTIGUOUS SESSION

// Step 1: Enter privileged EXEC mode.

```
enable
```

// Step 2: Enter global configuration mode.

```
configure terminal
```

// Step 3: Reset the configuration register to default (ensures standard boot lookup).

```
config-register 0x2102
```

// Step 4: Return to privileged EXEC mode.

```
end
```

// Step 5: Erase the existing NVRAM startup configuration file.

```
erase startup-config
```

// Output: Erasing the nvram filesystem will remove all configuration files! Continue? [confirm]
— press [Enter] to confirm.

// Step 6: Software-reload the hardware to initialize the factory-default state.

```
reload
```

// Output: Proceed with reload? [confirm]
— press [Enter] to confirm.

## $ Post-Reset Notes

Do not save the running configuration
if prompted during the reload sequence. Answering yes
to System configuration has been modified. Save? [yes/no]
would rewrite the configuration back to NVRAM, defeating the reset entirely.

Enter no at the save prompt, then
[Enter] to confirm reload. The router
will reboot with its factory-default configuration and register
0x2102.
