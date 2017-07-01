import {
    joinUppercase 
} from "./../commons";
import {
    partial,
    isObject
} from "lodash";

export const ACTIONFACTORY = prefix => partial(joinUppercase, prefix);

const GLOBALACTION = ACTIONFACTORY("global");

export const PROCESSING = GLOBALACTION("processing");


export function isSafe ( action ) {

    return (
        isObject(action) &&
        (
            !isObject(action.meta ) ||
            ( isObject(action.meta) && !action.meta.origin === "middleware" )
        )
    );

}

export const fromMiddleware = (meta = {}) => ({
    ...meta,
    origin: "middleware"
});
