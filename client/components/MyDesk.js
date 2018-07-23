import React from 'react';
import openSocket from 'socket.io-client';
import Words from './Words';
import WordInput from './WordInput';

const socket = openSocket('http://localhost:8080');

export default class MyDesk extends React.Component {
  state = {
    words: []
  }

  componentDidMount() {
    socket.on('wordCompleted', word => {
      console.log(word);
      
      this.setState((prevState) => ({
        words: prevState.words.concat(word)
      }));
    });
  }

  handleWordSubmit = (inputWord) => {
    if (this.state.words.indexOf(inputWord) === -1 ) {
      return true;
    }

    this.setState((prevState) => ({
      words: prevState.words.filter(word => inputWord != word)
    }));
    socket.emit('wordCompleted', inputWord);
  }

  render = () => (
    <div>
      <Words
        words={this.state.words}
        handleWordSubmit={this.handleWordSubmit}
        />
      <WordInput handleWordSubmit={this.handleWordSubmit} />
    </div>
  );
}