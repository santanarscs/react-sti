import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

import UsersList from '../pages/Users/List';
import OrdersList from '../pages/Orders/List';
import AppointmentsList from '../pages/Appointments/List';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/users" isPrivate component={UsersList} />
    <Route path="/orders" isPrivate component={OrdersList} />
    <Route path="/appointments" isPrivate component={AppointmentsList} />
  </Switch>
);

export default Routes;
