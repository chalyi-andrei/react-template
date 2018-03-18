// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { signUp } from "../../store/modules/auth/auth";

import './styles.css';

class Login extends Component {
  state = {
    data: {
      email: "",
      password: "",
      login: ""
    }
  };

  login = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  changeValue = (key, val) => {
    this.setState({
      data: {
        ...this.state.data,
        [key]: val
      }
    });
  };

  render() {
    const { email, password, login } = this.state.data;

    return (
      <div className="login-container">
        <form className="form" onSubmit={e => this.login(e)}>
          <input
            className="form__input"
            type="text"
            onChange={e => this.changeValue("email", e.target.value)}
            placeholder="email"
            value={email}
          />
          <input
            className="form__input"
            type="text"
            onChange={e => this.changeValue("password", e.target.value)}
            placeholder="password"
            value={password}
          />
          <input
            className="form__input"
            type="text"
            onChange={e => this.changeValue("login", e.target.value)}
            placeholder="login"
            value={login}
          />
          <button className="form__btn" type="submit" >LOGIN</button>
        </form>
      </div>
    );
  }
}

export default withRouter(
  connect(({ auth }) => ({ auth }), {
    signUp
  })(Login)
);
