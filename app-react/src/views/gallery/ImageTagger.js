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
    // branch,
    // withProps,
    // renderComponent
} from "recompose";
import {
    SAVE
} from "data/db";
import {
    Card,
    // CardActions,
    CardHeader,
} from 'material-ui/Card';
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
const noop = () => {};


export function ImageTagger ( {
    originalURL = "",
    onAdd = noop
} ) {

    return (
        <Card
            className="image-viewer-aside"
        >
            <CardHeader
                title={"Tags"}
            />
            <form
                style={{
                    display: "flex",
                    marginLeft: "0.3em",
                    marginRight: "0.3em"
                }}
                onSubmit={e => {

                    e.preventDefault();
                    const tagName = e.target.elements.tag.value;
                    // console.log(tagName);


                }}
            >
                <TextField
                    placeholder="MyNewtag"
                    name="tag"
                />
                <FlatButton
                    type="submit"
                >Add</FlatButton>
            </form>
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
            tags: [ "yolo" ]
        });

    }
});


const enhancer = compose(
    WithConnect,
    onMount
);

export const EnhancedImageTagger = enhancer(ImageTagger);
