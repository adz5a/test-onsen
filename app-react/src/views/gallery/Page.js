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
                <Mosaic />
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
