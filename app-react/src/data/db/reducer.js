import  {
    SAVE
} from "./commons";

export function reducer ( state = {}, action ) {


    const { type, data } = action;


    switch ( type ) {

        case SAVE:
            return {

                ...state,
                [ data._id ]: data

            };

        default:
            return state;

    }

}
