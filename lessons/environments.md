---
path: "/environments"
title: "Environments and Processes"
order: "6A"
section: "Environments and Processes"
description: "The environment of a Linux process is key to how it functions. In this section Brian goes over what that means, how to set up your environment, and how to manage it."
---

Whether or not you realize it, your current session of your shell has a bunch of variables set. Most are just set by the OS, some by Multipass (or whatever you're using to run your computer), some by various programs, and some by you.

Go ahead and run `printenv` to see what variable have been set.

You'll probably see a super long list of environmental variables. Various programs will refer to these to modify how they work. And what's great you can modify these, either permanently, just for this session, or just for one command.

So how do we use one? Well, let's give it a shot. Run:

```bash
echo hello my name is $USER
```

You should see `hello my name is ubuntu`. That `$USER` signifies to bash "hey, replace this with a variable. So what if we wanted to change that USER just for one command? Try this:

```bash
USER=brian echo hello my name is $USER # hello my name is brian
echo hello my name is $USER # hello my name is ubuntu
```

As you can see, we add that little `VARIABLE=value` part at the first part of a command to temporarily modify the variables.

## Per Session

So what if we want to modify a variable for a whole session (until you close _this_ open session of bash; if you open another tab of bash, even while this one is still running, it is a different session):

```bash
echo $GREETING # nothing
GREETING=hello
echo $GREETING # hello
```

Again, once we close this window, GREETING goes away.

## Permanent

So what if we want to last forever? There are a few options but really only one is recommend.

The first is editing `/etc/environment`. This will modify _every_ user's environment so it's often not what you want. Each line in that environment file's format should be `VARIABLE=value` with one per line.

Similar with `/etc/profile` and `/etc/bashrc` except with these you can actually invoke scripts within them. Again, this is system-wide and not usually what you want.

## .bashrc and .bash_profile

This is always a point of confusion to me and I have to look it up every time so if that happens to you too don't worry.

In your home directory, there are two files, `.bashrc` and `.bash_profile`. These are the files you need to configure and customize your bash shell. You can set things like telling Node.js you're in development mode, set up git how you want to, customize colors, set path, or really anything you can write a bash command for.

`.bash_profile` is only run on login shells. That is to say, it's only run once for each time you log in to your computer. It is _not_ run after that. `.bashrc` is run on every nonlogin shell, so it's run on every tab of bash you start up. Typically what you want is to run your customizations on every shell so you actually just want to modify `.bashrc` and leave `.bash_profile` alone. Actually, what I'd suggest you do is go put this in your `.bash_profile`:

```bash
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

That way your `.bashrc` is _always_ run. And after you put this in there you can just forget `.bash_profile` exists and always just modify `.bashrc`.

Okay, so now to have variables that affect all shells, you just put a line in there that says:

```bash
export VARIABLE=value
```

and now it will survive when you log out. Just FYI, if you want that variable to affect _this_ shell, you'll have to do a `. ~/.bashrc` so that it will reload your .bashrc. The `.` means execute in this context. You also could say `source ~/.bashrc` and that would work too.
