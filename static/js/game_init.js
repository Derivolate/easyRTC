function game_init() {


    var width = 500;
    var height = 500;
    var keys = [];
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(10, 10, 55, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 55, 50);
    socket.on('update', function(data) {
        ctx.clearRect(0, 0, width, height);
    });

    addEventListener("keydown", function(event) {
        for (var i = 0; i < 4; i++) {
            if (event.keyCode === i + 37) {
                keys[i] = true;
            }
        }
    });

    addEventListener("keydown", function(event) {
        for (var i = 0; i < 4; i++) {
            if (event.keyCode === i + 37) {
                keys[i] = false;
            }
        }
    });
}
