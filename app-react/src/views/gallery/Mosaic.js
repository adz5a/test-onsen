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

const renderContent = map( url => {
    return <img src={url} key={url} />
});

export function Mosaic ( { content = [] } ) {

    console.log(content);
    return (
        <section>{
            renderContent(content.slice(0, 10))
        }</section>
    );

}

const objectsToURI = map( awsObject => `${baseURL}/${bucketName}/${awsObject.Key}` );

const toURLs = awsState => {

    const contents = awsState.data.contents;

    return objectsToURI(contents);

}


export function mapStateToProps ( state ) {

    const awsState = state.aws;

    return {
        content: toURLs(awsState)
    };

}

export const WithConnect = connect(mapStateToProps);

export const EnhancedMosaic = WithConnect(Mosaic);
