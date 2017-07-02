import React, {
    // Component,
    // PropTypes
} from "react";
import {Card, CardActions, CardHeader,} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from "material-ui/Paper";
import {
    List,
    ListItem
} from "material-ui/List";
import {
    connect
} from "react-redux";
import {
    compose
} from "recompose";
import {
    LIST_DIRS
} from "data/manager";


const paperStyle = {

    maxWidth: "900px",
    margin: "3em auto 0 auto",
    paddingBottom: "10em"

};

const sectionStyle = {
    padding: "0.5em"
};


const noop = () => {};


export function Bucket ( {
    onRefresh = noop
} ) {

    return (
        <Paper
            style={paperStyle}
        >
            <section
                style={sectionStyle}
            >
                <RaisedButton 
                    primary={true}
                    onClick={onRefresh}
                >
                    Refresh
                </RaisedButton>
            </section>
            <List></List>
        </Paper>
    );

}

const enhancer = compose(
    connect(null, dispatch => ({
        onRefresh () {

            return dispatch({
                type: LIST_DIRS
            });

        }
    }))
);

export const EnhancedBucket = enhancer(Bucket);
