import React, {} from "react";
import {
    Page
} from "./Page";
import {
    Link
} from "react-router-dom";
import {Card, CardActions, CardHeader,} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export function HomePage () {

    return (
        <Page
            title="Home"
        >
            <section
                style={{
                    maxWidth: "80%",
                    margin: "5em auto 0 auto",
                    display: "flex",
                    justifyContent: "space-around"
                }}
            >


                        <Card>
                            <CardHeader
                                title="Login"
                            />
                            <CardActions>
                                <Link to="/login"><FlatButton label="Go" /></Link>
                            </CardActions>
                        </Card>

                        <Card>
                            <CardHeader
                                title="Todos"
                            />
                            <CardActions>
                                <Link to="/todolist"><FlatButton label="Go" /></Link>
                            </CardActions>
                        </Card>



            </section>
        </Page>

    )

}
