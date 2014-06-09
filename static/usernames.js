
var selfEasyrtcid = "";
 
 
function connect() {
  console.log("Initializing.");
 
  var userName = document.getElementById("userName").value;
  if( !easyrtc.isNameValid(userName)) {
    easyrtc.showError("BAD-USER-NAME", "illegal user name");
    return;
  }
 
  easyrtc.setUsername(userName);
  easyrtc.connect("easyrtc.videoScreen", function(){}, function(){});
 
}

easyrtc.setRoomOccupantListener(function (roomName, otherPeers){
    var easyrtcid;
    for (easyrtcid in otherPeers) {
        // If the user is new, send a message
            var otherClientDiv = document.getElementById("otherClients");
            var label = document.createTextNode(easyrtc.idToName(easyrtcid) + " is online");
            otherClientDiv.appendChild(label);
        
    }
});

