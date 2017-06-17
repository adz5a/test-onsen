import React, { Component,  } from "react";
// import {
//     Input,
//     Button,
//     ProgressCircular
// } from "react-onsenui";
import CircularProgress from "material-ui/CircularProgress";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import {
    LOG_USER,
    SIGN_USER
} from "data/user";
import PropTypes from "prop-types";


export class Form extends Component {

    static propTypes = {
        onSignIn: PropTypes.func,
        onLogin: PropTypes.func,
        processing: PropTypes.bool
    };

    componentWillMount () {

        this.onButtonClicked = () => {

            const creds = {
                email: this.form.elements.email.value,
                password: this.form.elements.password.value,
            };
            return creds;

        }


        this.onSignIn = () => {

            if ( typeof this.props.onSignIn === "function" ) {

                this.props.onSignIn(this.onButtonClicked());

            }

        }

        this.onLogin = () => {

            if ( typeof this.props.onLogin === "function" ) {

                this.props.onLogin(this.onButtonClicked());

            }

        }

        this.form = null;
    }

    componentWillUpdate () {}

    render () {

        return (
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 1em 0 1em"
                }}
                ref={ ref => this.form = ref }
            >
                <TextField 
                    name="email"
                    type="email"
                    placeholder="xyz@yolo.gmail.com"
                />
                <TextField 
                    name="password"
                    type="password"
                    placeholder="****"
                />

            <section
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "2em"
                }}
            >
                <RaisedButton 
                    onClick={this.onLogin}
                >
                    Login
                </RaisedButton>
                <RaisedButton
                    onClick={this.onSignIn}
                >
                    SignIn
                </RaisedButton>
            </section>
            <section
                style={{
                    justifyContent: "center",
                    marginTop: "2em",
                    display: this.props.processing ? "flex" : "none"
                }}
            >
                <CircularProgress size={60}/>
            </section>

        </form>
        );


    }
}

export function mapDispatchToProps ( dispatch ) {

    return {
        onSignIn ( credentials ) {

            return dispatch({
                type: SIGN_USER,
                data: credentials
            });

        },
        onLogin ( credentials ) {

            return dispatch({
                type: LOG_USER,
                data: credentials
            });

        }
    };

}

export function mapStateToProps ( state ) {

    return {

        processing: state.user.processing

    }

}

export const ConnectedForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);
