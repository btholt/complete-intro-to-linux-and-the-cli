---
path: "/snaps"
title: "Snaps"
order: "8C"
section: "Package Management"
description: "The latest in Ubuntu is snaps, a new format for installing dependencies. Brian goes over what snaps are and whether you want to use them."
---

Okay, so a bit of history here is necessary and I don't want to delve _too much_ into it. It has to do with how Linux programs are packaged and there's a decent amount of controversy and disagreement around the best way to do it is.

Canonical a few years announced a new way of packaging app called snaps. Snaps are advantageous over what was there before (apt typically deals with debs) for a few reasons:

- They're totally self contained. They package all their dependencies with them
- They're sandboxed. They can't mess with your system
- They can update by just downloading the difference between ther versions

Debs are none of those but they've been around forever. Snaps can also run on other Linux distros like Fedora, Gentoo, and CentOS as long as you download the program that runs them (snapd.) There are two other chief competitors in this improved portable packaging format: AppImage and flatpak. Suffice to say, I'm not going to get into which is best because it's nuanced and I don't have a strong take on it, I just use Snap because it's made by Canonical, the same people who make Ubuntu. If you want more depth, [click here][snap-vs].

## What is a Snap

As stated above, it's just another way of packaging an app up and for the most part you don't really have to care. There's a few things that you do need to keep in mind however:

- Snaps update automatically and you actually can't stop that from happening really. Debs update whenever you choose to do so
- Snaps are safer. They're sandboxed and cannot break out of their home folders. Debs really can do whatever they want
- Snaps are also how Ubuntu lets publish GUI apps like Visual Studio Code, Spotify, Firefox, etc. There's more than just command line tools. [See here for the store][snap].
- Debs are reviewed before they're allowed onto the registry. They have to be or else renegade devs could publish anything they want. Snaps, due to their sandboxing, don't have to be.

Which should you prefer? Often things like like [node][node] and [lolcat][lolcat] are available on both. I think you're fine with either. When I use a Linux desktop I 100% prefer snaps for desktop apps like Visual Studio Code, Spotify, and Firefox, but for commandline tools I tend to just follow whatever the instructions suggestion. You're good either way.

Much of the same functionality of apt works the same with snap

```bash
snap help

sudo apt remove lolcat
sudo snap install lolcat
ls -lsah lolcat

sudo apt remove nodejs
snap info node
sudo snap install --channel=14/stable --classic node
# restart your shell by exiting and starting a new shell
node -e "console.log('hi')"
```

The first one should be pretty straight forward. It will now be attached to the stable channel of lolcat so if they dev ever updates the stable channel you'll get that update for free.

The second is a bit less straightforward. First of all, we attach ourselves to the 14/stable channel. We'll get all Node.js 14 stable updates automatically. That works well for me locally but it can be a bit scary to do that on a web server. In this case I'd want to have more control over the updates.

We also specify `--classic`. This is basically saying "it's okay if this app isn't sandboxed." Node.js won't install otherwise. In these cases make sure you trust the provider of the snap. [NodeSource][nodesource] (who maintain the snap) are indeed worthy of your trust. Also you have to restart the shell so it can properly initialize itself.

That's it for snaps!

[snap-vs]: https://askubuntu.com/questions/866511/what-are-the-differences-between-snaps-appimage-flatpak-and-others
[snap]: https://snapcraft.io/store
[node]: https://snapcraft.io/node
[lolcat]: https://snapcraft.io/lolcat
[nodesource]: https://nodesource.com/
