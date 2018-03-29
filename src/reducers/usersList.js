import {
  START_FETCHING_USERS,
  ERROR_FETCHING_USERS,
  FINISH_FETCHING_USERS,
} from '../actions/usersList';

export const INITIAL_STATE = {
  data: [],
  nextUserId: undefined,
  fetching: false,
  error: '',
};

const usersListReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case START_FETCHING_USERS:
      return {
        ...state,
        error: '',
        fetching: true,
      };
    case ERROR_FETCHING_USERS:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case FINISH_FETCHING_USERS:
      return {
        ...state,
        fetching: false,
        data: [...state.data, ...action.users],
        nextUserId: action.nextUserId,
      };
    default:
      return state;
  }
};

export const getError = state => state.usersList.error;
export const getUsersList = state => state.usersList.data;
export const getFetching = state => state.usersList.fetching;
export const getNextUserId = state => state.usersList.nextUserId;

export default usersListReducer;
