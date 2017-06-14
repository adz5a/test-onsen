import React, { Component } from 'react';
import {
    Form
} from "./views/Login";
import {
    Page
} from "./views/Page";



class App extends Component {
    render() {
        return (
            <Page
                title="Login"
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
        );
    }
}

export default App;
