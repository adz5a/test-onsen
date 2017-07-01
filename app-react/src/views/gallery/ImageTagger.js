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
    SAVE
} from "data/db";
import {Card, CardActions, CardHeader,} from 'material-ui/Card';



export function ImageTagger ( { 
    originalURL = ""
} ) {

    return (
        <Card
            className="image-viewer-aside"
        >
            <CardHeader
                title={"Tags"}
            />
        </Card>
    );

}


export const WithConnect = connect(
    null,
    dispatch => ({
        save ( data ) {

            return dispatch({
                type: SAVE,
                data
            });

        }
    })
);



export const onMount = lifecycle({
    componentWillMount () {

        this.props.save({
            _id: this.props.originalURL,
            tags: []
        });

    }
});


const enhancer = compose(
    WithConnect,
    onMount
);

export const EnhancedImageTagger = enhancer(ImageTagger);
