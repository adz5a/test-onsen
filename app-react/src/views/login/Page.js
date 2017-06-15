import React, {
    // Component,
    // PropTypes
} from "react";
import {
    Page
} from "./../Page";
import {
    ConnectedForm as Form
} from "./Form";
import {
    ConnectedLoginUI as LoginUI
} from "views/login/LoginUI";
import {
    branch,
    compose,
    renderComponent
} from "recompose";
import {
    isLogged
} from "data/user";
import {
    connect
} from "react-redux";



const WithUser = connect(
    state => ({ user: state.user })
);

const WhenLogged = branch(
    ( { user } ) => isLogged(user),
    renderComponent(LoginUI),
);

const Login = compose(
    WithUser,
    WhenLogged,
)(Form);

export function LoginPage () {

    return (
        <Page
            title="Login"
            hasBackButton={true}
        >
            <section
                style={{
                    maxWidth: "80%",
                    margin: "auto",
                    paddingTop: "3em"
                }}
            >
                <Login />
            </section>
        </Page>

    )

}
