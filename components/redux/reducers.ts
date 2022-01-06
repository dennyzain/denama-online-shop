import { combineReducers } from 'redux';
import cart from './cart/index';
import product from './product/index';
import UI from './UI/index';

const rootReducer = combineReducers({ cart, product, UI });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
