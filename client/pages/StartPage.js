import React from 'react';
import GameList from '../components/GameList';
import CreateJoinGame from '../components/CreateJoinGame';
import openSocket from 'socket.io-client';

const socket = openSocket();

export default class StartPage extends React.Component {
  state = {
    rooms: []
  };

  componentWillMount() {
    socket.emit('requestOpenRooms');
    socket.on('responseOpenRooms', rooms => {
      this.setState(() => ({rooms}));
    });

    socket.on('roomOpened', (openedRoom) => {
      this.setState((prevState) => ({
        rooms: prevState.rooms.concat(openedRoom)
      }));
    });

    socket.on('roomClosed', (closedRoom) => {
      this.setState((prevState) => ({
        rooms: prevState.rooms.filter((room) => room != closedRoom)
      }));
    });
  }

  render = () => (
    <div>
      <CreateJoinGame gameList={this.state.rooms} socket={socket} />
      <GameList gameList={this.state.rooms} />
    </div>
  );
}