import React, { Component, PropTypes } from "react";
import {
    Page
} from "./Page";
import {
    Link
} from "react-router-dom";

export function HomePage () {

    return (
        <Page
            title="Home"
        >
            <section
                style={{
                    maxWidth: "80%",
                    margin: "auto",
                    paddingTop: "3em"
                }}
            >
                <div>
                    <Link to={"/login"}>
                        {"hello world"}
                    </Link>
                </div>
            </section>
        </Page>

    )

}
