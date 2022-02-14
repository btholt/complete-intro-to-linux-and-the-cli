---
path: "/lol"
title: "Wildcards and Replacements"
order: "5B"
section: "Files, Pipes, and Permissions"
description: "Using a few tricks you can cleverly select multiple files at a time with bash. Brian in this section will go over wilcards, expansions, and replacements"
---

A brief aside here for how to select multiple files.

## Wildcards

Let's you wanted to remove all the .txt files in your directory. You could say `rm file1.txt file2.txt file3.txt <etc>` but that's time consuming. You know they all end with .txt, wouldn't it be nice if you could say "remove anything that ends in .txt"? You can! That's what the wildcard `*` is for with paths. Instead of the command above, you can do `rm *.txt` and it'll remove everything matches that pattern. If you want to try this, use the `-i` flag so it'll prompt if you want to delete the files or not so you don't accidentally things you don't mean to.

Okay, so say you wanted to match file1.txt and file2.txt but not file.txt. `file*.txt` will match all three of those. For that you can use `?`. So try `file?.txt`.

Try this

```bash
touch file1.txt file2.txt file.txt
ls file*.txt
ls file?.txt
```

Notice the first ls call does output `file.txt` and the second one doesn't.

A curious fact above how this (and everyhing below with expansions) works is that it's bash that does the translation of `*` and `?` and _not_ the programs. So when you say `ls file*.txt`, what `ls` actually ends up getting inputted is `ls file1.txt file2.txt file.txt`. That's important because `ls` doesn't have to support anything, which means this works anywhere in bash.

So, more on `?` vs `*`. `?` represents **exactly one character**. So `file?.txt` won't match `file10.txt` either. So you could match `file1.txt` as well by doing `ls f?le1.txt` since that `?` represent any one character there.

Finally you can use `[]` to limit your characters too. Let's say you wanted 1-5. So you could say `ls file[1-5].txt`. Or you can say anything that matches not these characters by saying `ls file[^1-5].txt`

## Expansions

Let's say you wanted to create three files using touch all at once. You could do:

```bash
touch file4.txt
touch file5.txt
touch file6.txt
```

It's a bit annoying but it'll work. But try this instead

```bash
touch file{4,5,6}.txt
touch {Aisha,Lanie,Joumana,Krista}-profile.txt
```

Even better, try this:

```bash
touch file{0..10}.txt
```

Pretty cool right? Okay, let's get a couple more advance ones in there. We'll use echo from now one to not fill up our folder with garbage files but know this works anywhere in bash.

```bash
echo {a..z} # prints a to z
echo {z..a} # reverse order
echo {0..100..2} # prints every other (aka even) number from 0 to 100
echo {100..0..5} # prints every 5th number in reverse order from 100 to 0
echo {a..z}{1..5} # prints out a1 a2 a3 a4 a5 b1 b2 b3 <etc>
```

Are these useful all the time? No, but when they are they can save you a bunch of time!
