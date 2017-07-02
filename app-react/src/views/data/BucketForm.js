import React, {
    // Component,
    // PropTypes
} from "react";
import {Card, CardActions, CardHeader,} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {
    connect
} from "react-redux";
import {
    SET_BUCKET
} from "data/manager";
import {
    compose
} from "recompose";

function mapDispatchToProps ( dispatch ) {

    return {
        onSubmit ( data ) {

            return dispatch({

                type: SET_BUCKET,
                data

            });

        }
    };

}

function selector ( state ) {

    return {
        ...state.manager
    };

}

const enhancer = compose(
    connect(selector, mapDispatchToProps)
);

const cardStyle = {
    maxWidth: "30em",
    margin: "auto"
};
const pStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
};

const title = "Bucket Information";


const noop = () => {};

export function BucketForm ( { 
    onSubmit = noop,
    baseURL = null,
    bucket = null
} ) {

    console.log(baseURL, bucket);
    return (
        <Card
            style={cardStyle}
        >
            <CardHeader
                title={title}
            />
            <CardActions>
                <form
                    onSubmit={ e => {

                        e.preventDefault();
                        const form = e.target.elements;
                        const data = {
                            baseURL: form.baseURL.value,
                            bucket: form.bucket.value
                        };

                        return onSubmit(data);
                    }}
                >
                    <div style={pStyle}>
                        <span>Base URL</span>
                        <TextField name="baseURL" defaultValue={baseURL}/>
                    </div>
                    <div style={pStyle}>
                        <span>Bucket Name</span>
                        <TextField name="bucket" defaultValue={bucket}/>
                    </div>
                    <FlatButton type="submit">Ok</FlatButton>
                </form>
                <p>{baseURL}</p>
                <p>{bucket}</p>
            </CardActions>
        </Card>
    );

}

export const EnhancedBucketForm = enhancer(BucketForm);
