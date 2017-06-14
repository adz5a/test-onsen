import React, { Component } from 'react';
import {
    Page,
    Button,
    Toolbar as OnsenToolbar,
    BackButton,
    Icon
} from "react-onsenui";
import {
    Form
} from "./views/Login";

export function Toolbar () {

    return (
        <OnsenToolbar>
            <div className="left">
                <BackButton>Back</BackButton>
            </div>
            <div className="center">Title</div>
            <div className="right">
                <Icon icon="md-menu"/>
            </div>
        </OnsenToolbar>
    );

}


class App extends Component {
    render() {
        return (
            <Page
                renderToolbar={Toolbar}
            >
                <Form />
            </Page>
        );
    }
}

export default App;
