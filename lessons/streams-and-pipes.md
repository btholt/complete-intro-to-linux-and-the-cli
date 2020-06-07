---
path: "/streams-and-pipes"
title: "Streams and Pipes"
order: "5C"
section: "Files, Pipes, and Permissions"
description: "Linux has an interesting concept called streams. The most common of these are stdout, stderr, and stdin. Brian goes over what streams are and how to pipe them together."
---

Linux has an interesting concept where basically all input and output (which are text) are actually streams of data/text. Like plumbing pipes where you can connect and disconnect sections to redirect water to different places, so too can you connect and disconnect streams of data.

# The Standard Streams

There are three standard streams, stdin (said standard input or standard in,) stdout (said standard output or standard out,) and stderr (said standard error or standard err.) stdin is an input stream to a program and the other two are output streams. stdout for all non-error text, the normal output. stderr is just for error information.

## stdout

stdout is where all normal output goes. If it's not caught or redirected, stdout by default goes to your terminal screen (as does stderr too.) A good example of that is our friend cat. cat take a file and concatenates it to the stdout. If you do `cat file1.txt` and don't redirect that stream somewhere else, it ends up at the terminal screen and you get the ouptut of the file. What if we wanted to redirect the output? We can!

Try this.

```bash
echo "this will get output to the file and not to stdout" 1> new-file.txt
```

The `1>` redirect stdout from heading to the terminal and into a file, new-file.txt. We don't see the output of echo; it's been redirected. So what if we wanted to do that to cat?

```bash
cat new-file.txt 1> yet-new-file.txt
```

What do you think happened here? We concatenated new-file.txt to stdout and then redirected stdout to a file. So basically we did `cp` with more steps and concepts. But hey! Now you can see the power of piping stdout to different places.

## Replacing vs appending

So far we've been replacing files with `1>`. What if we want to append? That is to say, instead of replacing the file's contents, we just want to add new stuff to the end? That's where `1>>` comes in (this will work with all streams, not just 1 / stdout.)

```bash
ls -lsah 1> ls.txt
ls -lsah 1>> ls.txt
```

What would you expect the output of ls.txt to be now? It's two outputs of `ls -lsah`.

## stderr

So let's talk about the other output stream, stderr. While `1>` redirects stdout, `2>` redirect stderr. So if I say `ls -lsah 2> error-log.txt` what would you expect to happen? You'll see the normal output of stdout to the terminal since we didn't redirect it and it will create a new file called error-log.txt with nothing in it.

Okay, so let's do something that causes an error then. Run `cat file-that-doesnt-exist.txt 2> error-log.txt`. So what happens here? Nothing gets output since nothing is concatenated to stdout (since that file doesn't exist) and `cat: file-that-doesnt-exist.txt: No such file or directory` gets output to error-log.txt.

All the same things apply too with `2>` for replacing a file and `2>>` for appending.

Note, so far everything we've done has had either error information or normal info and not both. Normally it'll have both.

## Redirecting both stderr and stdout

Okay so now we want to redirect both stderr and stdout. Easy

```bash
ls -lsah 1> stdout.txt 2> stderr.txt
```

This will redirect each of those streams to different files.

We can have them go to the same file too!

```bash
ls -lsah 1> ls.txt 2> ls.txt
```

Or, even more easily,

```bash
ls -lsah > ls.txt
```

Yes, if you put no number there, it will output _both_ streams to the same file. Honestly this is what I normally do unless I'm keeping track of an error log separately (like I would on a production machine) but for just every day stuff, this is normally what I'd do. `>>` will work too for appending.

## /dev/null

Sometimes you want to run a program and you don't really care what the output is; you just want to run the program. Say hello to `/dev/null` which is the programming equivalent of the infinite abyss. Anything that gets output to /dev/null is thrown away. Let's say you're running a program that's very noisy and you really only care if there's an error.

```bash
ls -lsah 1> /dev/null # assume this is a very noisy program
```

This will run the command and only print the errors. Everything else gets chucked into the infinite abyss. Useful sometimes

## stdin

Okay, so now we've talked exhaustively about the output streams, let's chat a minute about input streams.

stderr and stdout direct the text from a program to a file. With stdin, we can direct the contents of a file into a program via the stdin. Try this

```bash
cat < ls.txt
```

Now, again, not entirely useful, since `cat < ls.txt` would have done the same thing. But let's say it's a very long file and we want to find one very specific line. We could do this:

```bash
grep "error-log.txt" < ls.txt
```

We'll talk about the ins and outs of grep in a later chapter but for now it's enough to know it lets you find things in a text stream. In this case, we took the contents of `ls.txt` and connected that stream to grep which grep then looked for a line that contained "error-log.txt" in it. So that's what `<` does, it take a file and puts that into stdin so a program can use it.

## Using stdin and stdout

What if we want to have both stdin and stdout and then throw away the errors?

```bash
grep "error-log.txt" < ls.txt 1> ls2.txt 2> /dev/null
```

Just like that! Order isn't important.

## Why?

Hopefully by now you understand how this works but you may be asking why? All these examples seem contrived and so far they have been. But when you start running commands yourself you'll find that a lot of the times you need to keep track of what happens. A good example is if I'm running a web server from a computer: I want the output from the server (like who logged in, anayltics, metrics, security stuff, etc.) to live in one place so I can keep track of the logs and I want the error logs to live in another place so I can debug successfully what's going on with my server. In this case, stderr and stdout are _very_ useful. What if I need to to input some secrets like passwords and cache keys to a server in order to start it up? stdin is definitely one way to do that.

## Pipes

Okay so we've exhausted you can do with just files but what if we want to use the output of one program into another? Enter the pipe (sometimes called vertical bar,) `|`. This takes what one program outputs and puts it into the next one. This opens up a lot of possibilites. Let's redo that one we had above with grep using cat and |.

```bash
cat ls.txt | grep "error-log.txt"
```

cat will concatentate ls.txt to stdout and then `|` will take the output of that and run that as stdin to grep.

Let's try another using ps. We'll get to processes later but ps outputs all running processes. It's usually a very long list since Linux has a lot running all the time. Try running `ps aux` and see how long it is. It can be much longer too if you're running a server. Notice the last thing it outputs is the `ps aux` command itself that you used to find it. Let's use grep to find just that line and nothing else. Try this:

```bash
ps aux | grep "ps aux"
```

This should output two lines, the `ps aux` call and the `grep` we're running to find that ps aux. A little self referential but the point here is that we're able to find just what we need and leave the rest behind. And we're doing that with the power of pipes. `ps aux` find all processes and outputs that to stdout. We then take that stdout and run that as the stdin to grep. grep then finds just the lines it needs and outputs just those to its stdout. At this point we don't have anything else redirecting output streams so it gets output to the terminal window. We absolutely could redirect that out to a file using `1>`.

Let's a bit trickier one. If you do `rm -i *.txt`, it'll try to remove all files with .txt extensions. It'll all confirm with you on each one to say either y for yes or n for no. Try it and say "n" and hit enter for each one. Notice afterwards you won't have deleted anything.

Lots of Linux programs function this way of answering y or n questions. Someone got sick of doing it and wrote a program to just answer `y` nonstop called `yes`. We looked at this before. But now let's yes it. Let's make it say n to all those questions.

```bash
yes n | rm -i *.txt
```

The first command, `yes n` outputs infinite `n`s to stdout. `rm -i *.txt` uses those from stdin to answer `n` to every question it asks. Pretty cool, right?

We'll use pipes a lot. By this we can use smaller commands like grep, cat, yes, and other to make higher level programs. We're using bash to program! Bash scripting.
