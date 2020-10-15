import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

import UsersList from '../pages/Users/List';
import UserDetail from '../pages/Users/Detail';
import UserAdd from '../pages/Users/Add';
import UserEdit from '../pages/Users/Edit';

import OrdersList from '../pages/Orders/List';
import OrderDetail from '../pages/Orders/Detail';

import AppointmentsList from '../pages/Appointments/List';

import EquipamentsList from '../pages/Equipaments/List';
import EquipamentDetail from '../pages/Equipaments/Detail';
import EquipamentAdd from '../pages/Equipaments/Add';
import EquipamentEdit from '../pages/Equipaments/Edit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" isPrivate component={Dashboard} />

    <Route path="/users/detail/:id" isPrivate component={UserDetail} />
    <Route path="/users/edit/:id" isPrivate component={UserEdit} />
    <Route path="/users/new" isPrivate component={UserAdd} />
    <Route path="/users" isPrivate component={UsersList} />

    <Route path="/orders/detail/:id" isPrivate component={OrderDetail} />
    <Route path="/orders" isPrivate component={OrdersList} />

    <Route path="/appointments" isPrivate component={AppointmentsList} />

    <Route
      path="/equipaments/detail/:id"
      isPrivate
      component={EquipamentDetail}
    />
    <Route path="/equipaments/edit/:id" isPrivate component={EquipamentEdit} />
    <Route path="/equipaments/new" isPrivate component={EquipamentAdd} />
    <Route path="/equipaments" isPrivate component={EquipamentsList} />
  </Switch>
);

export default Routes;
