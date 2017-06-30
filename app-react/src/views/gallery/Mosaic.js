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
import "./mosaic.css";

const contentStyle = {
    width: "50%",
    height: "27em",
    textAlign: "center"
};
const renderContent = map( url => {

    return (
        <section
            key={url}
            style={contentStyle}
        >
            <img
                src={url}
                className="gallery-img"
            />
        </section>
    );

});

const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
};
export function Mosaic ( { content = [] } ) {

    console.log(content);
    return (
        <section
            style={containerStyle}
        >{
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
