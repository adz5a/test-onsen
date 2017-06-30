import React, {
    // Component,
    // PropTypes
} from "react";
import {
    connect
} from "react-redux";
import map from "lodash/fp/map";
import {
    baseURL,
    bucketName
} from "data/aws";


export function Mosaic () {



}

const objectsToURI = map( awsObject => `${baseURL}/${bucketName}/${awsObject.Key}` );

const toURLs = awsState => {

    const contents = awsState.data.contents;

    return objectsToURI(contents);

}


export function mapStateToProps ( state ) {

    return {
        content: state.aws.data.contents
    };

}
