import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import NotFoundPage from './pages/NotFoundPage';

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={StartPage} exact={true} />
      <Route path='/game/:roomName' component={GamePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default routes;