import React, {
    Component,
    // PropTypes
} from "react";
import CircularProgress from "material-ui/CircularProgress";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
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
        this.onAdd = (e) => {

            e.preventDefault();
            if ( typeof this.props.onAdd === "function" ) {

                this.props.onAdd({
                    todo: e.target.elements.todo.value,
                    date: (new Date()).toISOString()
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
                <form
                    onSubmit={this.onAdd}
                >
                    <TextField
                        type="text"
                        placeholder="a lot of stuff to do"
                        name="todo"
                        id="TODOLIST-ADDFORM"
                    />
                    <RaisedButton
                        type="submit"
                    >
                        Add
                    </RaisedButton>
                </form>
                <span
                    style={{
                        display: "inline-block",
                        visibility: this.props.processing ? "visible" : "hidden"
                    }}
                >
                    <CircularProgress
                        size={60}
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
