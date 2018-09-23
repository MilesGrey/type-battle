import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import NotFoundPage from './pages/NotFoundPage';
import openSocket from 'socket.io-client';

const socket = openSocket();

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path='/' render={(props) => <StartPage {...props} socket={socket} />} exact={true} />
      <Route path='/game/:roomName' render={(props) => <GamePage {...props} socket={socket} />} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default routes;