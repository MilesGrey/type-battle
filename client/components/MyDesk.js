import React from 'react';
import openSocket from 'socket.io-client';
import Words from './Words';
import WordInput from './WordInput';

const socket = openSocket();

export default class MyDesk extends React.Component {
  state = {
    gameId: undefined,
    words: []
  }

  componentWillMount() {
    socket.on('error', data => {
      console.log(data.message);
    });

    socket.on('initializeRoom', (data) => {
      this.setState(() => ({
        words: data.words,
        gameId: data.gameId
      }));

      socket.on('enemyWordCompleted', word => {
        this.setState((prevState) => ({
          words: prevState.words.concat(word)
        }));
      });
    });
  }

  handleWordSubmit = (inputWord) => {
    if (this.state.words.indexOf(inputWord) === -1 ) {
      return;
    }

    this.setState((prevState) => ({
      words: prevState.words.filter(word => inputWord != word)
    }));

    const data = {
      gameId: this.state.gameId,
      word: inputWord
    }
    socket.emit('wordCompleted', data);
  }

  handleCreateGame = () => {
    socket.emit('hostCreateNewGame');
  }

  handleJoinGame = (e) => {
    e.preventDefault();

    const gameId = e.target.elements.gameId.value.trim();
    socket.emit('playerJoinGame', gameId);
  }

  render = () => (
    <div>
      {
        !this.state.gameId &&
        <button onClick={this.handleCreateGame}>Create Game</button>
      }
      {
        !this.state.gameId &&
        <form onSubmit={this.handleJoinGame}>
          <input placeholder='game id' type='text' name='gameId' />
          <button>join game</button>
        </form>
      }
      {
        !!this.state.gameId && <p>{ this.state.gameId }</p>
      }
      <Words
        words={this.state.words}
        handleWordSubmit={this.handleWordSubmit}
        />
      <WordInput handleWordSubmit={this.handleWordSubmit} />
    </div>
  );
}