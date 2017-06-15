import {
    conforms,
    isString,
    isBoolean
} from "lodash";
import {
    ACTIONFACTORY,
    PROCESSING
} from "./commons";

const defaultState = {
    uid: null,
    email: null,
    processing: false
};


export const isUser = conforms({
    uid: isString,
    email: isString
});

export const isValidState = conforms({
    uid: isString,
    email: isString,
    processing: isBoolean
});


export const USERACTION = ACTIONFACTORY("user");

export const LOG_USER = USERACTION("log-user");
export const LOG_ERROR = USERACTION("log-error");
export const UNLOG_USER = USERACTION("unlog-user");
export const SIGN_USER = USERACTION("sign-user");

export function reducer ( state = defaultState, action ) {

    switch ( action.type ) {

        case LOG_USER:
            return {
                ...state,
                ...action.data,
                processing: false
            };

        case PROCESSING:
            switch ( action.data.type ) {

                case SIGN_USER:
                case LOG_USER:
                    return {
                        ...state,
                        processing: true
                    };

            }

        default:
            return state;

    }

}
