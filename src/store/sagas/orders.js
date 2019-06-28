import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import OrdersActions from '../ducks/projects';

export function* getOrders() {
	const response = yield call(api.get, '/orders');
	yield put(OrdersActions.getOrdersSuccess(response.data));
}
