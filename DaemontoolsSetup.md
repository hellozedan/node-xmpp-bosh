# Using Daemontools to monitor node-xmpp-bosh #

Install node-xmpp-bosh using either the instructions in [INSTALL.TXT](http://code.google.com/p/node-xmpp-bosh/source/browse/trunk/INSTALL.TXT) or as mentioned in the [DebianHowTo](DebianHowTo.md)

Once you have completed everything till the section **node-xmpp-bosh configuration** (if you are following the [DebianHowTo](DebianHowTo.md)), you can follow the steps mentioned below

### Create a symlink to bosh-server ###

If you installed node-xmpp-bosh in /root, the _bosh-server_ executable will be in _/root/node\_modules/.bin/bosh-server_

`ln -s /root/node_modules/.bin/bosh-server /root`

### Install daemontools on `*`NIX systems ###

(If you are running ubuntu, see below)

  * [Download](http://cr.yp.to/daemontools.html)
  * [Install](http://cr.yp.to/daemontools/install.html)

### Install daemontools on ubuntu ###

Run `apt-get install daemontools`

### Add daemontools to your startup scripts ###

[How to Start](http://cr.yp.to/daemontools/start.html)

Be sure to replace /command/svscanboot with the output of `which svscanboot` on your machine

### Create /etc/service ###

`mkdir /etc/service`

### Create the BOSH startup script ###

`mkdir /etc/service/bosh`

`touch /etc/service/bosh/bosh.log`

`touch /etc/service/bosh/bosh.err`

`chmod a+rw /etc/service/bosh/bosh.err /etc/service/bosh/bosh.log`

Create a script _/etc/service/bosh/run_ with the following contents

```
#!/bin/bash
export PATH=/opt/node-v0.4.7/bin:$PATH
setuidgid nobody /root/bosh-server >> bosh.log 2>>bosh.err
```

`chmod +x /etc/service/bosh/run`

### Manually start svscanboot (if you don't want to reboot) ###

`svscanboot &`

That's it!!