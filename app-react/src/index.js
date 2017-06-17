import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    createStore
} from "data/store";
import {
    Provider
} from "react-redux";
import {
    initApi
} from "api";
import {
    userApi
} from "api/user";
import {
    todoApi
} from "api/todolist";
import Router from "./Router";
import "onsenui/css/onsen-css-components.css";
import "onsenui/css/onsenui.css";
import {
    isCordova,
    isProduction
} from "./env";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import reactTapEventPlugin from "react-tap-event-plugin";

reactTapEventPlugin();

const api = initApi(firebaseConfig);
const userMiddleware = userApi(api);
const todoMiddleware = todoApi(api);



ReactDOM.render(
    <Provider 
        store={createStore({
            middlewares: [
                userMiddleware,
                todoMiddleware
            ]
        })}
    >
        <Router>
            <MuiThemeProvider>
                    <App />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);

if ( !isCordova || !isProduction ) {

    // cannot register service worker 
    // while on the filesystem
    registerServiceWorker();

}
