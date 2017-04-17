/**
 * Created by milosberka on 12.4.2017.
 */
'use strict';
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
        const socketid = socket.id;
        console.log('a user connected with session id '+socketid);
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('message', (jsonMsg) => {
            console.log('received message from client: '+JSON.stringify(jsonMsg.text));
            io.to(jsonMsg.room).emit('message', jsonMsg);
        });
        socket.on('switchRoom', (switchParam) => {
            if (switchParam.from != undefined) {
                socket.leave(switchParam.from, () => {
                    console.log('left: ' + switchParam.from);
                });
            }
            socket.join(switchParam.to);
        });
    }
);
app.use(express.static('./client'));
server.listen(3000, () => {
    console.log('Server started (3000)');
});