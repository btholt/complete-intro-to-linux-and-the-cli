---
path: "/anatomy-of-a-cli-command"
title: "Anatomy of a CLI Command"
order: "3A"
section: "The CLI"
description: "Brian talk about what the command line is, why you'd want to use it, and how to get started with it"
---

So now you should have a Linux command line open and ready to go. If this is your first experience with a command line prompt, don't worry! This course was made for you! We'll go through together what this strange beast is.

What you're looking is often called a REPL, a **R**ead **E**valuate **P**rint **L**oop. It's basically an interactive way of programming where you're writing one line of code at a time, feeding data in and out of little programs. Using commands here, you can navigate around you computer, read and write data, make network calls, and all sorts of other stuff. Basically most anything you can do with a desktop you can do with a command line, it's just a little less obvious how to do it.

The way a REPL works is that you send one command at a time and the shell runs the command and returns to you a result. During the course of running that one command, it may print some things out. And you can, using some rudimentary programming syntax, write a line that runs multiple times (or, another way of saying "runs multiple times" is looping.) That's it! That's whole concept of what we're going to learning today.

# Shells and Emulators

The first thing we should is get some terminology out of the way. You are using a **shell** right now, and that shell is almost certainly called [bash][bash] (it definitely is unless you changed something), the **B**ourne **A**gain **Sh**ell (which is making fun of the Bourne shell which bash replaced.) It's by far the most common shell and is over 30 years old.

There are other shells and we'll talk more about them later, the most of common of which are zsh, ash, PowerShell, and cmd.exe. We'll chat about those later.

Your shell is running inside some sort of emulator. That emulator could be Terminal.app or iTerm2 if you're on macOS, or it could be the Windows Terminal if you're on Windows 10. This the window that's containing the shell, and you can use that emulator to switch out what shell is running inside of it. For now we want to be on bash (or zsh is basically the same too.)

# File System

The way bash works is that you are always in a folder somewhere on your computer. Think of it like youre computer's File Explorer or Finder: you can navigate into and out of folders while you look for files.

Our first command we're going to run in your computer is `pwd`. So type `pwd` and hit enter. This will send the command `pwd` to the shell which will evaluate that and print out the answer.

`pwd` is a little program that tells you the current **path** of where you are in the file system. `pwd` stands for present working directory. It's basically like asking the computer "where am I right now?" Mine says `/home/ubuntu`. I am inside of the `ubuntu` folder which itself is inside of the `home` directory. The terms **folder** and **directory** are interchangeable and I say both all the time.

This is what paths look like, `/<outermost folder name>/<a nest folder>/<a yet more nest folder>`. The `/` represents a level of nesting inside of another folder. The **root** directory is at `/`.

So by typing pwd, we've successfully run our first program! Congrats!

# Help

I forget all the time how to use various different programs. `pwd` is very simple but others are way more complex. For _most_ programs, you can add `--help` at the end and it'll usually spit out some brief instructions of how to use the program. This one isn't super necessary right now but go ahead and type `pwd --help` to see its help text. `--help` is called a **flag**. We'll talk more about those later.

# Navigating Around

So right now we're in the home directory of the `ubuntu` user if you've been following along with me. Every user gets their own folder in the `/home` folder. Since our user is named ubuntu, they have their own folder called ubuntu. Let's first see if we have any files inside of our home directory. Type `ls` and hit enter. `ls` stands for list, and it means show me everything inside of the folder what I am.

I see two things, `Home` and `snap`. I don't know what those are or why they're there but I assume it's something that Ubuntu creates for you. Let's navigate outside of our home directory and into the `/home` directory. We'll use a different program called `cd` to do that. `cd` stands for change directory. Type `cd ..` and hit enter.

`..` is shorthand that means "up one directory." Because I wanted to go from `/home/ubuntu` to `/home`, I sent the command `cd ..` and that `..` means up one directory. There's also `.` which means "this directory". So you if you say `cd .` you won't go anywhere! It means change directory to this directory that we're already in, which doesn't do anything.

Type `ls` again. I only see one thing in there, `ubuntu`. If we type `cd ubuntu` we'll navigate back into the ubuntu directory. Between `ls`, `cd`, and `pwd`, you can navigate basically anywhere on your computer.

