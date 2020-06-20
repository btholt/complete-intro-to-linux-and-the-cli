---
path: "/ssh"
title: "SSH"
order: "7A"
section: "Networking and the Internet"
description: "One of the most key things a developer needs to know how to do is connect to a remote server and run commands on it. In this section Brian shows you how to set up a second VM so you can remotely connect via ssh into it from the first one."
---

One of the most key things you need to take away from this workshop is how to remotely connect to a server and run commands on it. This is one of the times you absolutely must know your way around bash or you'll be out of look because there's no other way how to do it.

## When would you do this

One of the easiest things to do is to get a VM (virtual machine) up and running in the cloud. So many companies offer this like Azure, DigitalOcean, AWS, Linode, etc. A VM is literally just a Linux machine running somewhere in the cloud. Many times the only real way to administrate and run code on these servers is just to connect into a remote CLI session and run the code yourself. It's also very easy with your newly learned skills! Let's see how to do that.

## Get a second VM running

I'm assuming here you're using Multipass. If not you'll have to figure out how to get a second VM running yourself.

If you're running macOS, open a new terminal that's running locally for macOS. You can do that by right clicking on the Terminal icon in your dock and clicking New Window.

If you're running Windows, open your start menu and search for PowerShell and open a window for that.

If you're running Linux, just run this directly in a host context of your Linux machine, not inside your Multipass VM.

Run this command (it's multipass specific so you don't really need to care what it does or how it works, it's just useful here.)

```bash
multipass launch --name secondary
```

This will launch a second Linux VM named secondary (by default the first one was named primary.) This will take a second to start. Once it does you can type `multipass shell secondary`. You can also do it from the Multipass icon as well. This one will be identical to the first one but it's a whole separate VM so it won't have all the stuff from your first one in there. You'll also notice that when you log in it'll say `ubuntu@secondary` in your prompt instead of `ubuntu@primary`.

On the secondary, let's make a new user. Run the following

```bash
sudo useradd -s /bin/bash -m -g ubuntu brian
sudo passwd brian # something simple, like asdf
```

This will create a new user with bash as their default shell (the `-s` part) with a premade home directory (the `-m` part), and they'll be apart of the ubuntu group (the `-g` part.) Now we'll make it so we can connect to the secondary as brian from the primary.

## SSH Keys

The next thing we need to do is to create ssh keys for primary. The ssh key on primary is how it's going to identify itself to secondary. I'm not going to explain how ssh keys work (it's a lot of complicated math) but the basic gist is this: when you generate a new ssh key, you get two files, a public key and a private key. The public key is what you give to everyone else and is not a secret. You're basically giving them a key hole and telling them to install it on a door for you. The private key is just that, your private key. You will _never_ reveal this key to anyone. If anyone does get ahold of this key they can freely masquerade as you. This is the key to the key hole. If you do accidentally reveal your private key ever, you should immediately stop using it and make a new one.

If you want to dig a bit deeper, check out the Wikipedia page on [Diffie-Hellman key exchange][dhke]. Fascinating history. This isn't the same as what ssh uses but rather the first sort of public key encryption that existed.

So, on the primary, let's generate our public key. Run this:

```bash
ssh-keygen -t rsa
# hit enter to put the key files in the default place
# hit enter to give an empty passphrase
# hit enter again to confirm
```

Here we're generating a new random key. This key is essentially unguessable and therefore unless something unreal happens, is unhackable from a brute force perspective. We're telling it to put everything in the `~/.ssh` directory which is standard. Lastly we're electing to not give it a passphrase. In general it's a good idea to give it a passphrase so that anytime you use the SSH key you need to enter a passphrase (and frequently you can save a passkey to something like macOS's keychain) but in this case we're okay to skip it in the name of a demo.

## Connecting to secondary

If you run `ls ~/.ssh` you'll at least see id_rsa (your private key) and id_rsa.pub (your public key.) These are ready to go to be used. We're going to use these allow ubuntu@primary to connect to brian@secondary. Run `cat ~/.ssh/id_rsa.pub` and copy the output onto your clipboard.

Change now to your secondary machine.

```bash
su brian
mkdir ~/.ssh
vi ~/.ssh/authorized_keys # paste in copied ssh id_rsa.pub from primary, write, and quit
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Note: you typically won't have to do this yourself. With someone like Azure or DigitalOcean, you'll give them your id_rsa.pub and they'll take care of making sure it gets into authorized_keys. You'll just have to generate it and give it to them.

Lastly, we're going to need to give `ssh` an address to connect to. Just like you need an address to mail a letter to, you need an IP address to tell your computer where to connect to. Let's go grab that. Run the command `ifconfig`. This is going to dump out a bunch of addresses and hashes.

You're looking for numbers like look this: `X.X.X.X`.

For sure one of them will be 127.0.0.1. That's not it. That's called the loopback: a network address that refers to the same machine. Connecting to that would be like mailing a letter to yourself. Try `ping 127.0.0.1`. This will send little packets of data to that address and see if it responds. It'd be like looking in a mirror and saying "hey you there?"

Ignore the mask and broadcast. Look for an inet one that looks like `192.168.64.3` or close to it. That's the one you're looking for. That's what the address of this secondary machine to broader network (in this case, this network is just local to your computer.) If you want to make sure it works, try `ping 192.168.64.3` and see if it responds with data. If it says it's unreachable you picked the wrong one.

Okay! Now we're ready to connect from primary. Head back there and type this:

```bash
ssh brian@<the ip address you just got from ifconfig on the other machine>
```

You should connect! The primary machine is now connect via ssh to the secondary machine and now remotely running commands on it. Why is this a big deal? In this specific case it's not because we can just use Multipass to open a shell but it is a big deal because we can use this same process to connect to _any machine_. You can say `ssh brian@<my vm in the cloud>` and it works the same way! Now you can remotely connect to your server in the cloud or your Raspberry Pi in the other room. It works with any Linux machine you can connect to over the network.

[dhke]: https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange
