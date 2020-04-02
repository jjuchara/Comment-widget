import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import rootReducer from "./redux/rootReduser";


const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
    < Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

