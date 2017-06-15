import React, {
    // Component,
    // PropTypes
} from "react";
import {
    List as OnsenList,
    ListItem
} from "react-onsenui";
import { connect } from "react-redux";
import propTypes from "prop-types";

export function List ( { todolist = { todos: [] } }) {

    return (
        <OnsenList
            dataSource={todolist.todos}
            renderRow={
                ( todo, key ) => <TodoItem
                    todo={todo}
                    key={key}
                />
            }
        />
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
