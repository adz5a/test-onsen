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


export function List ( { todolist = { todos: [] } }) {

    return (
        <MaterialList>
            {
                map(
                    todolist.todos,
                    renderTodo
                )
            }
        </MaterialList>
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

    return {
        todolist: state.todolist
    };

}

export const ConnectedList = connect(mapStateToProps)(List);
