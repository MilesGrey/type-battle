import React from 'react';
import EnemyDesk from './EnemyDesk';
import MyDesk from './MyDesk';
import HpBar from './HpBar';

const Game = () => (
  <div>
    <EnemyDesk />
    <HpBar />
    <MyDesk />
  </div>
);

export default Game;