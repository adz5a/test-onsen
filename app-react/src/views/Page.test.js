import React from 'react';
import ReactDOM from 'react-dom';
import reactTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Page } from "./Page";
import renderer from "react-test-renderer";


// necessary for the onTap prop
reactTapEventPlugin();

function createNodeMock ( name ) {

    return {

        style: {}

    };

}


it('renders without crashing', () => {
    ReactDOM.render(
        <MuiThemeProvider>
            <Page />
        </MuiThemeProvider>,
        document.createElement("div")
    );
});

it("matches snapshot", () => {


    const tree = renderer.create(
        <MuiThemeProvider>
            <Page />
        </MuiThemeProvider>,
        { createNodeMock }
    ).toJSON();

    expect(tree).toMatchSnapshot();


});
