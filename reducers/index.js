import { combineReducers } from 'redux';
import { navigationReducer } from './navigation';
import postsReducer from './posts';

export default combineReducers(Object.assign(
  navigationReducer,
  postsReducer,
));
