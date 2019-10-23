import { combineReducers } from 'redux'
import gameSetting from './gameSetting'
import history from './history'
import isDescending from './isDescending'
import step from './step'
import xIsNext from './xIsNext'
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const caroApp = combineReducers({
  gameSetting,
  history,
  isDescending,
  step,
  xIsNext,
  errors: errorReducer,
  auth: authReducer
}); 

export default caroApp