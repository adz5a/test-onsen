import React, {
    // Component,
    // PropTypes
} from "react";
import {
    List as MaterialList,
    ListItem
} from "material-ui/List";
import {
    TOGGLE_TODO,
    STATUS_OFF,
    STATUS_ON
} from "data/todolist";
import { map } from "lodash";
import { connect } from "react-redux";
import propTypes from "prop-types";
import moment from "moment";
import {
    noop,
    // identity,
    filter
} from "lodash";


const dateStyle = {
    float: "right",
    fontSize: "0.8em"
}

const todoStyle = {}
function renderTodo ( onToggle ) {

    return ( todo, index ) => {

        const {
            todo: content,
            date
        } = todo;


        return (
            <ListItem
                key={index}
                onClick={
                    () => onToggle(todo)
                }
                style={{
                    ...todoStyle,
                    backgroundColor: todo.status === STATUS_OFF ?
                    "lightgrey" :
                    ""
                }}
            >
                <span>{ content }</span>
                <span
                    style={dateStyle}
                >
                    { moment(date).fromNow() }
                </span>
            </ListItem>
        );

    }
}

const listStyle = {


};
export function List ( props ) {

    const {
        todolist,
        onToggle = noop,
        status = ""
    } = props;

    let _todos = todolist.todos;

    if ( status === STATUS_OFF || status === STATUS_ON ) {

        _todos = filter(
            todolist.todos,
            todo => status === todo.status
        );

    }
    return (
        <section
            style={listStyle}
        >
            <MaterialList>
                {
                    map(
                        _todos,
                        renderTodo(onToggle)
                    )
                }
            </MaterialList>
        </section>
    );

}

List.propTypes = {

    todolist: propTypes.object,
    onToggle: propTypes.func,
    filter: propTypes.string

};


export function TodoItem ( { todo } ) {

    return (
        <ListItem>
            <div
                className="left"
            ></div>
            <div
                className="center"
            >
                { todo.todo }
            </div>
            <div
                className="right"
            ></div>
        </ListItem>
    );

}


export function mapStateToProps ( state ) {

    const ids = Object.keys(state.todolist.byId);
    const todolist = state.todolist;
    return {
        todolist: {
            todos: map(ids, id => todolist.byId[id]),
            processing: state.todolist.processing
        }
    };

}

export function mapDispatchToProps ( dispatch ) {

    return {
        onToggle ( todo ) {

            return dispatch({
                type: TOGGLE_TODO,
                data: todo
            });

        }
    }

}

export const ConnectedList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
