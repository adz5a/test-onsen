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
import {
    isLogged
} from "data/user";
import {
    Unauthorized
} from "./Unauthorized";
import {
    branch,
    compose,
    renderComponent
} from "recompose";
import {
    connect
} from "react-redux";


function TodoList () {

    return (
        <section>
            <Form />
            <List />
        </section>
    );

}

const WithUser = connect(
    state => ({ user: state.user })
);

const WhenLogged = branch(
    ( { user } ) => isLogged(user),
    renderComponent(TodoList),
);

const Content = compose(
    WithUser,
    WhenLogged
)(Unauthorized);

export function TodoListPage () {

    return (
        <Page
            title="Todo List"
            hasBackButton={true}
        >
            <section>
                <Content />
            </section>
        </Page>
    );

}
