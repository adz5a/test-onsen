import { 
    conforms,
    isString,
    isFinite,
} from "lodash";
import {
    ACTIONFACTORY
} from "./commons";
import {
    PROCESSING
} from "./commons";

export const TODOACTION = ACTIONFACTORY("todo-list");

export const ADD_TODO = TODOACTION("add-todo");
export const ADD_TODO_ERROR = TODOACTION("add-todo-error");

const defaultState = {
    processing: false,
    byId: {}
};

export const isTodo = conforms({
    todo: isString,
    id: isString,
    date: isFinite,

});

export function byId ( state = {}, todo ) {
    return {
        ...state,
        [ todo.id ]: todo
    };
}


export function reducer ( state = defaultState, action ) {

    switch ( action.type ) {

        case ADD_TODO:
            return {
                ...state,
                byId: byId(state.byId, action.data),
                processing: false
            };

        case PROCESSING:
            switch ( action.data.type ) {

                case ADD_TODO:
                    return {
                        ...state,
                        processing: true
                    };
                default:
                    return state;

            }

        default:
            return state;

    }

}
