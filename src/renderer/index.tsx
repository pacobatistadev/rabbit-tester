import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from "react-redux";
import store from "@redux/store";

import Root from '@sections/Root'

ReactDOM.render((
  <Provider store={store}>
    <Root />
  </Provider>
), document.getElementById('app'))
