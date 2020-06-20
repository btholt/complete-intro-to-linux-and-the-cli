---
path: "/sftp"
title: "SFTP"
order: "7B"
section: "Networking and the Internet"
description: "Once you have set up ssh you automatically get sftp for free! sftp allows you to securely transfers files to and from a remote machine to your local machine."
---

Sometimes you need to transfer files between two computers. This can take the form of either transferring files from you local computer to your remote server or from your remote computer back to your local computer. Before we had more mature continuous deployment tools like Azure Pipelines, Travis CI, or GitHub Actions, we often used a tool called ftp (file transfer protocol). While it worked and it was a relatively simple and straightforward of doing things, we moved onto to more reliable tools. However ftp evolved into **s**ecure ftp which we still use today.

## How to set up sftp

Okay, buckle up. This is your biggest challenge yet.

Just kidding, you're already done. One of the best things about sftp is that it works 100% over the same ways that ssh does so if you've set up ssh you've inherently set up sftp too (it possible to set up one and not the other but you have change some options.) This was a welcome departure from ftp which has its own setup process and ports that had to be managed.

Okay so using the VMs we set up in the previous section, let's sftp into secondary from primary. The sftp interactive shell is similar to a less friendly and stripped down version of bash. The thing to keep in mind is you're in _two_ directories at the same time as opposed to normal bash when you're just in one. With sftp, you have a local context and a remote context. In order to run a local command, tack an `l` to the start of whatever command you're running, like `lls`, `lpwd`, or `lcd`. When you want to do it on the remote machine, just run the commands like normal, like `ls`, `pwd`, or `cd`.

```bash
sftp brian@<the same ip from the previous step>
lpwd # ubuntu's local home directory
pwd # brian's remote home directory
lls # the list of files in ubuntu's home directory
ls # the list of files in brian's home directory
help # see all the commands you can do
```

Feel free to navigate around. I tend to not spend too much time inside sftp because it's easier do everything in ssh except file transfers. The two key commands you need to know here are `get` and `put`. It's from the perspective of your local computer so in this case we're connecting from primary to secondary, so `get`ting something will download it from secondary and `put`ting someting will upload it.

If you have some files already laying around go ahead and toy with it. This is a great thing to use with `tar` as well so you can bundle up packages of files before sending them to a different computer.

So now we want to upload a file. But hey, you may not have a file to upload right now. It'd be great if we could run a quick command on our local computer. And you can! Just prefix it with `!` and you can quickly run a `touch` or a `tar`.

```bash
!touch file-to-put.txt
```

Obviously I wouldn't encourage you to do a lot here; if you need to just disconnect and then reconnect later, but it's helpful for quick things you need to do.

```bash
put file-to-put.txt putted-file.txt # second argument is optional, if you omit it'll just use the same name
get putted-file.txt gotten-file.txt # same thing, second one is optional
```

Here we went through the very fruitful exercise of putting a file on a server, renaming it and then downloading it again. But now you can see how you can download and upload files.

And that's it! sftp can do a few more things like make directories and chmod/chown stuff but I'll leave you to poke and prod that as you need to.
