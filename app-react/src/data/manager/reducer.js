import {
    ACTIONFACTORY
} from "data/commons";

const ACTION = ACTIONFACTORY("manager");

export const SET_BUCKET = ACTION("set-bucket");
export const LIST_DIRS = ACTION("list-dirs");
export const LIST_DIRS_ERROR = ACTION("list-dirs");

export const setBucket = () => ({
    type: SET_BUCKET
});


const defaultState = {
    bucket: null,
    baseURL: null,
    content: {
        status: null,
        dirs: {}
    }
};


export const insert = ( res = {}, prefix, tail ) => {

    if ( tail.length > 0 ) {

        res[prefix] = insert(res[prefix], prefix + "/" + tail[0], tail.slice(1));
        return res;

    } else {

        return res;

    }
};


export function reducer ( state = defaultState, action ) {

    const { type, data } = action;
    switch ( type ) {


        case SET_BUCKET:
            return {
                ...state,
                baseURL: data.baseURL,
                bucket: data.bucket
            };

        case LIST_DIRS:
            return {
                ...state,
                content: {
                    status: LIST_DIRS,
                    dirs: data
                    .map( path => path.split("/") )
                    .reduce(( res, path ) => {

                        return insert(res, path[0], path.slice(1));

                    }, {} )
                }
            };

        case LIST_DIRS_ERROR:
            return {
                ...state,
                content: {
                    status: LIST_DIRS_ERROR,
                    dirs: {}
                }
            };


        default:
            return state;

    }

}
