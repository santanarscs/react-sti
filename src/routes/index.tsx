import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

import Users from '../pages/Users';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/users" isPrivate component={Users} />
  </Switch>
);

export default Routes;
