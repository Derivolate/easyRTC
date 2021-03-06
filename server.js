/*! Easyrtc_app - v0.0.3 -  2014-07-06 */ 
(function(){
//Load required modules
var https = require("https"); // https server core module
var fs = require("fs"); // file system core module
var express = require("express"); // web framework external module
var io = require("socket.io"); // web socket external module
var easyrtc = require("easyrtc"); // EasyRTC external module

var port = 8443;
// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));

// Start Express https server on port 8443
var webServer = https.createServer({
    key: fs.readFileSync("./81337973-localhost.key"),
    cert: fs.readFileSync("./81337973-localhost.crt")
}, httpApp).listen(port);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {
    "log level": 1
});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);
})();