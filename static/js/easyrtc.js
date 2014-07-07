function connect() {

    add_to_conversation('easyrtc', null, 'welcome, you can connect with other people and talk to them or use the chat');
    var userName = document.getElementById("userName").value;
    if (!easyrtc.isNameValid(userName)) {
        //easyrtc.showError ("BAD-USER-NAME", "illegal user name");
        return;
    }

    easyrtc.setUsername(userName);

    easyrtc.enableAudio(document.getElementById("share_audio").checked);
    easyrtc.enableVideo(document.getElementById("share_video").checked);

    document.getElementById("overlay").style.visibility = "hidden";
    add_rtc_listeners();
    easyrtc.easyApp("easyrtc.audio_video", // The name of our application
        "self_video", // Id of the video element for our own media stream

        [ // Array containing the id's of the video elements for the incoming media stream
            "cv1",
        ], function (easyrtcid) { // Initialisation succes callback
            selfEasyrtcid = easyrtcid;
            document.getElementById("iam").innerHTML = "I am " + easyrtc.idToName(easyrtcid);
            console.log('my id is ' + easyrtcid);
        },

        function (errorCode, message) { // Initialisation failure callback
            easyrtc.showError(errorCode, message);
        });

    button = document.getElementById("send");
    button.addEventListener('click', send_message);
}

function send_message() {
    var text = document.getElementById("send_message_text").value;

    add_to_conversation("Me", "message", text);
    connected_peers.forEach(function (easy_rtcid) {
        if (text.replace(/\s/g, "").length === 0) { // Don"t send just whitespace
            return;
        }
        easyrtc.sendPeerMessage(easy_rtcid, 'chat_message', text, function () { /*success*/ }, function () { /*failure*/ })

        document.getElementById("send_message_text").value = "";
    });
}


function clear_connect_list() {
    var other_client_div = document.getElementById("other_clients");
    while (other_client_div.hasChildNodes()) {
        other_client_div.removeChild(other_client_div.lastChild);
    }
}

function peer_connected(roomName, data, isPrimary) {
    clear_connect_list();
    connected_peers = [];
    var other_client_div = document.getElementById("other_clients");
    for (var easyrtcid in data) {
        if (easyrtc.getConnectStatus(easyrtcid) === "not connected") {
            perform_call(easyrtcid);
        };
        connected_peers.push(easyrtcid);

        var label = document.createTextNode(easyrtc.idToName(easyrtcid));
        other_client_div.appendChild(label);
    }
}

function perform_call(other_easyrtcid) {
    easyrtc.call(other_easyrtcid, function () { /*success*/ }, function () { /*failure*/ });
}

function add_to_conversation(who, msg_type, content) { // add messages to the 'conversation' div Replaces all html symbols with javascript symbols.
    content = content.replace(/&/g, "&amp;"); /* Ampercent */
    content = content.replace(/</g, "&lt;"); /* smaller then */
    content = content.replace(/>/g, "&gt;"); /* greater then */
    content = content.replace(/\n/g, "<br />"); /* New line */
    // The actual chat mesage with the peer id in front of it
    document.getElementById("conversation").innerHTML += "<b>" + easyrtc.idToName(who) + ":</b>&nbsp;" + content + "<br />";
}

function hangup() {
    easyrtc.hangupAll();
}

easyrtc.setOnStreamClosed(function (easyrtcid) {
    easyrtc.setVideoObjectSrc(document.getElementById("cv1"), "");
    (easyrtc.idToName(easyrtcid) + " went away");
    console.log('disconnected user');
});