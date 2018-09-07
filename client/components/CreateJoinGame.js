import React from "react";
import { withRouter } from 'react-router-dom';

class CreateJoinGame extends React.Component {
  handleCreateGame = (e) => {
    e.preventDefault();
    const createRoomName = e.target.elements.createRoomName.value.replace(/ /g, '');
    this.props.history.push(`/game/${createRoomName}`);
  }

  handleJoinGame = (e) => {
    e.preventDefault();
    const joinRoomName = e.target.elements.joinRoomName.value.replace(/ /g, '');
    this.props.history.push(`/game/${joinRoomName}`);
  }

  render = () => (
    <div>
      <form onSubmit={this.handleCreateGame}>
        <input type="text" placeholder="Enter new room name" name="createRoomName" />
        <button type="submit">Create Game</button>
      </form>
      <form onSubmit={this.handleJoinGame}>
        <input type="text" placeholder="Enter room name" name="joinRoomName" />
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
}

export default withRouter(CreateJoinGame);