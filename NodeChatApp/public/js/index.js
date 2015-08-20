
var socket = io();
$('#send-message-btn').click(function () {
    
    var msg = $('#message-box').val();

    var dt = new Date();
    var timestamp = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear() + "T" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    var fullMsg = timestamp + " : " + msg;
    socket.emit('chat', fullMsg);
    $('#messages').append($('<p>').text(fullMsg));
    $('#message-box').val('');
    return false;
});

socket.on('chat', function (msg) {
    $('#messages').append($('<p>').text(msg));
});