import { all, takeLatest } from 'redux-saga/effects';

import { getOrders } from './orders';
import { OrdersTypes } from '../ducks/orders';

export default function* rootSaga() {
	return yield all([takeLatest(OrdersTypes.GET_ORDERS_REQUEST, getOrders)]);
}
