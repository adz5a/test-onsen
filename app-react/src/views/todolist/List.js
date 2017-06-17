import React, {
    // Component,
    // PropTypes
} from "react";
import {
    List as MaterialList,
    ListItem
} from "material-ui/List";
import { map } from "lodash";
import { connect } from "react-redux";
import propTypes from "prop-types";


function renderTodo ( todo, index ) {

    return (
        <ListItem
            key={index}
        >
            { todo.todo }
        </ListItem>
    );

}

const listStyle = {

    paddingLeft: "5em",
    paddingRight: "5em",

};
export function List ( { todolist = { todos: [] } }) {

    return (
        <section
            style={listStyle}
        >
            <MaterialList>
                {
                    map(
                        todolist.todos,
                        renderTodo
                    )
                }
            </MaterialList>
        </section>
    );

}

List.propTypes = {

    todolist: propTypes.object

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

export const ConnectedList = connect(mapStateToProps)(List);
