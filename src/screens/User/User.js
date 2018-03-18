// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RingLoader } from "react-spinners";

import { getUsers } from "../../store/modules/users/users";

import "./styles.css";

class User extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  renderSpiner = () => (
    <div className="header__spinner-container">
      <div className="header__spinner">
        <RingLoader />
      </div>
    </div>
  );

  render() {
    const { users } = this.props;

    if (users.isFetching) {
      return this.renderSpiner();
    }

    return (
      <div className="users">
        <h2>Users</h2>
        {users.data.length &&
          users.data.map(u => (
            <div key={u.id} className="users__name">
              {u.name}
            </div>
          ))}
      </div>
    );
  }
}

export default withRouter(
  connect(({ users }) => ({ users }), {
    getUsers
  })(User)
);
