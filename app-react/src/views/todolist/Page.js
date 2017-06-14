import React, { 
    // Component,
    // PropTypes
} from "react";
import {
    Page
} from "./../Page";
import {
    ConnectedForm as Form
} from "./Form";
import {
    ConnectedList as List
}from "./List";

export function TodoListPage () {

    return (
        <Page
            title="Todo List"
            hasBackButton={true}
        >
            <section>
                <Form />
                <List 
                />
            </section>
        </Page>
    );

}
