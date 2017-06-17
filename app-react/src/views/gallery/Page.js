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
    Dragger
} from "./Dragger";

export function GalleryPage () {

    return (
        <Page
            title="Gallery"
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
                <Dragger />
            </section>
        </Page>

    )

}
