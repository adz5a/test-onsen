import React, {
    // Component,
    // PropTypes
} from "react";
import {
    Page
} from "./../Page";
import {
    compose,
    lifecycle
} from "recompose";
import {
    LOAD
} from "data/aws";
import {
    connect
} from "react-redux";
import {
    Route,
    Switch
} from "react-router-dom";
import {Card, CardActions, CardHeader,} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const cardStyle = {
    maxWidth: "30em",
    margin: "auto"
};
const pStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
};

const title = "Bucket Information";

export function DataPage () {

    return (
        <Page
            title="Data"
            hasBackButton={true}
        >
            <section
                style={{
                    paddingTop: "3em",
                    height: "100%"
                }}
            >
                <Card
                    style={cardStyle}
                >
                    <CardHeader
                        title={title}
                    />
                    <CardActions>
                        <form>
                            <div style={pStyle}>
                                <span>Base URL</span><TextField name="baseURL" />
                            </div>
                            <div style={pStyle}>
                                <span>Bucket Name</span><TextField name="bucket" />
                            </div>
                            <FlatButton>Ok</FlatButton>
                        </form>
                    </CardActions>
                </Card>
            </section>
        </Page>

    )

}
