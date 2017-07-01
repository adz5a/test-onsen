import {
    SAVE,
    BULK_SAVE
} from "./commons";
import reduce from "lodash/fp/reduce";
import conforms from "lodash/fp/conforms";
import isString from "lodash/isString";
import every from "lodash/fp/every";
import isArray from "lodash/isArray";



const bulkUpdate = reduce( ( state, doc ) => {


    state[doc.id] = doc;
    return state;


});

const allStrings = every(isString);

const ObjectModel = conforms({
    _id: isString,
    type: isString,
    tags: value => isArray(value) && allStrings(value)
});

const TagModel = conforms({
    _id: isString,
    name: isString,
    description: isString
});


export function reducer ( state = {}, action ) {


    const { type, data } = action;


    switch ( type ) {


        case BULK_SAVE:
            return bulkUpdate( state, action.data );

        case SAVE:
            console.log(data);
            return {

                ...state,
                [ data._id ]: data

            };

        default:
            return state;

    }

}
