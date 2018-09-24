import React from 'react';
import GameList from '../components/GameList';
import CreateJoinGame from '../components/CreateJoinGame';

export default class StartPage extends React.Component {
  state = {
    rooms: []
  };

  componentDidMount() {
    this.props.socket.emit('requestOpenRooms');
    this.props.socket.on('responseOpenRooms', rooms => {
      this.setState(() => ({rooms}));
    });

    this.props.socket.on('roomOpened', (openedRoom) => {
      this.setState((prevState) => ({
        rooms: prevState.rooms.concat(openedRoom)
      }));
    });

    this.props.socket.on('roomClosed', (closedRoom) => {
      this.setState((prevState) => ({
        rooms: prevState.rooms.filter((room) => room != closedRoom)
      }));
    });
  }

  render = () => (
    <div>
      <CreateJoinGame gameList={this.state.rooms} socket={this.props.socket} />
      <GameList gameList={this.state.rooms} socket={this.props.socket} />
    </div>
  );
}