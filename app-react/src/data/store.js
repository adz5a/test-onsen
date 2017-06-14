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
} from "./todolist";


export function createStore ( {
    middlewares = []
} = {}) {

    let composeEnhancers = compose;


    const reducer = combineReducers({
        user,
        todolist
    });

    if ( process.env.NODE_ENV !== "production" ) {

        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    }

    return  createReduxStore(reducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(...middlewares)
    ));
}
