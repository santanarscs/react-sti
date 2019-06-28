import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastr } from 'react-redux-toastr';
import { reducer as orders } from './orders';

export default history =>
	combineReducers({
		orders,
		toastr,
		router: connectRouter(history)
	});
