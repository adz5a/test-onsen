import React, {
    // Component,
    // PropTypes
} from "react";
import {
    Page
} from "./../Page";
import {
} from "recompose";
export function NotFoundPage () {

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
                <p>
                    {"Not FOUND"}
                </p>
            </section>
        </Page>

    )

}
