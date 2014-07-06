function add_vid() {
    id = get_yt_id(document.getElementById('yt_url').value);

    connected_peers.forEach(function(easy_rtcid) {
        easyrtc.sendPeerMessage(easy_rtcid, 'yt_id', id, function() { /*success*/ }, function() { /*failure*/ });
        document.getElementById('yt_url').value = "";
        console.log('send video id ' + id + 'to ' + easy_rtcid);
    });

    set_vid(id);
}

function set_vid(id) {
    var embed_url = '//www.youtube-nocookie.com/embed/' + id;
    var vid = document.getElementById('yt_vid');
    vid.setAttribute('src', embed_url);
}

function get_yt_id(url) {
    var index = url.indexOf('v=');
    var id = url.substring(index + 2);
    if (id.indexOf('&') != -1) {
        index = id.indexOf('&');
        id = id.substring(0, index);
    }
    console.log('converted ' + url + 'to ' + id);
    return id;
}

function recieve_vid(easyrtcid, msg_type, vid_id, targeting) {
    console.log('recieved video id ' + vid_id);
    set_vid(vid_id);
}