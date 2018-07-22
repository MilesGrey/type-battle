import React from 'react';
import Word from './Word';

const Words = (props) => (
  <div>
  {
    props.words.map(word => (
      <Word
        key={word} 
        word={word}
      />
    ))
  }
  </div>
);

export default Words;