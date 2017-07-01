import {
    createStore as createReduxStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import {
    reducer as user
} from "./user";
import {
    reducer as todolist
} from "./todolist";
import {
    reducer as aws,
} from "./aws";
import {
    reducer as db
} from "./db";



export function createStore ( {
    middlewares = []
} = {}) {

    let composeEnhancers = compose;


    const reducer = combineReducers({
        user,
        todolist,
        aws,
        db
    });

    if ( process.env.NODE_ENV !== "production" ) {

        const {
            ADD_TODO_ERROR,
            UPDATED_DISTANT_STATE_ERROR
             } = require("./todolist");
        const { LOG_ERROR } = require("./user");

        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        const { createLogger } = require("redux-logger");
        const logger = createLogger({
            predicate: (_, action ) => {

                return (
                    action.type === LOG_ERROR ||
                    action.type === ADD_TODO_ERROR ||
                    action.type === UPDATED_DISTANT_STATE_ERROR
                );

            }
        });

        middlewares = [ logger, ...middlewares ];

    }

    return  createReduxStore(reducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(...middlewares)
    ));
}
