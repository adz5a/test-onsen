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
                <Form />
            </section>
        </Page>

    )

}
