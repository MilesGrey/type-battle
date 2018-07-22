import React from 'react';
import Words from './Words';
import WordInput from './WordInput';

export default class MyDesk extends React.Component {
  handleWordSubmit = (inputWord) => {
    if (this.state.words.indexOf(inputWord) === -1 ) {
      return true;
    }

    this.setState((prevState) => ({
      words: prevState.words.filter(word => inputWord != word)
    }));
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