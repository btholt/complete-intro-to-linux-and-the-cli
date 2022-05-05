---
path: "/interacting-with-files"
title: "Interacting with Files"
order: "5A"
section: "Files, Pipes, and Permissions"
description: "How do you interact with files in the command line? Brian goes over the essential programs for inteacting with files in Linux."
---

A core concept of computing in general is files but in particular when it comes to navigating a command line. In this section we're going to go over some of the core programs you'll want to know so you can interact with files in Linux.

# less

Whereas we looked at file editors in the previous sections like nano and vim, less is a program for reading files. If you type `less textfile.txt`, it'll toss you into a reader mode of that file. Like vim, less is fairly robust program with lots of features and shortcuts that I don't know! The most important one for you to know is that if you hit `q` you'll quit less. Another useful keystroke is typing a number then hitting enter to head to that line.

Another useful feature is you can type `/` and then a search term and it'll search for that. Type `n` to get the next match for that and `N` for the previous match. Note this works in vim too and that's the point; the shortcuts are meant to mimic vim to some degree. Hitting space will page down and b will page back up.

Something that confuses a lot of people is there is another command called more. Indeed the tag line of less is "opposite of more". more is the predecessor of less and you can safely never use it since less is better. more was a much simpler and earlier program that lacked a lot of the features of less. You may run across some systems that only have more but that's rare. You can just always use less. There are also other variations of less like most but those generally don't ship with Linux by default.

# man

The reason that I chose to wait this long to introduce you to man is because it uses less to work! So everything you just learned with less applies to man. If you run `man less` it will show you the **man**ual for less. It's usually very exhaustive and thus can be a bit much to get through. Normally `--help` is a bit more succint so I usually try that first. But just about every command should come with a man you can look at.

# cat

Similar to less but all `cat` does is read the entire file and output it. So it doesn't paginate or anything fancy that like, it just reads it and outputs it to the standard output (we'll go over later what that actually means.)

For something like textfile.txt where I know it's super short I'll just `cat textfile.txt` instead of using less. less is more useful when it's a long file.

cat is short for con**cat**enate because it concatenates the file to the standard output.

# head / tail

These two are very descriptive. Head will read the first lines of a file and out put them and tail will read the last lines of a file and output them. By default both will output 10 lines but you can adjust that.

Go ahead and `vim textfile.txt` and add 15 or so lines of text of whatever you want. Now run `head textfile.txt` to see the first ten lines. Now try `tail textfile.txt`. Now try `tail -n 3 textfile.txt` to just see three lines. This is often useful for looking at logs.

A very useful trick is to `tail -f textfile.txt`. Notice it doesn't exit. Now it will update every time the file updates. This is useful if you're waiting for a file to change and you want to see it in real time (`-f` is for follow). So open another terminal window (Multipass will let you open another shell) and run the following `echo hi >> ~/textfile.txt`. You should see that appear in the other window running `tail -f textfile.txt`. We'll go over the `>>` in a little bit, but it just appends the output of echo on that file. This works for head too; the two programs work the same.

# mkdir

mkdir makes a new directory/folder. Run `mkdir my-new-folder` to see a new folder. Run `cd my-new-folder` to change directory into it.

Another useful thing is the `-p` (for parents) flag. Run `mkdir -p a/lot/of/folders` and it will create all those folders as necessary.

# touch

Touch create a new, empty file. If I say `touch new-file.txt` it'll create a new file called new-file.txt right where I am. If new-file.txt already exists then it just changes the last modified and last accessed time. This can be useful in a variety of scripting contexts where changing a file's modified time signals that something is supposed to happen. Most of the time I just use it to create new files.

# rm

Remove a file! Be very careful, this program has got no chill. You tell it delete it everything and it will oblige you.

If you say `rm new-file.txt` it will remove the one file. If you say `rm my-new-folder` it won't let you. You have to say `rm -r my-new-folder` to remove a directory. If my-new-folder has anything in it, it's going to make you confirm every single file that you want to delete it. If you're removing a very full file, this can get tedious so you can add `-f` to force everything through without confirmation.

Again, exercise huge caution here, `rm -rf` is a bell that you can't unring. Once something has been `rm`'d, it doesn't go to the trash, it's just gone.

**Never run this command**: `rm -rf /`. This is a famous command to run that will start deleting your whole system including the critical system files. It will start deleting everything until it deletes something so critical that system will never recover. I tell you so you're extra cautious to never do it.

Lots of people recommend using [trash-cli][trash] instead. That way when you say `trash-put file.txt` it goes into a trash folder which can be recovered for some period before it gets deleted. This is a good idea that I constantly forget to do. trash-cli isn't installed by default and I'll show you later how to install new packages.

# cp

cp is short for copy and does just that. If you want copy a file you run `cp source-file.txt destination-file.txt`. You can also cp a file into a directory and implicitly keep the name of the original file by saying `cp source-file.txt my-new-folder/` and you'll have a file called source-file.txt inside of my-new-folder (the trailing slash is optional, just wanted to make sure you understood my-new-folder is a directory.)

If you want to copy a whole folder and everything in it, use `cp -R source-directory destination-directory` to recursively copy everything from one place to the other.

# mv

mv stands for move. This how you move a file from one place to another, or how you rename a file (which is still moving it in some sense.) Try running `touch file.txt` then `mv file.txt new-name.txt`.

Unlike cp, with mv you don't to do anything special to move a folder. Just do `mv folder-name new-folder-name` and it all works.

# tar

tar is one of the commands I always have to look up because I don't use it enough to remember all of its myriad flags. tar is short for tape archive and it initially used to prepare files to be backed up to a magnetic tape archive but it became useful to just group together files in single files as a tarball (like a zip file.)

Let's say we wanted to put three files and a folder into a single tarball. Run the following

```bash
mkdir folder1
touch file1.txt file2.txt folder1/file3.txt
tar -cf archive.tar file1.txt file2.txt folder1
ls -lsah
```

You should now see a file called archive.tar. This is a single file that contains the above files. You should ship this off to your friend and they'd have the same three files with that directory when they un-tar'd it.

However, this archive isn't compressed. It's literally just the files stuck together. Normally we'd want to compress this as well and tar makes it really easy to. If you just tack on the `-z` flag, it'll automatically compress it. So try this

```bash
tar -zcf archive.tar.gz file1.txt file2.txt folder1
ls -lsah
```

Notice archive.tar.gz is significantly smaller than archive.tar. This is because it got run through gzip.

So let's unpack one of these. We'll do the gzip'd one because 99.99% of the time it should be compressed.

```bash
mkdir destination-folder
tar -xzf archive.tar.gz -C destination-folder/
```

Notice we swapped c for x in the flags. This is because we went from creating to extracting. And then the `-C` is just giving it a destination folder to extract it. You can leave that off but it'll just extract the archive where-ever you are.

[trash]: https://github.com/andreafrancia/trash-cli
