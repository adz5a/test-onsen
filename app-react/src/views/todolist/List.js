import React, { 
    // Component,
    // PropTypes
} from "react";
import {
    List as OnsenList,
    ListItem
} from "react-onsenui";
import { connect } from "react-redux";

export function List ( { todos = [] }) {

    return (
        <OnsenList
            dataSource={todos} 
            renderRow={
                ( todo, key ) => <TodoItem
                    todo={todo}
                    key={key}
                />
            }
        />
    );

}

export function TodoItem ( { todo } ) {

    return (
        <ListItem>
            <div 
                className="left"
            ></div>
            <div
                className="center"
            >
                { todo }
            </div>
            <div
                className="right"
            ></div>
        </ListItem>
    );

}

export function mapStateToProps ( state ) {

    return {
        todos: state.todolist
    };

}

export const ConnectedList = connect(mapStateToProps)(List);
