import React from 'react';
import GameList from '../components/GameList';
import CreateJoinGame from '../components/CreateJoinGame';

const StartPage = () => (
  <div>
    <CreateJoinGame />
    <GameList gameList={this.state.gameList} />
  </div>
);

export default StartPage;