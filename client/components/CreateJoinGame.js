import React from "react";
import { withRouter } from 'react-router-dom';

class CreateJoinGame extends React.Component {

  handleSubmitForm = (e) => {
    e.preventDefault();
    const gameId = e.target.elements.gameId.value.trim();
    this.props.history.push(`/game/${gameId}`);
  }

  handleJoinGame = () => {
    this.props.history.push('/game');
  }

  render = () => (
    <div>
      <button onClick={this.handleJoinGame}>Create Game</button>
      <form onSubmit={this.handleSubmitForm}>
        <input type="text" placeholder="Enter Game ID" name="gameId" />
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
}

export default withRouter(CreateJoinGame);