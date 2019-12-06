import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers, { initialState } from './reducers'
import './index.css';
// import './styles/reset.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

let store = createStore(reducers, initialState)

const provider = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(provider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
