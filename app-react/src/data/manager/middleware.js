import {
    SET_BUCKET
} from "./reducer";
import PouchDB from "pouchdb";
import {
    isSafe,
    fromMiddleware,
    PROCESSING
} from "data/commons";

export function middleware ( store ) {

    const db = new PouchDB("manger-db");

    db.get("config")
        .then( doc => store.dispatch({
            type: SET_BUCKET,
            data: doc.config,
            meta: fromMiddleware()
        }))
        .catch( err => {
            console.debug("error on startup " + err );
        });

    return next => action => {

        const { data, type } = action;

        switch ( type ) {


            case SET_BUCKET:
                if ( isSafe( action ) ) {

                    db.get("config")
                        .then( 
                            doc => db.put({
                                _id: "config",
                                _rev:  doc._rev,
                                config: data
                            }),
                            err => db.put({
                                _id: "config",
                                config: data
                            }),
                        )
                        .then(() => next({
                            ...action,
                            meta: fromMiddleware()
                        }));
                    return next({
                        type: PROCESSING,
                        data: action,
                        meta: fromMiddleware()
                    });

                } else {

                    return next(action);

                }


            default:
                return next(action);

        }

    }

}
