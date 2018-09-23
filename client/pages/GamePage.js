import React from 'react';
import MyDesk from '../components/MyDesk';

const GamePage = (props) => (
  <div>
    <MyDesk socket={props.socket} gameId={props.match.params.roomName}></MyDesk>
  </div>
);

export default GamePage;