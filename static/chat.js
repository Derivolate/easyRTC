var selfEasyrtcid = "";

function connect () {
    easyrtc.setPeerListener (addToConversation); // Is called whenever there is sent data to this peer
    easyrtc.setRoomOccupantListener (convertListToButtons); // Is called whenever someone joins the room
    easyrtc.connect ("easyrtc.instantMessaging", loginSuccess, loginFailure); // Application name, login succes function referenc, login failure reference
}

function addToConversation (who, msgType, content) { // This function is used to add messages to the 'conversation' div
    // Replaces all html symbols with javascript symbols.
    content = content.replace (/&/g, "&amp;")/* Ampercent */.replace (/</g, "&lt;")/* smaller then */.replace (/>/g, "&gt;") /* greater then */;
    content = content.replace (/\n/g, "<br />") /* New line*/;
    document.getElementById ("conversation").innerHTML += "<b>" + who + ":</b>&nbsp;" + content + "<br />"; // The actual chat mesage with the peer id in front of it
}


function convertListToButtons (roomName, occupants) { // The name of the room, other peers in the room
    var otherClientDiv = document.getElementById ("otherClients");
    
    while (otherClientDiv.hasChildNodes ()) { //Remove all child nodes (buttons) of otherCliendDiv
        otherClientDiv.removeChild (otherClientDiv.lastChild);
    }
    
    // Create the buttons to send the chat messages
    for ( var easyrtcid in occupants) {
        var button = document.createElement ("button");
        button.onclick = function (easyrtcid) {
            return function () {
                sendStuffWS (easyrtcid);
            };
        } (easyrtcid);
        var label = document.createTextNode ("Send to " + easyrtc.idToName (easyrtcid));
        button.appendChild (label);

        otherClientDiv.appendChild (button);
    }
    if (!otherClientDiv.hasChildNodes ()) {
        otherClientDiv.innerHTML = "<em>Nobody else logged in to talk to...</em>";
    }
}

function sendStuffWS (otherEasyrtcid) {
    var text = document.getElementById ("sendMessageText").value;
    if (text.replace (/\s/g, "").length === 0) { // Don"t send just whitespace
        return;
    }

    easyrtc.sendDataWS (otherEasyrtcid, "message", text);
    addToConversation ("Me", "message", text);
    document.getElementById ("sendMessageText").value = "";
}

function loginSuccess (easyrtcid) {
    selfEasyrtcid = easyrtcid;
    document.getElementById ("iam").innerHTML = "I am " + easyrtcid;
}

function loginFailure (errorCode, message) {
    easyrtc.showError (errorCode, message);
}
