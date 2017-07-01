import React, {
    // Component,
    // PropTypes
} from "react";
import {
    connect
} from "react-redux";
import {
    compose,
    // lifecycle,
    // branch,
    withProps,
    // renderComponent
} from "recompose";
import {
    // baseURL,
    // bucketName,
    deSanitizeURL
} from "data/aws";
import {
    // Redirect
} from "react-router-dom";
import {
    Card,
    // CardActions,
    CardHeader
} from 'material-ui/Card';
// import some from "lodash/fp/some";
import {
    // ImageTagger,
    EnhancedImageTagger as ImageTagger
} from "./ImageTagger";
import "./imageviewer.css";


export function ImageViewer ( {
    match = {
        params: {}
    },
    state,
    originalURL = ""
} ) {

    return (
        <section
            className="image-viewer-container"
        >
            <Card
                className="image-viewer-card"
            >
                <CardHeader
                    title={originalURL}
                />
                <div className="imageviewer-img-wrapper">
                    <img
                        className="imageviewer-img"
                        src={originalURL}
                        alt={"yolo"}
                    />
                </div>
            </Card>
            <ImageTagger 
                originalURL={originalURL}
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
