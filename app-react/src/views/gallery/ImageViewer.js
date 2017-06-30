import React, {
    // Component,
    // PropTypes
} from "react";
import {
    connect
} from "react-redux";
import {
    compose,
    lifecycle
} from "recompose";
import {
    deSanitizeURL
} from "data/aws";

export function ImageViewer ( {
    match = {
        params: {}
    }
} ) {

    console.log(match);
    const id = match.params.id || "";
    const originalURL = decodeURI(atob(id));
    console.log(originalURL);
    return (
        <section>
            {"yolo"}
        </section>
    );

}

export function mapStateToProps ( state ) {

    return {
        state: state.aws
    };

}

export const WithConnect = connect(mapStateToProps);

export const enhancer = compose(
    WithConnect
);

export const EnhancedImageViewer = enhancer(ImageViewer);
