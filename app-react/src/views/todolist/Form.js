import React, { 
    Component,
    // PropTypes
} from "react";
import {
    Input,
    Button
} from "react-onsenui";
import { connect } from "react-redux";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import {
    ADD_TODO
} from "data/todolist";

export class Form extends Component {

    static propTypes = {
        onAdd: PropTypes.func
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
                    padding: "1em 0 1em 0"
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
            </section>
        );

    }

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
