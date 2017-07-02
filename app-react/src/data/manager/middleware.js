import {
    SET_BUCKET,
    LIST_DIRS
} from "./reducer";
import PouchDB from "pouchdb";
import {
    isSafe,
    fromMiddleware,
    PROCESSING,
    process
} from "data/commons";
import {
    listPrefixes
} from "data/aws/xml.utils";

// for use later
const parserInstance = new DOMParser()
const parser = string => parserInstance.parseFromString(string, "text/xml");

const setBucket = ( db, data ) => db.get("config")
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
    );

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

                    setBucket( db, data )
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

            case LIST_DIRS:
                if ( isSafe ( action ) ) {

                    listPrefixes(parser)(store.getState().manager)
                        .then( set => ([...set]))
                        .then( dirs => next({
                            ...action,
                            data: dirs,
                            meta: fromMiddleware()
                        }) );

                    return next(process(action));

                } else {

                    return next(action);

                }


            default:
                return next(action);

        }

    }

}
