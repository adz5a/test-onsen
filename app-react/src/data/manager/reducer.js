import {
    ACTIONFACTORY
} from "data/commons";

const ACTION = ACTIONFACTORY("manager");

export const SET_BUCKET = ACTION("set-bucket");
export const LIST_DIRS = ACTION("list-dirs");

export const setBucket = () => ({
    type: SET_BUCKET
});


const defaultState = {
    bucket: null,
    baseURL: null
};


export function reducer ( state = defaultState, action ) {

    const { type, data } = action;
    switch ( type ) {


        case SET_BUCKET:
            return {
                baseURL: data.baseURL,
                bucket: data.bucket
            };


        default:
            return state;

    }

}
