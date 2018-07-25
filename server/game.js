let gameSocket;

function initGame(socket) {
  gameSocket = socket;

  gameSocket.on('hostCreateNewGame', hostCreateNewGame);
  gameSocket.on('playerJoinGame', playerJoinGame);
  gameSocket.on('playerCompleteWord', playerCompleteGame);
}

function hostCreateNewGame() {
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
}

function playerJoinGame() {
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
}

function playerCompleteWord() {
  gameSocket.broadcast.to(data.gameId).emit('enemyWordCompleted', data.word);
}