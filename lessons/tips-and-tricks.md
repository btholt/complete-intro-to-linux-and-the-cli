---
path: "/common-tips-and-tricks"
title: "Common Tips and Tricks"
order: "3B"
section: "The CLI"
description: "Brian talks about the common tips and tricks of the command line like what tilda means, how to find commands you previously ran, and other things to make your life on the command line"
---

This section will be a bit of a grab bag of various tips and tricks to make your life easier. I also need to teach this because I use them so frequently I don't even think about it!

# Tilda

One quick tip here is the `~`, called a tilda. On USA layouts of keyboards, it's on the same key as the backtick and to the left of the 1 key. The tilda in bash represents your user's home directory. If you type `cd ~` you'll go to your home directory. If you type `ls ~/snap` you'll list the the contents of `/home/ubuntu/snap`.

# Slash

Similar to the above, if you say `cd /`, the `/` means root. So you'd be at the most root directory of your entire project. It's the beginning of an absolute path, so if you said `cd /usr` you'd end up at the `usr` directory in the root directory.

# Up and Down

You will use this _constantly_. If you hit the up arrow, you'll populate the command line with the last command you ran. If you hit up again, you'll go to the one before that, and so on and so forth. If you hit down, you'll go back to a more recent command. This is super useful and I do it all the time.

# Reverse Search

Instead of having to hit up a bunch of times to find a command you ran forever ago (it keeps track of something like the past 10K commands you've run), you can CTRL+R to do a reverse search (reverse meaning starting with the most recent and working background to most recent.)

Let's say I ran the command `echo "hello my friends"` last week and I wanted to find that command again and I only remember that it had something to do with "friends". I'd type CTRL+R and start typing "friends". If it was the most recent command that I had run with "friends" in it, it'd show up and I could hit enter and it'd run. If there was another command between now and again, I can hit CTRL+R again to look further back in the history. This is also super useful and something I do a lot.

# .bash_history

The previous two things are made possible by a file called `.bash_history`. This file is constantly being appended to when you run commands. You don't really need to ever really edit this file but I wanted you to be aware of where it was and what it does. It's always in your home (`~`) directory. If you're using another shell, it'll be called something else like `.zsh_history`.

If you type `tail ~/.bash_history` you should see what the last few commands you've ran in your previous session of bash. It will only write to .bash_history once you've exited bash, it'll dump the whole session's commands into it.

One reason I want you to be aware of it is that if you say something like `command --password=my_super_secret_password` that will live in your `.bash_history` file unless you delete it. That means if someone gets ahold of your computer, they could potentially nab passwords that way. Just something to keep in mind. You can also edit the `.bash_history` after you run a command like that to delete it and it'll be gone.

# !!

If you type `!!` in bash, it will replace the `!!` with whatever the last command you ran. So if you just type `!!` and enter, it'll run the last command you ran. If you run `sudo !!` it'll re-run the same command again but with `sudo` in front (we'll talk about sudo soon.)

"!" is often pronounced "bang" when it comes to the command line. When I looked at why, I found this on [Wikipedia][wiki]

> In the 1950s, secretarial dictation and typesetting manuals in America referred to the mark as "bang", perhaps from comic books where the ! appeared in dialogue balloons to represent a gun being fired, although the nickname probably emerged from letterpress printing.

So, given that, you'll hear this frequently called "bang bang".

# clear

If your screen is too full, just type `clear` and enter and it'll put you back at the top. You can still scroll back to see old output. CTRL+L will work too, but to be honest I can never remember it so I just use `clear`.

# Copy and paste on the CLI

Let's talk a moment about copy and paste with regards to the command line.

1. If you're on Windows, it's a bit of a trick. CTRL+C and CTRL+V already mean something different to bash (they're signals, we'll talk about those shortly) so those don't work as you'd anticipate. You'll need to use `Shift+CTRL+C` and `Shift+CTRL+V`. Because macOS uses CMD+C and CMD+V for copy and paste and those don't mean anything to bash, nothing changes for them.
2. Be careful of what you copy and paste. If you copy something off a website, using JavaScript they can switch what you highlight with something more nefarious so that when you paste it, it doesn't do what you copied. So I could have copied `echo "this is harmless"` but it actually pastes `send_attacker_my_passwords`. Be careful that you trust where you're copying and pasting from (StackOverflow is fine!)
3. Along with the former point, the attacker can actually even include the return character to execute the command before you can even see what it is. Most emulators (like Windows Terminal and iTerm2) will warn you "hey, we found a return character in this paste, you should meant to do this?" but you shouldn't rely on the emulator to save you.
4. In general it's just helpful to understand what you're doing. If you copy and paste something, make an effort to grasp what it's doing and how.

[wiki]: https://en.wikipedia.org/wiki/Exclamation_mark#History
