import React, {  } from 'react';
import propTypes from "prop-types";
import {
    Page as OnsenPage,
    Toolbar as OnsenToolbar,
    BackButton,
    Icon
} from "react-onsenui";
import { noop } from "lodash";


export function goBack () {

    history.back(); // eslint-disable-line no-restricted-globals

}



export function createToolbar ( {
    title,
    hasBackButton,
    toggleMenu = noop
} ) {

    return () => (
        <OnsenToolbar>
            <div className="left">
                {

                    hasBackButton ?
                        <BackButton onClick={goBack}>Back</BackButton>:
                        null


                }
            </div>
            <div className="center">{title}</div>
            <div className="right">
                <Icon 
                    style={{
                        marginRight: "1em"
                    }}
                    icon="ion-navicon, material:md-menu"
                    onClick={toggleMenu}
                />
            </div>
        </OnsenToolbar>
    );

}


export function Page ( {
    title = "",
    hasBackButton = false,
    children
}, context ) {

    return (
            <OnsenPage
                renderToolbar={createToolbar({ 
                    title,
                    hasBackButton,
                    toggleMenu: context.toggleMenu
                })}
            >
                { children }
            </OnsenPage>
    );

}

Page.contextTypes = {
    toggleMenu: propTypes.func
};
