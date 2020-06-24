---
path: "/loops-and-arrays"
title: "Loops and Arrays"
order: "9D
section: "Shell Scripts"
description: "To make any sort of complicated program you need loops and arrays. In this section Brian teaches the syntax for making arrays and looping over them."
---

Any programming language needs a way to do repetitive tasks and bash is no different. It has several flavors of loops that should look familiar to anyone who has done programming before.

You frequently also need groups of variables. Bash has this is as well with arrays and we'll go over how to use those.

## Arrays and For Loops

Arrays can do a lot and are very flexible. For now we're just going to go over how to declare them and how to read from them. Make a new array.sh and put this in there:

```bash
#!/bin/bash

friends=(Kyle Marc Jem "Brian Holt" Sarah)

echo My second friend is ${friends[1]}

for friend in ${friends[*]}
do
    echo friend: $friend
done

echo "I have ${#friends[*]} friends"
```

The `friends=(Kyle Marc Jem "Brian Holt" Sarah)` line is how to define an array. If it's just one word (e.g. Kyle or Marc in this case) then you don't need quotes. You'll see for "Brian Holt" I added quotes so it can capture the space too.

You see `${friends[1]}` is how you access items in an array. You do need the `{}` in this case or else it'll consfuse bash with path expansion stuff.

Then we do a loop. We need to do the `${friends[*]}` to access everything in the array. If you said `echo ${friends[*]}` it would print the whole array.

Then we can loop with `do` to start and `done` to end it.

Lastly if you want to see the length, you use `${#friends[*]}`. Sort of wild stuff but it works!

## While

What if we wanted to make a program that wouldn't exit until you guessed the correct number? We can use a while loop together with read to make such a wonderfully annoying game.

```bash
# let "NUM_TO_GUESS = ${RANDOM} % 10 + 1"
NUM_TO_GUESS=$(( $RANDOM % 10 + 1 ))
GUESSED_NUM=0

echo "guess a number between 1 and 10"

while [ $NUM_TO_GUESS -ne $GUESSED_NUM ]
do
  read -p "your guess: " GUESSED_NUM
done

echo "you got it!"
```

Let's talk a brief moment about `let`. `let` allows you to do math. You feed it a string of math of some variety and it will evaluate it for you. The shortcut to doing that (similar to how `test` works with []) is the dollar sign with double parentheses. The two lines I have there are equivalent.

`$RANDOM` is just a random number which we're using [modulo][mod] to get a random number between 1 and 10.

Then the interesting part there is our while loop looks a lot like an if statement. And that's it!

There are more types of loops and more interesting things you can do with them but we'll leave that to you. I generally have to look them every time I use them anyway, same with the array stuff.
