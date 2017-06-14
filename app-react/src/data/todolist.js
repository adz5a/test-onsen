import { partial } from "lodash";
import { joinUppercase } from "./../commons";

export const TODOACTION = partial(joinUppercase, "todo-list");

export const ADD_TODO = TODOACTION("add-todo");

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
