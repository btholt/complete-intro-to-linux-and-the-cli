---
path: "/variables"
title: "Variables"
order: "9B"
section: "Shell Scripts"
description: "As a developer writes more complicated scripts they need to use variables to make it more flexible. Brian goes over how to set and use variables"
---

As you write more complicated scripts you need to use variables to make it more flexible. The way to do this is to use variables. Can you imagine writing code without use variables? It's possible, I suppose, but certainly not fun. And let's not do it!

## Setting a Variable

This is a short section! It's very easy to set a variable. and you've already done it. Modify ~/bin/gen_files to be as follow:

```bash
#! /bin/bash

DESTINATION=~/temp
FILE_PREFIX=file

mkdir -p $DESTINATION
cd $DESTINATION
touch ${FILE_PREFIX}{1..10}.txt
echo done
```

As you can see above, setting a variable is as easy as saying `NAME=value`. You can use quotes too, optionally. You do not have to make them uppercase though I suggest you do as that's what's normal for bash scripts.

Below we're using them like we used environmental variables before (hint: those are really just variables too.)

Let's talk about `touch ${FILE_PREFIX}{1..10}.txt`. Whereas we don't need the `{}` the first two times we refer to a variable, we do on this one. That's because we're inserting it in the middle of something. The `{}` let bash know where the variable names stops. The first two you can totally use them too e.g. `cd ${DESTINATION}` but it's optional. As a reminder, if you use `$()` it means a subcommand like `touch $(whoami).txt`.

## User Input

So what if we want users to be able to define the file prefix? Easy! There's a program called `read` that will get user input and define a variable based on it. Try it by running `read name && echo hello $name`

So let's stick that in there

```bash
#! /bin/bash

DESTINATION=~/temp
read -p "enter a file prefix: " FILE_PREFIX

mkdir -p $DESTINATION
cd $DESTINATION
touch ${FILE_PREFIX}{1..10}.txt
echo done
```

The `-p` flag allows us to **p**rompt the user with a string, letting them know what we're expecting

## Arguments

What if we want the user to be able to pass in the path to where we want to create the directory? We can do that via arguments (sometimes called parameters too.) We want the user to be able say `gen_files ~/different_directory` and use that input as \$DESTINATION. Easy!

```bash
#! /bin/bash

DESTINATION=$1
read -p "enter a file prefix: " FILE_PREFIX

mkdir -p $DESTINATION
cd $DESTINATION
touch ${FILE_PREFIX}{1..10}.txt
echo done
```

Here we just replaced what went into `DESTINATION` with `$1`. We totally could have replaced everywhere there was DESTINATION with $1, but it was easier (and made the script clearer) by replacing the contents of DESTINATION with $1.

`$0` is available here too. It'll be `gen_files`. And if you gave two arguments, the second one will be `$2` and so on and so forth.
