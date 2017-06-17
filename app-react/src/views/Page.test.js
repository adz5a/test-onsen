import React from 'react';
import ReactDOM from 'react-dom';
import reactTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Page } from "./Page";
import renderer from "react-test-renderer";
import {
    shallow,
    mount
} from "enzyme";
import AppBar from "material-ui/AppBar";
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import IconButton from "material-ui/IconButton";

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

it("render an app bar", () => {

    const wrapper = shallow(
            <Page />
    );

    expect(wrapper.find(AppBar).length)
        .toBe(1);

});

it("has a back button when the props is to true", () => {

    const wrapper = mount(
        <MuiThemeProvider>
            <Page 
                hasBackButton={true}
            />
        </MuiThemeProvider>,
    );

    expect(wrapper.find(IconButton).length)
        .toBe(2);

    expect(wrapper.find(BackIcon).length)
            .toBe(1);


});
