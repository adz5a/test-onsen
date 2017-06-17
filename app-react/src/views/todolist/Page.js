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
    STATUS_ON,
    STATUS_OFF
} from "data/todolist";
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
import {
    Tabs,
    Tab
} from "material-ui/Tabs";

const todoListStyle = {
    paddingLeft: "5em",
    paddingRight: "5em"
};
function TodoList () {

    return (
        <section>
            <Form />
            <section
                style={todoListStyle}
            >
                <Tabs>
                    <Tab
                        label="All"
                    >
                        <List
                        />
                    </Tab>
                    <Tab
                        label="Actives"
                    >
                        <List
                            status={STATUS_ON}
                        />
                    </Tab>
                    <Tab
                        label="Inactives"
                    >
                        <List
                            status={STATUS_OFF}
                        />
                    </Tab>
                </Tabs>
            </section>
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
