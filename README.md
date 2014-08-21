Node remote events
==================

Listen for specific events happening on remote servers trough an SSH tunnel.

Why would you want to use this
------------------------------
The reason I've written this library is so that I can use this module in my home automation setup that I have at home.
I use a RaspberryPi to control all switches/lights and other stuff in my house. 
But by adding a module like this I can do certain things based on events that happen on other devices on the network. 
An example could be to automatically dim the lights when I start to play a video on my XBMC machine.

Notes
-----
If the device you want to monitor is not always on it's probably a better solution to use syslog drains.
