---
path: "/writing-your-own-scripts"
title: "Writing Your Own Scripts"
order: "9A"
section: "Shell Scripts"
description: "Often times you want do more than just one command at a time; you want to run many of them. Bash allows you to put many commands into one file to create a program of programs which is called a shell script."
---

Often times you want do more than just one command at a time; you want to run many of them. Bash allows you to put many commands into one file to create a program of programs which is called a shell script.

How that work? Well, secretly, you have been learning a programming language this entire time. Bash is actually a programming language and you have been learning it this whole time. We have been just been running it one line at a time via a REPL. You can actually do this with Python or Node.js too. Try just running `python3` or `node`. It will drop you in a similar style REPL (FYI, to quit either node or python3, use CTRL+D.)

## My First Bashscript

Let's make our first bash script. Let's make make a directory called temp, generate ten files, and exit. Basically we want to make a bashscript that does this:

```bash
mkdir -p ~/temp # -p mean don't error if it exists in this case, it does other things too
cd ~/temp
touch file{1..10}.txt
echo done
```

So let's do that. You can use either vi or nano, both work. So run `vi gen_files.sh` or `nano gen_files.sh`. From there, put the above code in it and save.

Also, you can cd freely within a script: it only changes the working directory for that shell script, not for the user. The user in their interactive shell won't

Now, to run it, do `. gen_files.sh` or `source gen_files.sh` or `bash gen_files.sh`. Any of those work the same way.

## Hashbang

Notice we didn't have to make gen_files.sh an executable file. That's because we're not actually executing it directly: we're executing bash or source (source and . are the same thing) and those are executing our program. But what if wanted to actually make it a new command that we didn't have to feed into source or bash? What if we could basically make it indistiguishable from a normal command like cp or curl? You can! Let's see how.

Open `gen_files.sh` and put this **as the very first line**. I bold that because it must be the first line.

```bash
#! /bin/bash
```

This line (called a shebang, hashbang, or many other things; often ! is called a bang in computing) lets bash know how to execute this file. It must be on the first line and it must start with `#!`. It's then always followed by the absolute path (meaning it starts with `/` and gives you the full path; you cannot give it a relative e.g. `./bash`). This works with Python, for example. If you want a script to executed by python3, you can find the path of any program by saying `which <command>`. So if we want to know where python3 is, we can say `which python3` and get the path from that.

Okay, so now we have a hashbang in place. However the file now needs the executable permission. Let's do that. Run `chmod 700 gen_files.sh`. Now you can run `./gen_files.sh` without anything running as the executable. We need the `./` because gen_files.sh isn't on our PATH yet (I'll explain that very shortly.)

## PATH

Okay, so right now you have to give a path to be able to run gen_files.sh. What if we want to be able to run `gen_files` from anywhere on our computer? We can do that!

Your user a variable set called `PATH`. Your PATH is a series of locations of where programs live. If I say `python3`, it goes through each of those locations and checks for anything called `python3`. If there are two, it uses the first one it finds (the path furthest left in the path.)

You can see your PATH if you run `echo $PATH`. You should see something like `/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin` (it may not be exactly this.)

In general I don't mess with any of those directories. All of those are system wide bin directories (if you had more than one user they'd share them.)
So a good idea is to have your own `~/bin` directory. So let's do that.

```bash
cd ~
mkdir bin
mv gen_files.sh bin/gen_files
PATH=~/bin:$PATH
echo $PATH
gen_files
```

Hooray! Now it works! We added ~/bin to our path so now bash will try to execute anything we put in there. We added ~/bin to the front of our path and that's a good idea. If, for example, wanted a different rm program than the default one, we don't want to mess with the system one, just ours. We would want ours to "shadow" the system one and to not mess with everyone else's rm.

When we set the PATH, we used PATH to define itself. Keep in mind that bash will replace that \$PATH _before_ it runs our command so by the time we try to set the variable it's just a string. That's why that works.

Lastly, we only set the PATH for just this session. Once we close our terminal, it'll go away. However we can add this line to our .bashrc and it'll always get set! Run `vi ~/.bashrc` (or nano) and add this line somewhere:

```bash
PATH=~/bin:$PATH
```

Multipass already had a lot of stuff in there for me so don't get overwhelmed. You can put that line just about anywhere. Whenever you make a change to .bashrc you have to rerun it or it won't take effect on your current session. Run `. ~/.bashrc` and you'll be set.

## Comments

If you want to add comments, you just add `#` and then from there you can put anything after it. You've probably notice me doing it before this.
