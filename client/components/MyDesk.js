import React from 'react';
import Words from './Words';
import WordInput from './WordInput';

export default class MyDesk extends React.Component {
  state = {
    words: []
  }

  componentWillMount() {
    this.props.socket.on('initializeRoom', (data) => {
      this.setState(() => ({
        words: data.words,
        gameId: data.gameId
      }));
    });

    this.props.socket.on('enemyWordCompleted', word => {
      this.setState((prevState) => ({
        words: prevState.words.concat(word)
      }));
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
    socket.emit('playerCompleteWord', data);
  }

  render = () => (
    <div>
      <p>{ this.props.gameId }</p>
      <Words
        words={this.state.words}
        handleWordSubmit={this.handleWordSubmit}
        />
      <WordInput handleWordSubmit={this.handleWordSubmit} />
    </div>
  );
}