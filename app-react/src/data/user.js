import { partial } from "lodash";
import { 
    joinUppercase,
} from "./../commons";
import {
        conforms,
        isString
} from "lodash";

const defaultState = {
    uid: null,
    email: null
};


export const isUser = conforms({
    uid: isString,
    email: isString
});


export const USERACTION = partial(joinUppercase, "user");

export const LOG_USER = USERACTION("log-user");
export const LOG_ERROR = USERACTION("log-error");
export const UNLOG_USER = USERACTION("unlog-user");
export const SIGN_USER = USERACTION("sign-user");

export function reducer ( state = defaultState, action ) {

    switch ( action.type ) {

        case LOG_USER:
            return {
                ...state,
                ...action.data
            };

        default:
            return state;

    }

}
