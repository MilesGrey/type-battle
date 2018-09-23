import React from 'react';
import Words from './Words';
import WordInput from './WordInput';

export default class MyDesk extends React.Component {
  state = {
    words: []
  }

  componentWillMount() {
    this.props.socket.emit('playerReady', this.props.gameId);
    this.props.socket.on('initializeRoom', (words) => {
      this.setState(() => ({
        words
      }));
    });

    this.props.socket.on('startCountdown', () => {
      let countdown = 5;
      const countdownLabel = document.getElementById('countdown');
      const interval = setInterval(() => {
        countdownLabel.innerHTML = --countdown;
        if (countdown === 0) {
          clearInterval(interval);
          const wordInput = document.getElementById('wordInput');
          wordInput.disabled = false;
          wordInput.focus();
          countdownLabel.style.display = 'none';
        }
      }, 1000);
      
    });

    this.props.socket.on('enemyWordCompleted', word => {
      this.setState((prevState) => ({
        words: prevState.words.concat(word)
      }));
    });
  }

  handleWordSubmit = (inputWord) => {
    if (!this.state.words.includes(inputWord)) {
      return;
    }

    this.setState((prevState) => ({
      words: prevState.words.filter(word => inputWord != word)
    }));

    const data = {
      gameId: this.props.gameId,
      word: inputWord
    }
    this.props.socket.emit('playerCompleteWord', data);
  }

  render = () => (
    <div>
      <h2>Room: { this.props.gameId }</h2>
      <h3 id="countdown">5</h3>
      <Words words={this.state.words} />
      <WordInput handleWordSubmit={this.handleWordSubmit} />
    </div>
  );
}