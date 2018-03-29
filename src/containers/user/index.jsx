import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Error from '../../components/error';
import Spinner from '../../components/spinner';
import HomeLink from '../../components/homeLink';
import UserDetails from '../../components/userDetails';
import { fetchUser } from '../../actions/user';
import { getUser, getError, getFetching } from '../../reducers/user';

class User extends React.Component {
  componentWillMount() {
    this.props.fetchUser(this.props.match.params.login);
  }

  render() {
    const { user, error, fetching } = this.props;
    let content;

    if (error) {
      content = <Error error={error} />;
    } else if (fetching || !user) {
      content = <Spinner />;
    } else {
      content = <UserDetails user={user} />;
    }

    return (
      <div>
        <HomeLink />
        {content}
      </div>
    );
  }
};

User.defaultProps = {
  fetching: false,
};

User.propTypes = {
  fetching: PropTypes.bool,
  user: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: getUser(state),
  error: getError(state),
  fetching: getFetching(state),
});

export default connect(
  state => mapStateToProps(state),
  { fetchUser }
)(User);
