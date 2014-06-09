EasyRTC Server Example
======================

This folder contains all the files you'll need to run a server for this app

Files and Folders:
------------------

 - package.json - Provides project information allowing npm to find and install required modules.
 - server.js - Server code.
 - /static/ - Root folder for web server. Put html files here!

 
Installing Required Modules:
----------------------------

 - Type `npm install` in console.
 - This will read the package.json file to find and install the required modules including EasyRTC, Express, and Socket.io.
 - Required modules will go into a new 'node_modules' subfolder


Running the Server:
-------------------

 - Type `node server` in console.


Viewing the examples:
---------------------

 - In your WebRTC enabled browser, visit your server address including the port. By default port 8443 is used.
 - http://localhost:8443/

Https support:
--------------

By default there is a key and a crt file provided in the root. You can replace those files with your own if you want
