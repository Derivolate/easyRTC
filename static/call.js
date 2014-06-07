var selfEasyrtcid = "";

function connect () {
    easyrtc.setRoomOccupantListener (convertListToButtons); // Is called every
    // time a user joins
    // the room
    easyrtc.easyApp ("easyrtc.audio_video", // The name of our application
    "self_video", // Id of the video element for our own media stream
    [
        "cv1",
        "cv2"
    ], // Array containing the id's of the video elements for the incoming
    // media stream
    function (easyrtcid) { // Initialisation succes callback
        selfEasyrtcid = easyrtcid;
        document.getElementById ("iam").innerHTML = "I am " + easyrtc.cleanId (easyrtcid);
    },

    function (errorCode, message) { // Initialisation failure callback
        easyrtc.showError (errorCode, message);
    });
}

function clearConnectList () {
    var otherClientDiv = document.getElementById ("other_clients");
    while (otherClientDiv.hasChildNodes ()) {
        otherClientDiv.removeChild (otherClientDiv.lastChild);
    }
}

function convertListToButtons (roomName, data, isPrimary) {
    clearConnectList ();
    var otherClientDiv = document.getElementById ("other_clients");
    for ( var easyrtcid in data) {

        var button = document.createElement ("button");

        button.onclick = function (easyrtcid) {
            return function () {
                performCall (easyrtcid);
            };
        } (easyrtcid);

        var label = document.createTextNode (easyrtc.idToName (easyrtcid));
        button.appendChild (label);
        otherClientDiv.appendChild (button);
    }
}

function performCall (otherEasyrtcid) {

    var successCB = function () {
    };
    var failureCB = function () {
    };
    easyrtc.call (otherEasyrtcid, successCB, failureCB);
}


