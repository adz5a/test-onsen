import React, {  } from 'react';
import propTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import MenuIcon from "material-ui/svg-icons/action/view-headline";
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import IconButton from "material-ui/IconButton";


export function goBack () {

    history.back(); // eslint-disable-line no-restricted-globals

}





const style = {
    height: "100vh",
    width: "100%"
};


export function Page ( {
    title = "",
    hasBackButton = false,
    children
}, context ) {


    const barProps = {
        title,
        showMenuIconButton: hasBackButton,
        iconElementRight: <IconButton onClick={context.toggleMenu}><MenuIcon /></IconButton>,
    };

    if ( hasBackButton ) {

        barProps.iconElementLeft = <IconButton onClick={goBack}><BackIcon /></IconButton>;

    }

    return (
        <section
            style={style}
        >
            <AppBar
                { ...barProps }
            />
            <section>
                { children }
            </section>
        </section>
    );

}

Page.contextTypes = {
    toggleMenu: propTypes.func
};
