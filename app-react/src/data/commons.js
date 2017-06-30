import {
    joinUppercase 
} from "./../commons";
import {
    partial
} from "lodash";

export const ACTIONFACTORY = prefix => partial(joinUppercase, prefix);

const GLOBALACTION = ACTIONFACTORY("global");

export const PROCESSING = GLOBALACTION("processing");

export const isSafe = action => {

    if ( action.meta ) {

        const isFormMiddleware = action.meta && action.meta.origin === "middleware";
        return !isFormMiddleware;

    } else {

        return true;

    }

}
