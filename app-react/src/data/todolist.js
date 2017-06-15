import { 
    conforms,
    isString,
    isFinite,
} from "lodash";
import {
    ACTIONFACTORY
} from "./commons";

export const TODOACTION = ACTIONFACTORY("todo-list");

export const ADD_TODO = TODOACTION("add-todo");
export const ADD_TODO_ERROR = TODOACTION("add-todo-error");


export const isTodo = conforms({
    todo: isString,
    id: isString,
    date: isFinite
});


export function reducer ( state = [], action ) {

    switch ( action.type ) {

        case ADD_TODO:
            return [
                action.data,
                ...state
            ];

        default:
            return state;

    }

}
