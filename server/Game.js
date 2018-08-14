class Game {
    constructor(socket) {
        this.socket = socket;

        socket.on('disconnect', () => {
            console.log('a user disconnected!');
            });
            
        socket.on('hostCreateNewGame', this.handleHostCreateNewGame);
        
        socket.on('playerJoinGame', this.handlePlayerJoinGame);
        
        socket.on('playerCompleteWord', this.handlePlayerCompleteWord);
    }

    handleHostCreateNewGame() {
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
        socket.join(gameId.toString(), () => {
            console.log(`player created and joined room: ${gameId}`);
            socket.emit('initializeRoom', data);
        });
    }

    handlePlayerJoinGame(gameId) {
        const data = {
            gameId: gameId,
            words: [
            'hello',
            'dinner',
            'room'
            ]
        };
        
        socket.join(gameId, () => {
            console.log(`player joined room: ${gameId}`);
            socket.emit('initializeRoom', data)
        });
    }

    handlePlayerCompleteWord(data) {
        console.log(`player in room ${data.gameId} completed word: ${data.word}`);
        socket.broadcast.to(data.gameId).emit('enemyWordCompleted', data.word);
    }
}

module.exports = Game;