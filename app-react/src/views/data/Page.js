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
                <BucketForm />
            </section>
        </Page>

    )

}
