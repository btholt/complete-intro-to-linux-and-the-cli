---
path: "/signals-and-the-power-of-ctrl"
title: "Signals and the the Power of CTRL"
order: "3C"
section: "The CLI"
description: "Brian talks about how and when to use CTRL when working with the command line: to send signals to bash and to accomplish shortcuts"
---

CTRL is a very commonly used key when on the command line. It's used for shortcuts and also to send very specific signals to bash. Let's start with some of the short cuts.

Actually, so much so, that I've remapped my caps lock to be CTRL since that's a lot easier for me to hit. You don't have to but you might think about it. Here's how to do that on macOS and Windows

- [macOS][mac]
- [Windows][win]

# Shortcuts

- CTRL + A – takes you to the beginning of the line
- CTRL + E – takes you to the end of the line
- CTRL + K – "yank" everything after the cursor
- CTRL + U – "yank" everything before the cursosr
- CTRL + Y - "paste" (paste in quotes because it doesn't actually go into your system clipboard) everything you yanked
- CTRL + L - clear the screen
- CTRL + R – reverse search through history

# Signals

A signal is a notification that you send to a program. It's up to the program to understand what to do with that. It's like if your friend sent you a text message that said "come over." You (the program) are not obligated to do anything but the intent of the text is obvious, they (the user) want you to come over. The same applies here to programs. The good news is that generally everyone abides what's expected: if you send them a message to quit, they quit.

## CTRL + C – SIGINT

If you hit CTRL + C while a program is running, you're telling it to **int**errupt what it's doing and stop. You'll use this constantly. One reason is some processes are designed to never quit until you send them a SIGINT to stop. A good example of that is the `yes` command. All `yes` does is spam the string "y" until you tell it to quit. A lazy programmer wrote it so it could automatically answer "yes" to all the prompts for interactive programs. (You can also say `yes n` or `yes whatever` and it'll spam whatever you want it to.)

So go type `yes` into your terminal. You'll find yourself with an infinite wall of ever-spamming `y`s in front of you. To stop it, hit CTRL + C and it'll stop immediately.

Another good use case is that you started running a command and you didn't mean to. You can send a SIGINT and start again.

Again, some programs may not respect CTRL + C, and nearly all of them will take time to clean up after themselves when they do receive a SIGINT.

## CTRL + D – SIGQUIT

Less useful but still good to know nonetheless is what CTRL + D does. Many programs won't respond to a SIGQUIT (some might, it's up to them) but bash itself will. If you're in a bash prompt and it want it to exit (like if you're remotely connected to a bash server for example), if you hit CTRL + D it'll tell the bash session to end. You also could close the window or just type `exit` and it'll exit too.

## SIGTERM

There is no shortcut for SIGTERM but I wanted to make sure you knew it existed. If I use the `kill` program to kill another program, the way it does that is by sending a SIGTERM to the program. The difference is that if the program doesn't exit, kill will still shut down the process. We'll talk later about `kill` but know it's there.

## SIGKILL

If you want a program to stop and stop **now**, you can do `kill -9` (or `kill -SIGKILL`) and it will send the SIGKILL which means to the program "don't clean up, just stop as soon as possible.) Again, we'll cover this in a bit.

## More signals

There are many signals and I don't know what 10% of them do. If you run `kill -l` in your terminal, it'll show you all the signals your computer supports. Most of these are used for processes to communicate amongst each other or with the shell, like SIGALRM tell your emulator to make a beep. However only really the ones above you are the ones you care about.

[mac]: https://support.apple.com/guide/mac-help/change-the-behavior-of-the-modifier-keys-mchlp1011/mac
[win]: https://github.com/microsoft/PowerToys#keyboard-manager
