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
    Route,
    Switch
} from "react-router-dom";
import {
    // BucketForm,
    EnhancedBucketForm as BucketForm
} from "./BucketForm";
import {
    // bucket,
    EnhancedBucket as Bucket
} from "./Bucket";
import {
    // Visualize,
    EnhancedVisualize as Visualize
} from "./Visualize";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
export function DataPage ( { match } ) {

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
                <BucketForm />
                <Route 
                    path={match.url}
                    exact
                    component={Bucket}
                />
                <Route 
                    path={match.url + "/visualize"}
                    component={Visualize}
                />
            </section>
        </Page>

    );

}
