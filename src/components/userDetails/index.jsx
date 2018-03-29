import React from 'react';
import PropTypes from 'prop-types';

import './index.scss'

const formattedDate = (date) => new Date(date).toDateString();

const UserDetails = ({ user }) => (
  <div className="UserDetails">
    <img
      className="UserDetails__avatar"
      src={user.avatar_url}
      alt={`${user.login} avatar`}
    />
    <div className="UserDetails__info">
      <a
        href={user.html_url}
        target="_blank"
        className="UserDetails__link"
      >
        Checkout on GitHub
      </a>
      <div className="UserDetails__attr">
        Login: {user.login}
      </div>
      <div className="UserDetails__attr">
        Number of followers: {user.followers}
      </div>
      <div className="UserDetails__attr">
        Number of public repos: {user.public_repos}
      </div>
      <div className="UserDetails__attr">
        On GitHub since: {formattedDate(user.created_at)}
      </div>
    </div>
  </div>
);

UserDetails.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    public_repos: PropTypes.number.isRequired,
    followers:PropTypes.number.isRequired,
  }),
};

export default UserDetails;
