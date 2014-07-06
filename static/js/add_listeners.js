function add_button_listeners() {
    document.getElementById('connect').addEventListener('click', connect);
    document.getElementById('hangup').addEventListener('click', hangup);
    document.getElementById('add_vid').addEventListener('click', add_vid);
    document.getElementById('send').addEventListener('click', send_message);

};

function add_rtc_listeners() {
    easyrtc.setPeerListener(add_to_conversation, 'chat_message'); // Is called whenever there is sent data to this peer
    easyrtc.setPeerListener(recieve_vid, 'yt_id'); // Is called whenever there is sent data to this peer
    easyrtc.setRoomOccupantListener(peer_connected); // Is called every time a user joins the room
}