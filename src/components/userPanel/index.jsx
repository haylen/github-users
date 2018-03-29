import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const UserPanel = ({ user }) => (
  <div className="UserPanel">
    <img
      className="UserPanel__avatar"
      src={user.avatar_url}
      alt={`${user.login} avatar`}
    />
    <div className="UserPanel__login">
      {user.login}
    </div>
  </div>
);

UserPanel.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }),
};

export default UserPanel;
