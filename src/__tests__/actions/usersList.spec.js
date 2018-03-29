import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import {
  startFetchingUsers,
  errorFetchingUsers,
  finishFetchingUsers,
  fetchUsers,
} from '../../actions/usersList';
import { INITIAL_STATE } from '../../reducers/usersList';

describe('startFetchingUsers()', () => {
  it('returns valid object', () => {
    expect(startFetchingUsers()).toEqual({
      type: 'START_FETCHING_USERS',
    });
  });
});

describe('errorFetchingUsers(error)', () => {
  it('returns valid object', () => {
    expect(errorFetchingUsers('test error')).toEqual({
      type: 'ERROR_FETCHING_USERS',
      error: 'test error'
    });
  });
});

describe('finishFetchingUsers(users, nextUserId)', () => {
  it('returns valid object', () => {
    expect(finishFetchingUsers('users', 'next user id')).toEqual({
      type: 'FINISH_FETCHING_USERS',
      nextUserId: 'next user id',
      users: 'users',
    });
  });
});

describe('fetchUsers()', () => {
  const mock = new AxiosMockAdapter(axios);
  const mockStore = configureMockStore([thunk]);

  it('calls START_FETCHING_USERS and FINISH_FETCHING_USERS actions', () => {
    mock.onGet('https://api.github.com/users').reply(
      200,
      [ { id: 1, login: 'octocat' } ],
      {
        link: '<https://api.github.com/users?since=2>; rel="next", <https://api.github.com/users{?since}>; rel="first"',
      },
    );

    const store = mockStore({ usersList: INITIAL_STATE });

    const expectedActions = [
      { type: 'START_FETCHING_USERS' },
      {
        type: 'FINISH_FETCHING_USERS',
        users: [ { id: 1, login: 'octocat' } ],
        nextUserId: '2',
      },
    ];

    expect.assertions(1);
    return store.dispatch(fetchUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('calls START_FETCHING_USERS and ERROR_FETCHING_USERS actions', () => {
    mock.onGet('https://api.github.com/users').reply(
      500,
      { error: 'Something went wrong' },
    );

    const store = mockStore({ usersList: INITIAL_STATE });

    const expectedActions = [
      { type: 'START_FETCHING_USERS' },
      {
        type: 'ERROR_FETCHING_USERS',
        error: 'Error: Request failed with status code 500',
      },
    ];

    expect.assertions(1);
    return store.dispatch(fetchUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
