import parseLinkHeader from 'parse-link-header';

import { getUsers } from '../api/github';
import { getNextUserId } from '../reducers/usersList';

export const START_FETCHING_USERS = 'START_FETCHING_USERS';
export const ERROR_FETCHING_USERS = 'ERROR_FETCHING_USERS';
export const FINISH_FETCHING_USERS = 'FINISH_FETCHING_USERS';

export const startFetchingUsers = () => ({
  type: START_FETCHING_USERS,
});

export const errorFetchingUsers = (error) => ({
  error,
  type: ERROR_FETCHING_USERS,
});

export const finishFetchingUsers = (users, nextUserId) => ({
  users,
  nextUserId,
  type: FINISH_FETCHING_USERS,
});

export const fetchUsers = () => (dispatch, getState) => {
  dispatch(startFetchingUsers());

  return getUsers(getNextUserId(getState()))
    .then(response => {
      const link = parseLinkHeader(response.headers.link);
      dispatch(finishFetchingUsers(response.data, link.next.since));
    })
    .catch(error => {
      dispatch(errorFetchingUsers(error.toString()));
    });
};
