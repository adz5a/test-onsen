import {
    UNLOG_USER,
    LOG_USER,
    SIGN_USER,
    LOG_ERROR
} from "data/user";
import {
    conforms,
    // isObject,
    isString,
    defaults,
    pick
} from "lodash";
import {
    PROCESSING,
    isSafe
} from "data/commons";



const meta = (obj = {}) => defaults(obj, {
    origin: "middleware"
});



export const isCredentials = conforms({
    email: isString,
    password: isString
});

export function processUserLogRequest ( auth, creds ) {

    if ( !isCredentials(creds) ) {

        return Promise.reject(new Error("Invalid Credentials"));

    } else {

        return auth
            .signInWithEmailAndPassword(
                creds.email,
                creds.password
            );

    }

}

export function processUserSignInRequest( auth, creds ) {

    if ( !isCredentials(creds) ) {

        return Promise.reject(new Error("Invalid Credentials"));

    } else {

        return auth
            .createUserWithEmailAndPassword(
                creds.email,
                creds.password
            );

    }

}

export function processUserUnlogRequest ( auth ) {

    return auth.signOut();

}

export function userApi ( app ) {

    const auth = app.auth();

    return function middleware ( store ) {


        auth.onAuthStateChanged(
            user => {

                if ( !user ) {

                    store.dispatch({
                        type:UNLOG_USER,
                        meta: meta()
                    })

                } else {

                    store.dispatch({
                        type:LOG_USER,
                        data: pick( user, [ "email", "uid" ] ),
                        meta: meta()
                    });

                }

            },
            error => {

                console.error(error);

            }
        );


        return next => action => {

            switch ( action.type ) {

                case LOG_USER:
                    if ( isSafe(action) ) {

                        processUserLogRequest(
                            auth,
                            action.data
                        )
                            .then(
                                user => store.dispatch({
                                    type: LOG_USER,
                                    data: pick(user, [ "uid", "email" ]),
                                    meta: meta()
                                }),
                                error => store.dispatch({
                                    type: LOG_ERROR,
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

                case SIGN_USER:
                    if ( isSafe(action) ) {


                        processUserSignInRequest( auth, action.data )
                            .then(
                                user => store.dispatch({
                                    type: LOG_USER,
                                    data: pick(user, [ "uid", "email" ]),
                                    meta: meta()
                                }),
                                error => store.dispatch({
                                    type: LOG_ERROR,
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

                case UNLOG_USER:
                    if ( isSafe(action) ) {

                        processUserUnlogRequest( auth )
                            .then(
                                () => store.dispatch({
                                    type: UNLOG_USER,
                                    data: null,
                                    meta: meta()
                                }),
                                error => store.dispatch({
                                    type: LOG_ERROR,
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

    }

}
