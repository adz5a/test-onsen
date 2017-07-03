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
import keys from "lodash/keys";
import {
    Link,
    withRouter
} from "react-router-dom";


const paperStyle = {

    maxWidth: "900px",
    margin: "3em auto 0 auto",
    paddingBottom: "10em"

};

const sectionStyle = {
    padding: "0.5em"
};


const noop = () => {};
const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "3em",
    alignItems: "center"
};

const buttonStyle = {
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    overflow: "hidden"
};
export function bucketList ( root, dirs ) {

    return keys(dirs)
        .map( dir => {

            return (
                <ListItem
                    key={dir}
                    initiallyOpen={false}
                    nestedItems={bucketList(dirs[dir])}
                >
                    <div style={divStyle}>
                        <Link to={ root + "/visualize?prefix=" + encodeURIComponent(dir)}>
                            <RaisedButton style={buttonStyle}>{dir}</RaisedButton>
                        </Link>
                    </div>
                </ListItem>
            );
        });
}



export function Bucket ( {
    onRefresh = noop,
    dirs = {},
    match
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
            <List>{bucketList(match.url, dirs)}</List>
        </Paper>
    );

}

const enhancer = compose(
    connect(
        state => ({
            dirs: state.manager.content.dirs
        }),
        dispatch => ({
            onRefresh () {

                return dispatch({
                    type: LIST_DIRS
                });

            }
        })
    ),
    withRouter
);

export const EnhancedBucket = enhancer(Bucket);
