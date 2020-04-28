import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from './config/store'

const app = (
  // access store globally
  <Provider store={store}>
    <App />
  </Provider>
);


ReactDOM.render(app, document.getElementById("root"));