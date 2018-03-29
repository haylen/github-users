import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Error from '../../components/error';
import Spinner from '../../components/spinner';
import UserPanel from '../../components/userPanel';
import LoadMoreBtn from '../../components/loadMoreBtn';
import { fetchUsers } from '../../actions/usersList';
import { getError, getUsersList, getFetching } from '../../reducers/usersList';

import './index.scss';

export class UsersList extends React.Component {
  componentWillMount() {
    if (this.props.users.length === 0) {
      this.props.fetchUsers();
    }
  }

  renderUserLinks() {
    return this.props.users.map(user => (
      <Link
        key={user.login}
        to={`users/${user.login}`}
        className="UsersList__link"
      >
        <UserPanel user={user} />
      </Link>
    ));
  }

  renderLoadMore() {
    const { error, fetchUsers } = this.props;
    const errorContent = error ? <Error error={error} /> : null;

    return (
      <div className="testtt">
        {errorContent}
        <LoadMoreBtn onClick={fetchUsers} />
      </div>
    );
  }

  render() {
    return (
      <div className="UsersList">
        <h1 className="UsersList__title">GitHub users list</h1>
        <div className="UsersList__linksWrapper">
          {this.renderUserLinks()}
        </div>
        <div className="UsersList__loadMoreWrapper">
          {this.props.fetching ? <Spinner /> : this.renderLoadMore()}
        </div>
      </div>
    );
  }
};

UsersList.defaultProps = {
  fetching: false,
};

UsersList.propTypes = {
  fetching: PropTypes.bool,
  users: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: getError(state),
  users: getUsersList(state),
  fetching: getFetching(state),
});

export default connect(
  state => mapStateToProps(state),
  { fetchUsers }
)(UsersList);
