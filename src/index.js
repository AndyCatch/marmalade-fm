import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'tachyons'
import './css/main.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'

import mixesApp from './store/index'

// Create a new Redux store with the `createStore` function,
// connects the browser to the Redux DevTools
let store = createStore(
  mixesApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// Create a new Redux Provider, pass in store as a prop, contains our App
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
