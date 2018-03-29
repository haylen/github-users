import { getUser } from '../api/github';

export const START_FETCHING_USER = 'START_FETCHING_USER';
export const ERROR_FETCHING_USER = 'ERROR_FETCHING_USER';
export const FINISH_FETCHING_USER = 'FINISH_FETCHING_USER';

export const startFetchingUser = () => ({
  type: START_FETCHING_USER,
});

export const errorFetchingUser = (error) => ({
  error,
  type: ERROR_FETCHING_USER,
});

export const finishFetchingUser = (user) => ({
  user,
  type: FINISH_FETCHING_USER,
});

export const fetchUser = (login) => {
  return (dispatch, getState) => {
    dispatch(startFetchingUser());

    return getUser(login)
      .then(response => {
        dispatch(finishFetchingUser(response.data));
      })
      .catch(error => {
        dispatch(errorFetchingUser(error.toString()));
      });
  }
};
