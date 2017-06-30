import React, {
    Component,
    // PropTypes
} from "react";
import Paper from "material-ui/Paper";
import {
    forEach,
    // filter
} from "lodash";



export class Dragger extends Component {


    componentWillMount () {

        this.onDrag = (e) => {

            e.preventDefault();
            e.dataTransfer.dropEffect = "move";

        };

        this.onDrop = (e) => {

            e.preventDefault();
            const dt = e.dataTransfer;
            // const items = e.dataTransfer.items;
            
            forEach(
                dt.files, 
                file => {

                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.addEventListener("loadend", ( e, file ) => {

                        console.log(e);
                        console.log(file);

                    });
                   

                }
            );

            forEach(
                e.dataTransfer.files,
                item => {

                    console.log(item);
                    console.log(item.path);

                }
            );
            
        };

    }


    render () {

        return (
            <Paper
                style={{
                    minHeight: "20em",
                    position: "relative"
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    }}
                    onDrop={this.onDrop}
                    onDragOver={this.onDrag}
                ></div>
            </Paper>
        );

    }


}
