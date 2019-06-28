import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Order from '../pages/Order';
const Routes = () => (
	<Switch>
		<Route exact path="/" component={Main} />
		<Route path="/orders" component={Order} />
	</Switch>
);

export default Routes;
