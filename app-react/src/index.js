import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    createStore
} from "./data/store";
import {
    Provider
} from "react-redux";
import {
    initApi
} from "./api";
import {
    userApi
} from "./api/user";

import "onsenui/css/onsen-css-components.css";
import "onsenui/css/onsenui.css";


const api = initApi(firebaseConfig);
const userMiddleware = userApi(api);

ReactDOM.render(
    <Provider store={createStore({
        middlewares: [
            userMiddleware
        ]
    })}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
