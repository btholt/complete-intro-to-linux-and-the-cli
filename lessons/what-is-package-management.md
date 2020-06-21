---
path: "/what-is-package-management"
title: "What is Package Management"
order: "8A"
section: "Package Management"
description: "One of the best part of Linux is its infinite ocean of useful packages. Brian talks about the Ubuntu ecosystem and the ability to get packages from apt install."
---

Ubuntu by itself is a very useful system but we begin to see its infinite possibilites when we dive into the packages that are available to it. Ubuntu comes with its own lovely package manager tools and I'm going to show you how to use some of them to get more tools so you can do more cool stuff.

## Each Linux Distro Has Its Own

We'll be going over specifically what Ubuntu has for package management but just be aware that each Linux distro has its own package management tools.

- Debian has dpkg. Because Ubuntu is based on Debian it also has dpkg installed and available to use.
- APT (advanced packaging tool) is based on dpkg and available to all in the Debian family of distros
- Red Hat had RPM, Red Hat Package Manager
- Similar to how APT is on top of dpkg, YUM is on top of RPM to make it easier to use. DNF is the next generation of YUM
- Arch has Pacman
- Alpine has APK

Even macOS has one with Homebrew and Windows with its new winget system. Again, we'll be focusing on APT and Snap today.

## dpkg

Today we're not going to be touch dpkg at all. But it is there and you can use it. It's from Debian, the upstream for Ubuntu, and it's generally a lower level tool for more fine grained control at the cost of being a lot more difficult to use. I never use it.
