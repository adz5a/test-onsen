import {
    conforms,
    isString,
} from "lodash";
import {
    ACTIONFACTORY
} from "./commons";
import {
    PROCESSING
} from "./commons";

export const TODOACTION = ACTIONFACTORY("todo-list");
export const TODOSTATUS = ACTIONFACTORY("todo-status");

export const STATUS_ON = TODOSTATUS("on");
export const STATUS_OFF = TODOSTATUS("off");
export const STATUS_DELETED = TODOSTATUS("deleted");

export const ADD_TODO = TODOACTION("add-todo");
export const ADD_TODO_ERROR = TODOACTION("add-todo-error");
export const TOGGLE_TODO = TODOACTION("toggle-todo");
export const UPDATED_DISTANT_STATE = TODOACTION("updated-distant-state");
export const UPDATED_DISTANT_STATE_ERROR = TODOACTION("updated-distant-state-error");

const defaultState = {
    processing: false,
    byId: {}
};

export const isTodo = conforms({
    todo: isString,
    id: isString,
    date: isString,
    status: status => (
        isString(status) &&
        [ STATUS_ON, STATUS_OFF, STATUS_DELETED ].includes(status)
    )
});

export function byId ( state = {}, todo ) {
    return {
        ...state,
        [ todo.id ]: todo
    };
}

export function toggleTodo ( state = {}, todo ) {

    const prevTodo = state[todo.id];
    if ( !prevTodo ) {

        return state;

    } else {

        return {
            ...state,
            [ todo.id ]: {
                ...prevTodo,
                status: prevTodo.status === STATUS_ON ?
                STATUS_OFF:
                STATUS_ON
            }
        };

    }

}


export function reducer ( state = defaultState, action ) {

    switch ( action.type ) {

        case ADD_TODO:
            return {
                ...state,
                byId: byId(state.byId, action.data),
                processing: false
            };


        case TOGGLE_TODO:
            return {
                ...state,
                byId: toggleTodo(state.byId, action.data),
                processing: false
            }


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
