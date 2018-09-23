import React from 'react';
import Word from './Word';

const Words = (props) => (
  <div>
  {
    !!props.words && props.words.map((word, index) => (
      <Word
        key={index} 
        word={word}
      />
    ))
  }
  </div>
);

export default Words;