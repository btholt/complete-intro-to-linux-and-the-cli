---
path: "/conditionals"
title: "Conditionals"
order: "9C"
section: "Shell Scripts"
description: "In order to write useful bash scripts a developer needs if statements. Brian goes over how to make more complicated scripts using these control structures"
---

In order to write useful bash scripts you need if statements. Let's go over how to make more complicated scripts using these control structures.

## Conditionals

A conditional is a statement that only runs if a condition is true. Let's say we want to use the path `~/temp` if the user don't provide an argument.

```bash
#! /bin/bash

DESTINATION=$1
read -p "enter a file prefix: " FILE_PREFIX

if [ -z $DESTINATION ]; then
  echo "no path provided, defaulting to ~/temp"
  DESTINATION=~/temp
fi

mkdir -p $DESTINATION
cd $DESTINATION
touch ${FILE_PREFIX}{1..10}.txt
echo done
```

The `[]` are a special notation which actually translate to `test` commands. So our condition actually evaluates to `test -z $DESTINATION`. This is useful to know because if you forget how to do conditional checks you can always run `man test` and it's a pretty understandable list of the various things you can do. In this case, `-z $DESTINATION` is checking to see if DESTINATION is a zero length string which would mean the user didn't provide anything. Go ahead and try

```bash
test -z ""
echo $? # 0, this is true
test -z "lol"
echo $? # 1, this is false
```

There's a ton operators you can do with test. Here are some examples:

```bash
test 15 -eq 15 # 0
test brian = brian # 0
test brian != brian # 1
test 15 -gt 10 # 0 gt means greater than
test 15 -le 10 # 1 le means less than or equal to
test -e ~/some-file.txt # tests to see if a file exists
test -w ~/some-file.txt # tests to see if a file exists and you can write to it
```

I'll stop here but you get the point. There are a lot. Again, check out `man test` to see all your options. So you can translate these into if statements like this:

```bash
if [ -w ~/some-file.txt ]; then
  echo "hooray! I can write to this file"
fi
```

The `[]` take the place of the test command.

# else and elif

What about else and else if? Create a new file called ten.sh. Put this in there

```bash
if [ $1 -gt 10 ]; then
  echo "greater than 10"
elif [ $1 -lt 10 ]; then
  echo "less than 10"
else
  echo "equals 10"
fi
```

This will let the user give an argument of a number and it will tell you if it's greater than, equal to, or less than 10 using conditionals.

## Case Statements

Let's make one more quick program. Make a file called faces.sh. Put this in flag.sh

```bash
case $1 in
  "smile")
    echo ":)"
    ;;
  "sad")
    echo ":("
    ;;
  "laugh")
    echo ":D"
    ;;
  "sword")
    echo "o()xxx[{::::::::::::::>"
    ;;
  "surprise")
    echo "O_O"
    ;;
  *)
    echo "I don't know that one yet!"
    ;;
esac
```

There's more fanciness you can accomplish with switch statements but I'll let you get more into it if you want to.
