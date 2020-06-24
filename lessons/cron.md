---
path: "/cron"
title: "cron"
order: "10A"
section: "Last Thoughts"
description: "Ever had a task that needs to be done every day? Linux has a feature called cron that will run tasks on a schedule. Brian goes over how to set these up."
---

Ever had a task that needs to be done every day? Linux has a feature called cron that will run tasks on a schedule.

There are two ways to accomplish this, an easy way to remember and a slightly less easy way.

## cron folders

Any script you put in any of the following will be run on a schedule:

- /etc/cron.daily
- /etc/cron.hourly
- /etc/cron.monthly
- /etc/cron.weekly

Just make sure they have executable privileges. `sudo chmod +x <file>` will do what you need it to do. Anything in here will be run as root.

## crontab

If you need a more defined schedule (like every five minutes, every other Thursday, every six months, etc.) then you can use the classic way, crontab. With crontab you can define a cron schedule to execute your scripts. Let's say we want to make a new file in `~/cronfiles` every two minutes.

First, let's make the script. In your home directory, create `make-new-file` and put this in there.

```bash
mkdir -p ~/temp-files
cd ~/temp-files
touch file-$(date +%s).txt
```

`date +%s` gives you the epoch timestamp, or how many seconds have elapsed since Jan 1, 1970.

Now, if you do `crontab -e` it will run this as well as root. In this case, we'd like it to run as ubuntu. You can do that by doing `crontab -u ubuntu -e`. The first time it will ask you what editor you prefer to use to edit your crontab. I used vim.

So the comments in the file it explains fairly well what to do but let's go over it. One job will look like this

```bash
* * * * * <the command you want to run>
```

The above five stars would run every minute. Each of those stars represents a frequency. They represent as follows:

`<minutes> <hours> <day of the month> <month> <day of the week>`

The stars mean "every", hence why five stars runs every minute, So if we wanted to command once an hour on the fifth minute, we could do this:

```bash
5 * * * * <the command you want to run>
```

If we wanted it to run every half hour on Sundays, we could do:

```bash
*/30 * * * 0 <the command you want to run>
0,30 * * * 0 <command>
# both equivalent
```

And so on and so forth. You can also use one of the special strings in here too:

```bash
@daily <command>
@reboot <command> # everytime it starts up
@weekly <command>
@yearly <command>
@monthly <command>
@annually <command>
```

So yeah, like regex, I have to look this up every time. I rely a lot [crontab.guru][guru]. It helps me make sure I got it right.

So let's do it for our program. Run `crontab -u ubuntu -e`. Then once you've done that watch your new directory to start populating with files every two minutes.

That's it for cron jobs! Be sure to delete the one we created or it will continue forever and fill up temp files!

[guru]: https://crontab.guru/
