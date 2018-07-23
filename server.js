const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

server.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
  console.log('a user connected!');

  socket.on('disconnect', () => {
    console.log('user disconnected.');
  });

  socket.on('wordCompleted', (word) => {
    socket.broadcast.emit('wordCompleted', word);
    console.log(word);
    
  });
});

http.listen(PORT, () => {
  console.log(`Server is listenting on http://${HOST, PORT}`);
})