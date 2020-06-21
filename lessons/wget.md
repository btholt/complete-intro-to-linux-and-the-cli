---
path: "/wget"
title: "wget"
order: "7C"
section: "Networking and the Internet"
description: "Frequently developers will want to interact with the network. Linux provides two command lines that are very well poised to help a developer out. Brian talks about the first of the two most popular, wget."
---

Frequently you will want to send requests to the Internet and/or network. The two most common tools to do that are wget and curl. Both of these are common to find in use so I'll take the time to show you both but they do relatively do the same thing. In general I'd suggest you stick to using curl; it's a more powerful tool that can do (almost) everything wget can.

## wget

wget works like cp but instead of copying a local file you're copying something off the net. So you'll identify a remote file (usually a URL) that you want to fetch and save to your local file system. So let's give that a shot.

We're going to go grab a [2048][2048] game off of GitHub written by the [GitHub user mydzor][mydzor]. (I forked it to my GitHub in case I ever need to update this course.)

```bash
wget https://raw.githubusercontent.com/btholt/bash2048/master/bash2048.sh
chmod 700 bash2048.sh
. bash2048.sh
```

That wget gets the file, the chmod 700 makes the file executable, readable, and writable for the current user (and no one else) and the `. bash2048.sh` executes the game. Pretty cool, right? Very cool project. Feel free to play for a second. When you're done, hit CTRL+C to exit. It does exit the shell entirely so may need to open a new shell after via Multipass.

wget can do a lot more than this, including be able to post and various other ways of shaping requests. Just say `wget --help` to see the myriad options available to you.

So why learn a bit about wget? wget is a GNU project and it's available _everywhere_. Frequently you'll find tutorials that use it so I wanted you to have a bit of familiarity with it. Now let's get into curl which is the one I recommend you invest more into that wget. Know and be aware of wget but learn curl.

The one case you'll want to use wget is if you want recursive downloads of site. wget has a peculiar ability that it will read the incoming document and download all the links it finds within it, crawling all the documents until it downloads all the files it founds. That can occasionally be useful and not something curl does by itself.

[mydzor]: https://github.com/mydzor/bash2048
