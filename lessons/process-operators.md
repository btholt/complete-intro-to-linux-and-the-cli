---
path: "/process-operators"
title: "Exit Codes, Process Operators, and Subcommands"
order: "6D"
section: "Environments and Processes"
description: "Need to run one command after another? Use process operators! Brian explains how to run sequence of commands and subcommands as well as exit codes"
---

Before we jump too far into how to run commands in sequences, let's chat one second about exit codes. Whenever a process exits, it exits with an exit code. This exit code corresponds to if a process successfully completed whatever you told it to do. Sometimes this is a bit misleading because sometime programs are meant to be stopped before they complete (as some like `yes` will never actually complete by themselves).

A program that successfully runs and exits by itself will have an exit code of 0. Try this:

```bash
date # show current date, runs successfully
echo $? # $? corresponds to the last exit code, in this case 0
yes # hit CTRL+C to stop it
echo $? # you stopped it so it exited with a non-zero code, 130
```

So what do all the codes mean? Well, it depends on the program and it's not super consistent. It can be any number from 0 to 256. But here are a few good ones that are common

- 0: means it was successful. Anything other than 0 means it failed
- 1: a good general catch-all "there was an error"
- 2: a bash internal error, meaning you or the program tried to use bash in an incorrect way
- 126: Either you don't have permission or the file isn't executable
- 127: Command not found
- 128: The exit command itself had a problem, usually that you provided a non-integer exit code to it
- 130: You ended the program with CTRL+C
- 137: You ended the program with SIGKILL
- 255: Out-of-bounds, you tried to exit with a code larger than 255

There are a few others but these are the most common ones you'll see. You'll see some programs use numbers like 5 to 100 to signify different ways the program ended but you can pretty safely ignore that. It's usually just important if it's 0 or not-0.

Okay, so why is this important? It can be useful to see if a previous command succeeded or not, but it's also useful for running programs in a sequence using operations.

So what if you need to run two processes in a row, one right after the other? Well, you have a few options.

## Run if first one succeeds

You'll probably see this the most. Let's say I wanted to create a file, add the date to it, and then add my current uptime to it. (try runnning `uptime`, it just tells you how long your computer has been running.)

```bash
touch status.txt && date >> status.txt && uptime >> status.txt
cat status.txt
```

You can see it does all three commands right in a row. That's what the `&&` operator does. It runs from left to right (touch, date, then uptime). The `&&` operator will bail if any of those commands fails. Try this:

```bash
date && cat not-real-file.txt && echo hi # the date will display but hi won't
```

Since `not-real-file.txt` doesn't exit, it bails and hi is never echoed.

## Run if first one fails

There's also a `||` command that will run if the first one fails.

```bash
false || echo hi # you'll see hi
false && echo hi # you won't see hi
```

`false` is a command that just returns `1` (there is a `true` that always returns 0) In this case, you'll see hi the first time and not the second time.

## Always Run

If you need _always_ run the second command, use a `;` instead of either && or ||.

```bash
false ; true ; echo hey # you'll see hey
```

## Subcommands

Sometimes you need to invoke a command within a command. Luckily bash has you covered here with the ability to run subcommands.

```bash
echo I think $(whoami) is a very cool user # I think ubuntu is very cool
```

The `$()` allows you to put bash commands inside of it that then you can use that output as part of an input to another command. In this case, we're using `whoami` to get your username to echo that affirming message out. Let's a more practical one. Let's say you wanted to make a job that you could run every day to output what your current uptime was. You could run this command

```bash
echo $(date +%x) – $(uptime) >> log.txt
```

The `+%x` part is just saying what date of format you want, and I got that from reading `date --help`. So end printing something like

```txt
06/17/20 – 21:38:34 up 8:51, 1 user, load average: 0.00, 0.00, 0.00
```

There are far more useful logs to write but you can see here the power of subcommands. Note you can also use backticks like \` instead of $() but it's preferred to use the $() notation. Notably, you nest infinitely with \$(). For more reasons, [read here][reasons].

[reasons]: http://mywiki.wooledge.org/BashFAQ/082
