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
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from 'material-ui/Toolbar';
import FlatButton from "material-ui/FlatButton";
import {
    withState,
    compose,
    withHandlers
} from "recompose";

const contentStyle = {
    "2": {
            width: "50%",
            height: "27em",
            textAlign: "center"
    },
    "3": {
            width: "33%",
            height: "27em",
            textAlign: "center"
    },
    "4": {
            width: "25%",
        maxHeight: "27em",
            textAlign: "center"
    },
};
const renderContent = ( urls, layout ) => map( url => {

    return (
        <section
            className="gallery-img-item"
            key={url}
            style={layout}
        >
                <img
                    src={url}
                    className="gallery-img"
                />
        </section>
    );

}, urls);

const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
};
const noop = () => {};
export function Mosaic ( { 
    content = [],
    toggleLayout = noop,
    toggle2 = noop,
    toggle3 = noop,
    toggle4 = noop,
    layout
} ) {

    return (
        <section>
            <Toolbar>
                <ToolbarGroup>
                    <FlatButton
                        onClick={toggle2}
                    >2</FlatButton>
                    <FlatButton
                        onClick={toggle3}
                    >3</FlatButton>
                    <FlatButton
                        onClick={toggle4}
                    >4</FlatButton>
                </ToolbarGroup>
            </Toolbar>
            <section
                style={containerStyle}
            >
                {
                    renderContent(content.slice(0, 10), contentStyle[layout])
                }
            </section>

        </section>
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
export const WithToggle = withState(
    "layout",
    "toggleLayout",
    4
);
export const WithTogglers = withHandlers( props => ({
    toggle2 () {
        return props.toggleLayout(2);
    },
    toggle3 () {
        return props.toggleLayout(3);
    },
    toggle4 () {
        return props.toggleLayout(4);
    }
}) );

export const enhancer = compose(
    WithConnect,
    WithToggle,
    WithTogglers
);

export const EnhancedMosaic = enhancer(Mosaic);
