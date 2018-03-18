// @flow

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureApi from "./api";
import config from "./constants/config";
import store from "./store/index";
import AppRouter from "./Router";

configureApi(config.baseURL);

const root = document.getElementById("root");

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    root
  );
}
