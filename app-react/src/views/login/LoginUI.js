import React, {
    // Component,
    // PropTypes
} from "react";
import {
    Card,
    CardHeader,
    CardActions,
    CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
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

            <CardHeader
                title="Thanks for logging in"
            />
            <CardText>
                {"Your email: "}
            </CardText>
            <CardActions>
                <RaisedButton
                    secondary={true}
                    onClick={onLogout}
                >
                    Log out
                </RaisedButton>
            </CardActions>
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
