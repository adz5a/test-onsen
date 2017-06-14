import React, { 
    // Component,
    // PropTypes
} from "react";
import {
    Input,
    Button
} from "react-onsenui";

export function Form () {

    return (
        <form
            style={{
                textAlign: "center",
                padding: "1em 0 1em 0"
            }}
        >
            <Input 
                type="text"
                placeholder="a lot of stuff to do"
            />
            <Button type="submit">Add</Button>
        </form>
    );

}
