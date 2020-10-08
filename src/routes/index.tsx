import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

import UsersList from '../pages/Users/List';
import UserDetail from '../pages/Users/Detail';
import OrdersList from '../pages/Orders/List';
import AppointmentsList from '../pages/Appointments/List';
import EquipamentsList from '../pages/Equipaments/List';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/users/detail/:id" isPrivate component={UserDetail} />
    <Route path="/users" isPrivate component={UsersList} />
    <Route path="/orders" isPrivate component={OrdersList} />
    <Route path="/appointments" isPrivate component={AppointmentsList} />
    <Route path="/equipaments" isPrivate component={EquipamentsList} />
  </Switch>
);

export default Routes;
