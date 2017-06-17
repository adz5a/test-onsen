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
    STATUS_OFF
} from "data/todolist";
import { map } from "lodash";
import { connect } from "react-redux";
import propTypes from "prop-types";
import moment from "moment";
import { noop } from "lodash";


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

    paddingLeft: "5em",
    paddingRight: "5em",

};
export function List ( props ) {

    const {
        todolist,
        onToggle = noop
    } = props;

console.log(props);
    return (
        <section
            style={listStyle}
        >
            <MaterialList>
                {
                    map(
                        todolist.todos,
                        renderTodo(onToggle)
                    )
                }
            </MaterialList>
        </section>
    );

}

List.propTypes = {

    todolist: propTypes.object,
    onToggle: propTypes.func

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
