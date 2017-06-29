import React, {
    // Component,
    // PropTypes
} from "react";
import {
    Page
} from "./../Page";
import {
} from "recompose";
import {
    Card,
    CardHeader,
    CardActions
} from "material-ui/Card";
import {
    Link
} from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';

export function HackernewsPage () {

    return (
        <Page
            title="Not Found"
            hasBackButton={true}
        >
            <section
                style={{
                    maxWidth: "80%",
                    margin: "auto",
                    paddingTop: "3em",
                    height: "100%"
                }}
            >
                yolo
            </section>
        </Page>

    )

}

