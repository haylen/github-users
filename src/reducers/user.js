import {
  START_FETCHING_USER,
  ERROR_FETCHING_USER,
  FINISH_FETCHING_USER,
} from '../actions/user';

const initialState = {
  data: null,
  error: '',
  fetching: false,
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case START_FETCHING_USER:
      return {
        ...state,
        error: '',
        fetching: true,
      };
    case ERROR_FETCHING_USER:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case FINISH_FETCHING_USER:
      return {
        ...state,
        fetching: false,
        data: action.user,
      };
    default:
      return state;
  }
};

export const getUser = state => state.user.data;
export const getError = state => state.user.error;
export const getFetching = state => state.user.fetching;

export default userReducer;
