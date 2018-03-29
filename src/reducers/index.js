import { combineReducers } from 'redux';

import user from './user';
import usersList from './usersList';

export default combineReducers({
  user,
  usersList,
});
