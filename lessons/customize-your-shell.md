---
path: "/customize-your-shell"
title: "Customize Your Shell"
order: "10B"
section: "Last Thoughts"
description: ""
---

All engineers love to customize their tools to their absolute perfect liking. Your shell and emulator should be no different. I'm going to show you a few things you can do to make your shell your own.

## Prompts

Your prompt is the bit that shows up on every new line. By default it's something like `ubuntu@primary:~$`. You customize this by changing the environment variable `PS1`. If you say `PS1="hi "` you'll change you'll have hi at the beginning of every line. There's a myriad of things you can do hear and I'll let you discover those things yourself.

More easily you can install someone else's. I'll show you quickly how to install one of the more well known ones, [powerline][powerline].

Run the following: `curl https://raw.githubusercontent.com/riobard/bash-powerline/master/bash-powerline.sh > ~/.bash-powerline.sh`

Then add this line to your `~/.bashrc`: `source ~/.bash-powerline.sh`. Then run `source ~/.bashrc`. Voila! Now you have a very fancy prompt that will track git and all sorts of fun stuff for you. You can find other very cool prompts if you just search for bash prompt.

## Colors

Multipass ships with nice colors, particularly for `ls` which is not colored by default, but sometimes you do have to set them yourself.

In general there's a very rich language to color that doesn't suit us to get into but it just involves strings of characters that represent colors. A good example is as follows:

```
echo -e "This is how you make text \e[32mgreen"
```

The `-e` means looks for escapes (the `\` stuff.) Otherwise it'll ignore them.

Mostly just wanted you to be aware that they exist if you need them.

## awesome-bash

Lastly, [here's a great list of cool things for bash][awesome]. Definitely have a look around and you'll find all sorts of cool things bash can do!

[powerline]: https://github.com/riobard/bash-powerline
[bash]: https://github.com/awesome-lists/awesome-bash
