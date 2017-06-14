import React, { Component } from 'react';
import {
    Page,
    Button,
    Toolbar as OnsenToolbar,
    BackButton,
    Icon
} from "react-onsenui";


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
                <Button>Click me</Button>
            </Page>
        );
    }
}

export default App;
