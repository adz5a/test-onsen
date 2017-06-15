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

const defaultState = {
    todos: [],
    processing: false
};

export const isTodo = conforms({
    todo: isString,
    id: isString,
    date: isFinite,

});


export function reducer ( state = defaultState, action ) {

    switch ( action.type ) {

        case ADD_TODO:
            return {
                ...state,
                todos: [
                    action.data,
                    ...state.todos
                ],
                processing: false
            };

        default:
            return state;

    }

}
