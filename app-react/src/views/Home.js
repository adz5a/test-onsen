import React, {} from "react";
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
                <ul>
                    <li>
                        <Link to={"/login"}>
                            {"Login"}
                        </Link>
                    </li>
                    <li>
                        <Link to={"/todolist"}>
                            {"You Todo List"}
                        </Link>
                    </li>
                </ul>
            </section>
        </Page>

    )

}
