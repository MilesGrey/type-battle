const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const game = require('./game');

const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

app.use(express.static(path.join(__dirname, '/../client/public/')));

server.listen(PORT, () => {
  console.log(`Server is listenting on server://${HOST}:${PORT}`);
});

io.on('connection', (socket) => {
  console.log('a user connected!');

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
  
  game.initGame(socket);
});

