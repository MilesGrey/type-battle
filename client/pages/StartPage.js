import React from 'react';
import GameList from '../components/GameList';
import CreateJoinGame from '../components/CreateJoinGame';

export default class StartPage extends React.Component {

  state = {
    'gameList': ['test', 'asd', 'asn']
  }

  render = () => (
    <div>
      <CreateJoinGame />
      <GameList gameList={this.state.gameList} />
    </div>
  );
}