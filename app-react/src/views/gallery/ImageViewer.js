import React, {
    // Component,
    // PropTypes
} from "react";
import {
    connect
} from "react-redux";
import {
    compose,
    lifecycle,
    branch,
    withProps,
    renderComponent
} from "recompose";
import {
    baseURL,
    bucketName,
    deSanitizeURL
} from "data/aws";
import {
    Redirect
} from "react-router-dom";
import some from "lodash/fp/some";

const hasImage = ( url, state ) => some( object => {

    return (baseURL + "/" + bucketName + "/" + object.Key) === url;

}, state);

export function ImageViewer ( {
    match = {
        params: {}
    },
    state,
    originalURL = ""
} ) {

    return (
        <section>
            <img
                src={originalURL}
            />
        </section>
    );

}

export function mapStateToProps ( state ) {

    return {
        state: state.aws
    };

}

export const WithConnect = connect(mapStateToProps);


export const WithOriginalURL = withProps(
    props => ({
        originalURL: deSanitizeURL(props.match.params.id)
    })
);
// export const WithImageLoaded = branch(
//     props => !hasImage(props.originalURL, props.state.data.contents),
//     renderComponent(() => <Redirect to="/404"/>)
// );

export const enhancer = compose(
    WithConnect,
    WithOriginalURL,
    // WithImageLoaded
);


export const EnhancedImageViewer = enhancer(ImageViewer);
