import {
    ADD_TODO,
    ADD_TODO_ERROR,
    isTodo
} from "data/todolist";
import {
    conforms,
    isObject,
    defaults,
} from "lodash";
import {
    isUser,
    isLogged,
    LOG_USER
} from "data/user";
import {
    PROCESSING
} from "data/commons";


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


function processAddTodo ( db, user, data = {} ) {


    const refString = getUserTodoRef(user);


    if ( !isUser(user) || !isObject(data) || !refString ) {

        return Promise.reject(
            new Error("Must have a valid user and valid todo")
        );

    } else {

        const ref = db.ref(refString);

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


export function getUserTodoRef ( user ) {

    if ( !isUser(user) || !isLogged(user) ) {

        return null;

    } else {

        return "todos/" + user.uid;

    }

}


export function startup ( db, user, store ) {

    const refString = getUserTodoRef(user);

    if ( !refString ) {

        throw new Error("cannot find todos for an unlogged user");

    } else {

        return db.ref(refString)
            .on("child_added", ( snap, previousChildKey ) => {

                store.dispatch({
                    type: ADD_TODO,
                    data: snap.val(),
                    meta: meta()
                });

            });

    }

}

export function todoApi ( app ) {

    const database = app.database();
    let unsubscribe;

    return function todoApiMiddleware ( store ) {





        return next => action => {

            switch ( action.type ) {


                case LOG_USER:{

                    const prevState = store.getState();
                    const returnValue = next(action);
                    const nextState = store.getState();

                    if (
                        !isLogged(prevState.user) &&
                        isLogged(nextState.user)
                    ) {

                        try {
                            unsubscribe = startup(
                                database,
                                nextState.user,
                                store
                            );
                        } catch (e) {
                            console.error(e);
                        }

                    }

                    return returnValue;

                }



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
