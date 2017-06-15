import React, { 
    // Component,
    // PropTypes
} from "react";
import {
    Card,
    Button
} from "react-onsenui";
import {
    noop
} from "lodash";
import propTypes from "prop-types";
import {
    connect
} from "react-redux";
import {
    UNLOG_USER
} from "data/user";

export function LoginUI ( { 
    user = {},
    onLogout = noop
} ) {

    return (
        <Card>
            <h1>Thanks for logging in</h1>
            <p>
                {`Your email : ${user.email || ""}`}
            </p>

            <Button
                onClick={onLogout}
            >
                Log out
            </Button>
        </Card>
    );

}

LoginUI.propTypes = {
    onLogout: propTypes.func,
    user: propTypes.object
};

export function mapStateToProps ( state ) {

    return {
        user: state.user
    };

}

export function mapDispatchToProps ( dispatch ) {

    return {
        onLogout () {

            return dispatch({
                type: UNLOG_USER
            });

        }
    };

}

export const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export const ConnectedLoginUI = WithConnect(LoginUI);
