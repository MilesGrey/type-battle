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

let io;

class Connection {
    constructor(socket, inputIo) {
        io = inputIo;

        socket.on('disconnect', () => {
            console.log('a user disconnected!');
            });
            
        socket.on('hostCreateNewGame', this.handleHostCreateNewGame);
        socket.on('playerJoinGame', this.handlePlayerJoinGame);
        socket.on('playerReady', this.handlePlayerReady);
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

        this.join(room, () => {
            console.log(`player joined room: ${room}`);
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
        
        this.join(room, () => {
            console.log(`player joined room: ${room}`);
        });
    }

    handlePlayerReady(gameId) {
        const words = wordPool.splice(-3, 3);
        console.log(words);
        
        this.emit('initializeRoom', words);

        if (closedRooms.includes(gameId)) {
            io.in(gameId).emit('startCountdown');
        }
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