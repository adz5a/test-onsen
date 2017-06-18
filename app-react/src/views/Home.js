import React, {} from "react";
import {
    Page
} from "./Page";
import {
    Link
} from "react-router-dom";
import {Card, CardActions, CardHeader,} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const cardStyle = {
    margin: "1em"
};


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
                    justifyContent: "space-between",
                    flexWrap: "wrap"
                }}
            >


            <Card
                style={cardStyle}
            >
                <CardHeader
                    title="Login"
                />
                <CardActions>
                    <Link to="/login"><FlatButton label="Go" /></Link>
                </CardActions>
            </Card>

            <Card
                style={cardStyle}
            >
                <CardHeader
                    title="Todos"
                />
                <CardActions>
                    <Link to="/todolist"><FlatButton label="Go" /></Link>
                </CardActions>
            </Card>

            <Card
                style={cardStyle}
            >
                <CardHeader
                    title="Gallery"
                />
                <CardActions>
                    <Link to="/gallery"><FlatButton label="Go" /></Link>
                </CardActions>
            </Card>


        </section>
    </Page>

    )

}
