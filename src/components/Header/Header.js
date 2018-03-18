// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Header extends Component {
  render() {
    const { history, companyName, logout } = this.props;

    return (
      <div className="header">
        <div className="header__inner">
          <div className="header__logo">
            <Link className="header__name" to="/">
              {companyName}
            </Link>
          </div>
          <div className="login">
            <Link className="header__login" to="/login">
              login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
