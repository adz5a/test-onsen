import React, { 
    // Component,
    // PropTypes
} from "react";
import {
    Page
} from "./../Page";
import {
    Form
} from "./Form";
import {
    List
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
                    todos={[
                        "a cat",
                        "a dog"
                    ]}
                />
            </section>
        </Page>
    );

}
