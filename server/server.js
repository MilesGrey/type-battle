const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
  
  socket.on('hostCreateNewGame', () => {
    // not necessarily unique
    const gameId = Math.floor(Math.random() * 100000);
    const data = {
      gameId: gameId,
      words: [
        'player',
        'mozart',
        'avenue'
      ]
    };
    gameSocket.join(gameId.toString(), () => {
      console.log(`player created and joined room: ${gameId}`);
      gameSocket.emit('initializeRoom', data);
    });
  });

  socket.on('playerJoinGame', (gameId) => {
    const data = {
      gameId: gameId,
      words: [
        'hello',
        'dinner',
        'room'
      ]
    };
  
    gameSocket.join(gameId, () => {
      console.log(`player joined room: ${gameId}`);
      gameSocket.emit('initializeRoom', data)
    });
  });

  socket.on('playerCompleteWord', (data) => {
    console.log(`player in room ${data.gameId} completed word: ${data.word}`);
    gameSocket.broadcast.to(data.gameId).emit('enemyWordCompleted', data.word);
  });
});

