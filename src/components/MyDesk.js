import React from 'react';
import Word from './Word';

export default class MyDesk extends React.Component {
  state = {
    words: ['component', 'lamp', 'dog']
  }

  render = () => (
    <div>
      {
        this.state.words.map(word => (
          <Word word={word} />
        ))
      }
    </div>
  );
}