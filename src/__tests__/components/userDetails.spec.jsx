import React from 'react';
import renderer from 'react-test-renderer';

import UserDetails from '../../components/userDetails';

describe('components/userDetails', () => {
  const user = {
    login: 'test login',
    html_url: 'test url',
    avatar_url: 'test avatar',
    created_at: 'test created date',
    public_repos: 12,
    followers: 345,
  };

  it('matches snapshot', () => {
    const tree = renderer.create(
      <UserDetails user={user} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
