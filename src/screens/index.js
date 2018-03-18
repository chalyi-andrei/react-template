// @flow
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AUTH_TOKEN } from "../Router";
import Header from "../components/Header/Header";
import "./styles.css";

type Props = {
  history: Object,
  companyName: string,
  children: Element
};

class App extends React.Component<Props> {
  handleUserLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    this.props.history.replace("/");
  };

  render() {
    const { history, companyName } = this.props;
    const page = this.props.children;

    return (
      <div className="AppContainer">
        <Header
          companyName={companyName}
          history={history}
          logout={this.handleUserLogout}
        />
        {page}
      </div>
    );
  }
}

export default withRouter(
  connect(({ company }) => ({
    companyName: "Company name"
  }))(App)
);
