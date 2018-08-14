const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Game = require('./Game');

const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

app.use(express.static(path.join(__dirname, '/../public/')));

app.get('*', (requestAnimationFrame, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is listening on server://${HOST}:${PORT}`);
});

io.on('connection', (socket) => {
  console.log('a user connected!');
  new Game(socket);
});

