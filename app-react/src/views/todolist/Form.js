import React, {
    Component,
    // PropTypes
} from "react";
import {
    Input,
    Button,
    ProgressCircular
} from "react-onsenui";
import { connect } from "react-redux";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import {
    ADD_TODO
} from "data/todolist";

export class Form extends Component {

    static propTypes = {
        onAdd: PropTypes.func,
        processing: PropTypes.bool
    };

    componentWillMount () {

        this.inputs = {};
        this.onAdd = () => {

            if ( typeof this.props.onAdd === "function" ) {

                this.props.onAdd({
                    todo: this.inputs.todo.value,
                    date: Date.now()
                });

            }


        };

    }


    render () {

        return (
            <section
                style={{
                    textAlign: "center",
                    padding: "1em 0 1em 0",
                    display: "flex",
                    justifyContent: "space-around",
                    maxWidth: "65%",
                    margin: "auto"
                }}
            >
                <Input
                    type="text"
                    placeholder="a lot of stuff to do"
                    ref={ ref => this.inputs.todo = findDOMNode(ref)}
                />
                <Button
                    onClick={this.onAdd}
                    type="submit"
                >
                    Add
                </Button>
                <span
                    style={{
                        display: "inline-block",
                        visibility: this.props.processing ? "visible" : "hidden"
                    }}
                >
                    <ProgressCircular
                        indeterminate
                    />
                </span>
            </section>
        );

    }

}

export function mapStateToProps ( state ) {

    return {
        processing: state.todolist.processing
    };

}


export function mapDispatchToProps ( dispatch ) {

    return {
        onAdd ( todo ) {

            return dispatch({
                type: ADD_TODO,
                data: todo
            });

        }
    }

}


export const ConnectedForm = connect(
    null,
    mapDispatchToProps
)(Form);
