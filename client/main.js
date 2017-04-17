/**
 * Created by milosberka on 12.4.2017.
 */
const socket = io.connect('http://localhost:3000');
let room = null;
socket.on('message', (data) => {
    console.log('got message from server: '+data);
    document.getElementById('msgContainer').innerHTML += renderHTML(data);
});
socket.on('connect', () => {
    console.log('socket.io connected!');
});
socket.on('disconnect', () => {
    console.log('socket.io connected!');
});
const sendMsg = () => {
    console.log('send msg');

    let msg = {};
    msg.app_id = this.appName;
    msg.time = Date.now();
    msg.room = document.getElementById('room').value;
    msg.user = document.getElementById('user').value;
    msg.text = document.getElementById('msg').value;
    if (msg.room != room) {
        document.getElementById('msgContainer').innerHTML = '';
        socket.json.emit('switchRoom', {from: room, to: msg.room});
        room = msg.room;
    }
    socket.json.emit('message', msg);
}

document.getElementById('msgForm').addEventListener('submit', (ev) => {
    "use strict";
    ev.preventDefault();
    sendMsg();
});

const renderHTML = (jsonMsg) => {
    "use strict";
    const date = new Date(jsonMsg.time);
    return `<h5>${jsonMsg.user} - ${date.toLocaleDateString('FI')} ${date.toLocaleTimeString('FI')}</h><p>${jsonMsg.text}</p><br>`
}