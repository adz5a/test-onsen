import React, { Component,  } from "react";
import {
    Input,
    Button
} from "react-onsenui";
import { connect } from "react-redux";
import {
    LOG_USER,
    SIGN_USER
} from "./../../data/user";
import PropTypes from "prop-types";


export class Form extends Component {

    static propTypes = {
        onSignIn: PropTypes.func,
        onLogin: PropTypes.func,
    };

    componentWillMount () {

        this.onButtonClicked = () => {

            return {
                email: this.refs.email.value,
                password: this.refs.password.value,
            };

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
                onSubmit={
                    e => console.log(e)
                }
            >
                <Input 
                    type="email"
                    float
                    placeholder="xyz@yolo.gmail.com"
                    modifier="underbar"
                    ref={"email"}
                />
                <Input 
                    type="password"
                    float
                    placeholder="****"
                    modifier="underbar"
                    ref={"password"}
                />

            <section
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "2em"
                }}
            >
                <Button type="submit"
                    onClick={e => console.log(this.onButtonClicked())}
                >Login</Button>
                <Button type="submit"
                    onClick={e => console.log(this.onButtonClicked())}
                >SignIn</Button>
            </section>
        </form>
        );



    }
}

export function mapDispatchToProps ( dispatch ) {

    return {
        onSignIn ( credentials ) {

            return {
                type: SIGN_USER,
                data: credentials
            };

        },
        onLogin ( credentials ) {

            return {
                type: LOG_USER,
                data: credentials
            };

        }
    };

}

export const ConnectedForm = connect(null, mapDispatchToProps)(Form);

