import React from 'react';
import EnemyDesk from './EnemyDesk';
import MyDesk from './MyDesk';

export default class Game extends React.Component {
  enemyName = 'enemy';

  render = () => (
    <div>
      <EnemyDesk name={this.enemyName} />
      <MyDesk />
    </div>
  );
}