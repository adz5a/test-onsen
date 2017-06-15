import React from "react";
import {
    Card
} from "react-onsenui";
import {
    Link
} from "react-router-dom";



export function Unauthorized () {

    return (
        <Card>
            <h1>Sorry...</h1>
            <p>
                <span>You don't seem to be currently logged, please </span> 
                <Link to="/login">login or sign in</Link>
                <span> to access this page</span>
            </p>
        </Card>
    );

}
