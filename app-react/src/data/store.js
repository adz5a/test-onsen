import { 
    createStore as createReduxStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import {
    reducer as user 
} from "./user";

function noopMiddleware () {

    return next => action => next(action);

}

export function createStore () {

    let composeEnhancers = compose;

    const middlewares = [ noopMiddleware ];

    const reducer = combineReducers({
        user
    });

    if ( process.env.NODE_ENV !== "production" ) {

        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    }

    return  createReduxStore(reducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(...middlewares)
    ));
}
