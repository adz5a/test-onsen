import PouchDB from "pouchdb";
import  {
    SAVE
} from "./commons";


export function middleware ( store ) {

    const db = new PouchDB("db");

    return next => action => next(action);

}
