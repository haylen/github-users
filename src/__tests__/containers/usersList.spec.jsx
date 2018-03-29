import React from 'react';
import { noop } from 'lodash';
import { shallow } from 'enzyme';

import Spinner from '../../components/spinner';
import UserPanel from '../../components/userPanel';
import LoadMoreBtn from '../../components/loadMoreBtn';
import { UsersList } from '../../containers/usersList';

describe('containers/usersList', () => {
  const usersList = props => shallow(
    <UsersList
      error={''}
      users={[]}
      fetching={false}
      fetchUsers={noop}
      {...props}
    />
  );

  it('renders without crashing', () => {
    const subject = usersList();

    expect(subject).toBeInstanceOf(Object);
    expect(subject.find('.UsersList').length).toEqual(1);
  });

  it('renders load more button when "fetching" is "false"', () => {
    const subject = usersList();

    expect(subject.find(LoadMoreBtn).length).toEqual(1);
  });

  it('renders spinner when "fetching" is "true"', () => {
    const subject = usersList({ fetching: true });

    expect(subject.find(Spinner).length).toEqual(1);
  });

  it('renders all users', () => {
    const subject = usersList({
      users: [
        { login: 'test1', avatar_url: '' },
        { login: 'test2', avatar_url: '' },
      ]
    });

    expect(subject.find(UserPanel).length).toBe(2);
  });

  it('calls "fetchUsers" when "users" are empty', () => {
    const fetchUsers = jest.fn();
    usersList({ fetchUsers });

    expect(fetchUsers.mock.calls.length).toBe(1);
  });
});
