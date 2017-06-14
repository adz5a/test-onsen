import React, { 
    // Component,
    // PropTypes
} from "react";
import {
    List as OnsenList,
    ListItem
} from "react-onsenui";

export function List ( { todos = [] }) {

    return (
        <OnsenList
            dataSource={todos} 
            renderRow={
                todo => <TodoItem
                    todo={todo}
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
