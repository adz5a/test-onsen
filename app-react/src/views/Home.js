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
    width: "45%",
    marginTop: "1em",
    marginBottom: "1em",
};


function AppCard ( { title = "", route = "/" , label = "Go" } ) {

    return (
        <Card
            style={cardStyle}
        >
            <CardHeader
                title={title}
            />
            <CardActions>
                <Link to={route}><FlatButton label={label}/></Link>
            </CardActions>
        </Card>
    );

}



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


            <AppCard
                route="/login"
                title="Login"
            />
            <AppCard
                route="/todolist"
                title="Todo"
            />
            <AppCard
                route="/hackernews"
                title="Hackernews"
            />
            <AppCard
                route="/gallery"
                title="Gallery"
            />
            <AppCard
                route="/data"
                title="Data"
            />
        </section>
    </Page>

    )

}
