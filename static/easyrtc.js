var selfEasyrtcid = "";
var connected_rtcid;
var connected_peers = [];
function connect () {
    easyrtc.setPeerListener (add_to_conversation); // Is called whenever there
    // is sent data to this peer
    easyrtc.setRoomOccupantListener (peer_connected); // Is called every time
    // a user joins the room
    easyrtc.easyApp ("easyrtc.audio_video", // The name of our application
    "self_video", // Id of the video element for our own media stream

    [// Array containing the id's of the video elements for the incoming
            // media stream
            "cv1",
    ], function (easyrtcid) { // Initialisation succes callback
        selfEasyrtcid = easyrtcid;
        document.getElementById ("iam").innerHTML = "I am " + easyrtc.cleanId (easyrtcid);
    },

    function (errorCode, message) { // Initialisation failure callback
        easyrtc.showError (errorCode, message);
    });

    button = document.getElementById ("send");
    button.addEventListener ('click', send_message);
}

function send_message () {
    connected_peers.forEach (function (easy_rtcid) {
        console.log (easy_rtcid);
        var text = document.getElementById ("send_message_text").value;
        send_stuff_WS (easy_rtcid, text);
    });
}

function send_stuff_WS (easy_rtcid, text) {
    if (text.replace (/\s/g, "").length === 0) { // Don"t send just
        // whitespace
        return;
    }
    easyrtc.sendDataWS (easy_rtcid, "message", text);
    add_to_conversation ("Me", "message", text);
    document.getElementById ("send_message_text").value = "";
}

function clear_connect_list () {
    var other_client_div = document.getElementById ("other_clients");
    while (other_client_div.hasChildNodes ()) {
        other_client_div.removeChild (other_client_div.lastChild);
    }
}

function peer_connected (roomName, data, isPrimary) {
    clear_connect_list ();
    connected_peers = [];
    var other_client_div = document.getElementById ("other_clients");
    for ( var easyrtcid in data) {
        if (easyrtc.getConnectStatus (easyrtcid) === "not connected") {
            perform_call (easyrtcid);
        }
        ;
        connected_peers.push (easyrtcid);

        var label = document.createTextNode (easyrtc.idToName (easyrtcid));
        other_client_div.appendChild (label);
    }
}

function perform_call (other_easyrtcid) {

    var successCB = function () {
    };
    var failureCB = function () {
    };
    easyrtc.call (other_easyrtcid, successCB, failureCB);
}
function add_to_conversation (who, msg_type, content) { // This function is used
    // to add messages to
    // the 'conversation'
    // div
    // Replaces all html symbols with javascript symbols.
    content = content.replace (/&/g, "&amp;")/* Ampercent */
    content = content.replace (/</g, "&lt;")/* smaller then */
    content = content.replace (/>/g, "&gt;") /* greater then */;
    content = content.replace (/\n/g, "<br />") /* New line */;
    document.getElementById ("conversation").innerHTML += "<b>" + who + ":</b>&nbsp;" + content + "<br />"; // The
    // actual
    // chat
    // mesage
    // with
    // the
    // peer
    // id
    // in
    // front
    // of
    // it
}
