function add_vid() {
    var url = document.getElementById('yt_url').value;
    var index = url.indexOf('v=');
    var id = url.substring(index + 2);
    index = id.indexOf('&');
    id = id.substring(0, index);
    console.log('converted ' + url + 'to ' + id);

    var embed_url = '//www.youtube-nocookie.com/embed/' + id;
    var vid = document.getElementById('yt_vid');
    vid.setAttribute('src', embed_url);
}