`..` and `.` are called relative paths. They're paths which are relative to where you are. You can also give `cd` an absolute path as well. If we say `cd /home/ubuntu`, it'll navigate directly to that folder from anywhere. It's like the difference between saying "I live at 123 Main St in Seattle" (an absolute path) and "I left three houses down from here" (a relative path.) The first refers to the same house no matter where you are in the world whereas the second only makes sense based on where you are.

## Arguments / Parameters

In the case of cd, we're passing data into cd to tell it how to run. If we run `cd ..`, the `..` is an argument or parameter (basically the same thing, for this purpose the two terms can be used interchangeably.) This is just how you pass information into the program so it can do what you want it to do. Not all programs need parameters or sometimes they're optional. Let's look at `pwd`: it never needs any arguments. Or `ls` which has optional arguments. If you say `ls`, it's the same as saying `ls .`. The `.` in this case means "this directory". So if I say `ls ..` it'll give me what's the content of the directory one up from where I am. Or if I say `ls /home` it'll give me the contents of the `home` directory. In these examples, I've given you arguments that happen to be paths but that isn't always true. Arguments are just bits of information you give to a program, frequently they're paths to files or folders but they can often be other things.

Let's try one that isn't a path, `echo`. Try typing `echo hi`. It should echo back to you "hi". This is useful when you're writing your own scripts to print out things to the user. In thise case, "hi" is the parameter.

Or let's `which`. `which` will tell you the path to where the program you're running is. If I say `which ls` it'll tell me where `ls` is stored (in my case, `/bin/ls`.) `ls` would be parameter.

## Flags

We already talked about `--help` which is a flag but this commands can take all sorts of flags to customize how they'll act. Like parameters, they're bits of information that change how the command works. `ls` has lots of flags so let's try that.

Try `ls` first. Now try `ls -l`. You'll see it's relatively the same content just presented differently. Now it not only shows us what is in the directory, it shows us the permissions of the files (we'll talk about those later,) the user who made it, the group who that user belongs to, the size of the file in bytes, when it was last modified, and the name of the folder. The `-l` causes ls to use this long format instead of its normal, terse way of listing stuff out.

Let's try using two flags. Try `ls -l -a`. The `-a` means show hidden files too. Anything that begins with a `.` in Linux is considered a hidden file. These are usually configuration files that don't need to be shown all the time. By passing the `-a` we can tell `ls` to show us all the hidden files too.

Many programs allow you to be lazy and combine flags together. In this case, we can say `ls -la` and that's the same as `ls -a -l` (order doesn't matter either.) This is usually true but it depends on the individual command you're running.

I've shown the shorthand way of doing flags, `-a` with one dash and one letter. There's often a long form way of doing it as well. For example, `ls -a` is the same as doing `ls --all`. When you have two dashes, you're doing the long-form way of doing it. That's important because `ls -all` would be passing the flags `-a`, `-l`, and `-l` again (which it would ignore) so it's important to use two dashes to let the program know you mean one flag. You can mix and match too.

You can pass parameters to flag too. Let's say in our home directory we wanted to not show the `snap` directory in our output. We can use flags to do that. If we type `ls --ignore snap` it will not output snap. This can also be written as `ls --ignore=snap` to make it clearer what that ignore is referring to. We can also say `ls -I snap` for the shorthand. We can't use the equal here. Lastly we if wanted to do an `ls` on the `/home` directory and not show the `ubuntu` folder, we could type `ls --ignore ubuntu /home`. In this particular case, the order is important. Immediately after ignore, the part you're trying to ignore is passed, then last the parameters to `ls` as a whole is passed. This is why some people like that equals. `ls --ignore=ubuntu /home` is very clear. Up to you.

# Tilda

One last quick tip here is the `~`, called a tilda. On USA layouts of keyboards, it's on the same key as the backtick and to the left of the 1 key. The tilda in bash represents your user's home directory. If you type `cd ~` you'll go to your home directory. If you type `ls ~/snap` you'll list the the contents of `/home/ubuntu/snap`.

[bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell)
