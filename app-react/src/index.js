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

import "onsenui/css/onsen-css-components.css";
import "onsenui/css/onsenui.css";

ReactDOM.render(
    <Provider store={createStore()}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
