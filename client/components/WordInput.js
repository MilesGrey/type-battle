import React from 'react';

export default class WordInput extends React.Component {
  handleWordSubmit = (e) => {
    e.preventDefault();

    const word = e.target.elements.word.value;
    const error = this.props.handleWordSubmit(word);
    if (error) {
      return;
    }
    e.target.elements.word.value = '';
  }

  render = () => (
    <div>
      <form onSubmit={this.handleWordSubmit}>
        <input
          id="wordInput"
          type="text"
          name="word"
          disabled="true"
        />
      </form>
    </div>
  );
}