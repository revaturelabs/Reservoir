import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Spinner } from "./Components/Common/spinner";
import { createStore } from 'redux';
import { batchReducer } from "./redux/reducers"
import { Provider } from "react-redux";

const store = createStore(batchReducer);

ReactDOM.render(
  <Provider store = {store}>
  <React.StrictMode>
    
    <App />
    <Spinner area="invalid"/>
  </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
