import PouchDB from "pouchdb";
import {
    SAVE,
    BULK_SAVE
} from "./commons";
import {
    PROCESSING,
    isSafe,
} from "./../commons";


const saveDoc = db => doc => db.get(doc._id)
    .catch( err => {
        if ( err.reason === "missing" ) {

            return db.put(doc);

        } else {

            throw err;

        }
    } );

const toAction = type => data => ({
    type,
    data,
    meta: {
        origin: "middleware"
    }
});

export function middleware ( store ) {

    const imgDB = new PouchDB("img");
    const tagDB = new PouchDB("tag");

    const persist = saveDoc(imgDB);


    imgDB.allDocs()
        .then( result => {

            const { rows } = result;

            return rows;

        })
        .then(toAction(BULK_SAVE))
        .then(store.dispatch);


    return next => action => {

        const { type, data } = action;

        switch ( type ) {


            case SAVE:

                if ( isSafe(action) ) {

                    persist(data)
                        .then(toAction(SAVE))
                        .then(store.dispatch)

                }

                return next({
                    type: PROCESSING,
                    data: action,
                    meta: {
                        origin: "middleware"
                    }
                });


            default:
                return next(action);


        }

    };

}
