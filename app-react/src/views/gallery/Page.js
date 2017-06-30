import React, {
    // Component,
    // PropTypes
} from "react";
import {
    Page
} from "./../Page";
import {
    compose,
    lifecycle
} from "recompose";
import {
    LOAD
} from "data/aws";
import {
    connect
} from "react-redux";
import {
    // Mosaic,
    EnhancedMosaic as Mosaic
} from "./Mosaic";
import {
    Route,
    Switch
} from "react-router-dom";
import {
    ImageViewer
} from "./ImageViewer";

export function GalleryPage () {

    return (
        <Page
            title="Gallery"
            hasBackButton={true}
        >
            <section
                style={{
                    paddingTop: "3em",
                    height: "100%"
                }}
            >
                <Switch>
                    <Route
                        exact
                        path="/gallery"
                        component={Mosaic}
                    />
                    <Route
                        path="/gallery/:id"
                        component={ImageViewer}
                    />
                </Switch>
            </section>
        </Page>

    )

}

export const loadOnMount = lifecycle({
    componentWillMount () {

        this.props.loadData();

    }
});

export const WithConnect = connect(
    null,
    dispatch => ({
        loadData: () => dispatch({
            type: LOAD
        })
    })
);

export const enhancer = compose(
    WithConnect,
    loadOnMount
);

export const EnhancedPage = enhancer(GalleryPage);
