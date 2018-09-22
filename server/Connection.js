let openRooms = [];
let closedRooms = [];

let wordPool = [
    'player',
    'mozart',
    'avenue',
    'hello',
    'dinner',
    'room'
];

class Connection {
    constructor(socket) {
        socket.on('disconnect', () => {
            console.log('a user disconnected!');
            });
            
        socket.on('hostCreateNewGame', this.handleHostCreateNewGame);
        socket.on('playerJoinGame', this.handlePlayerJoinGame);
        socket.on('playerCompleteWord', this.handlePlayerCompleteWord);
        socket.on('requestOpenRooms', this.handleRequestOpenRooms);
    }

    handleHostCreateNewGame(room) {
        if (openRooms.includes(room) || closedRooms.includes(room)) {
            this.emit('roomAlreadyExists');
            return;
        }

        openRooms.push(room);
        this.broadcast.emit('roomOpened', room);

        const words = wordPool.splice(-3, 3);
        
        this.join(words, () => {
            console.log(`player joined room: ${room}`);
            this.emit('initializeRoom', words)
        });
    }

    handlePlayerJoinGame(room) {
        if (!openRooms.includes(room)) {
            this.emit('cannotJoinRoom');
            return;
        }

        openRooms.pop(room);
        closedRooms.push(room);
        this.broadcast.emit('roomClosed', room);

        const words = wordPool.splice(-3, 3);
        
        this.join(words, () => {
            console.log(`player joined room: ${room}`);
            this.emit('initializeRoom', words)
        });
    }

    handlePlayerCompleteWord(data) {
        console.log(`player in room ${data.gameId} completed word: ${data.word}`);
        this.broadcast.to(data.gameId).emit('enemyWordCompleted', data.word);
    }

    handleRequestOpenRooms() {
        this.emit('responseOpenRooms', openRooms);
    }
}

module.exports = Connection;