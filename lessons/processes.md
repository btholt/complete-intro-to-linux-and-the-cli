---
path: "/processes"
title: "Processes"
order: "6B"
section: "Environments and Processes"
description: "One of the core components of Linux is managing processes. In this section Brian talks about what processes are, how to interact with them, and why they're important."
---

At all times with Linux a certain amount of processes will be running. A process is any sort of command that's currently running. For example, if you have a shell open, you're running bash as a process.

Go ahead and run `ps` and see what it outputs. For me the list is pretty short because it's showing just what me, ubuntu, is running which isn't much. ps stands for processes snaphshot. To prove my point, try the following.

```bash
sleep 10 &
ps
```

You'll notice now you'll have a sleep process running as well since you now own that process. So let's dissect a few things here. We'll get to what the `&` means in a bit (it means run this in the background.) `sleep <number>` just makes a process that waits for `<number>` seconds and then exits. So `sleep 10` waits for ten seconds and then exits.

Every process you run is assigned a process ID which everyone refers to as a pid. Every process is also owned by a user. Some processes will always be owned by root, others by whatever user you are, and others still. If you look at your ps output, you'll those random numbers next to what you're runnning. This is the pid.

Sometimes you need to kill an in-flight process. You can do that by using `kill` and tell it what signal (same signals we were talking about earlier.) Let's try that.

```bash
sleep 100 &
ps # find the sleep pid
kill -s SIGKILL <the pid from above>
ps # notice the process has been killed
```

Note you'll frequently see `kill -s SIGKILL` as `kill -9`. They mean the same thing. There are other numbers but I never remember what they are so I just use `-s` for things like `SIGTERM`.

So what else is your computer running right now? Try `ps aux`. This will show you everything running from everyone, including all system processes. It should be substantially longer. You'll see a few processes running by you, many from root, and a few from others like systemd+, daemon, and others. This list can be overwhelming so I'll frequently feed this into grep to find things I'm looking for. Try this:

```bash
ps aux | grep ps
```

You'll notice the list is pared down to just things have `ps` in them (including the `grep` command itself)

## Foreground and Background

A process can either run in the foreground or the background. If something is running in the foreground, you'll see all the output and you will wait until it's finished. If it's running in the background, you can still see the output (unless you redirect it) but you can start doing other things. When you put the `&` at the end it means "I want this to run in the background" (and hence why we've been using it before.)

Go ahead and try `sleep 2 &` to see this. After two or more seconds, hit enter again. Bash will let you know the job completed.

Okay, so we see how to do that. What if we want to pause a currently running process? Try this:

```bash
sleep 100
# hit CTRL + Z
jobs # notice process is stopped
bg 1 # it's the first and only item in the list, the number refers to that
jobs # notice process is running
fg 1 # reattch to the process
```

Notice you can run `jobs` with a `-l` if you need the pid to kill it.

This is a great way to start and stop scripts and in particular if you have a long running task that you want to complete but don't want to wait and want to do other things. Do be aware that if you close your terminal however that it will kill all your running jobs. You'll need to use something like [screen][screen] or [tmux][tmux] to accomplish that and those are beyond the scope of this course (I don't frequently use them so I don't teach them.)

So when would you do this? Maybe if you needed to install something that could take a while or run a script that does some cleanup. You need it to run but you don't need to watch it. These are all great cases to send tasks to the background.

[screen]: https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/
[tmux]: https://www.howtogeek.com/671422/how-to-use-tmux-on-linux-and-why-its-better-than-screen/
