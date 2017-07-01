import {
    SAVE,
    BULK_SAVE
} from "./commons";
import reduce from "lodash/fp/reduce";


const bulkUpdate = reduce( ( state, doc ) => {


    state[doc.id] = doc;
    return state;


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
