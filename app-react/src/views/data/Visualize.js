import React, {
    // Component,
    // PropTypes
} from "react";
import {
    List,
    ListItem
} from "material-ui/List";
import Paper from "material-ui/Paper";
import RaisedButton from 'material-ui/RaisedButton';
import {
    compose,
    withProps,
    lifecycle
} from "recompose";

const paperStyle = {
    maxWidth: "900px",
    margin: "3em auto 0 auto",
    paddingBottom: "10em"
};



const parseQuery = string => {

console.log(string);
    const queryStart = string.indexOf("?");

    if ( queryStart > -1 ) {

        return string.slice(queryStart + 1).split("&")
            .reduce(( query, token ) => {

                const eq = token.indexOf("=");
                if ( eq === -1 ) {

                    query[token] = true;

                } else {

                    query[token.slice(0, eq)] = token.slice(eq + 1);

                }

                return query;

            }, {});

    } else {

        return {};

    }


};


export function Visualize ( { 
    location,
    query = {}
} ) {

    console.log(query);
    return (
        <section>
            <Paper style={paperStyle}>

            </Paper>
            <section style={{
                textAlign: "center"
            }}>
                <RaisedButton primary={true}>LOAD MORE</RaisedButton>
            </section>
        </section>
    );

}

const enhancer = compose(
    withProps(
        props => ({
            query: parseQuery(props.location.search || "")
        })
    ),
    lifecycle({
        componentWillMount () {}
    })
);

export const EnhancedVisualize = enhancer(Visualize);
