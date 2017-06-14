import {
    ADD_TODO,
    ADD_TODO_ERROR,
    isTodo
} from "./../data/todolist";
import {
    conforms,
    isObject,
    isString,
    defaults,
    pick
} from "lodash";
import {
    isUser
} from "./../data/user";

const fromMiddleware = conforms({
    origin: value => value === "middleware"
});

const meta = (obj = {}) => defaults(obj, {
    origin: "middleware"
});

function isSafe ( action ) {

    return (
        isObject(action) &&
        ( 
            !isObject(action.meta ) ||
            ( isObject(action.meta) && !fromMiddleware(action.meta) )
        )
    );

}

export const PROCESSING = "processing";


function processAddTodo ( db, user, data = {} ) {

    if ( !isUser(user) || !isObject(data)) {

        return Promise.reject(
            new Error("Must have a valid user and valid todo")
        );

    } else {
        console.debug("yoli");

        const ref = db.ref("users/" + user.uid + "/todos");
        const id = ref.push().key;

        const todo = {
            ...data,
            id
        };


        if ( isTodo(todo) ) {
            return ref.child(id)
                .set(todo)
                .then( () => todo );

        } else {
            return Promise.reject(
                new Error("Cannot build a valid todo")
            );

        }
    }

}



export function todoApi ( app ) {

    const database = app.database();

    return function todoApiMiddleware ( store ) {


        


        return next => action => {

            switch ( action.type ) {

                case ADD_TODO:
                    if ( isSafe(action) ) {


                        processAddTodo(
                            database,
                            store.getState().user,
                            action.data
                        )
                            .then(
                                todo => store.dispatch({
                                    type: ADD_TODO,
                                    meta: meta(),
                                    data: todo
                                }),
                                error => store.dispatch({
                                    type: ADD_TODO_ERROR,
                                    meta: meta(),
                                    data: error
                                })
                            )
                            .catch(console.error);



                        return next({

                            type: PROCESSING,
                            data: action,
                            meta: meta()

                        });

                    } else {

                        return next(action);

                    }




                default:
                    return next(action);

            }

        };

    };

}
