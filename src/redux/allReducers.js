import {combineReducers} from 'redux';
import {
  tokenReducer,
  userReducer,
} from '../screen/authentication/redux/reducer';
import {rentalReducer} from '../screen/Cycle/redux/reducer';
import {cycleReducer} from '../screen/DetailCycle/redux/reducer';
import {timeReducer} from '../screen/TimerRent/redux/reducer';
import {GlobalReducer} from './globalReducer';

export const allReducers = combineReducers({
  user: userReducer,
  rent: timeReducer,
  token: tokenReducer,
  global: GlobalReducer,
  rental: rentalReducer,
  cycle: cycleReducer,
});
