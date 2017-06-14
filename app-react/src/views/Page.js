import React, {  } from 'react';
import {
    Page as OnsenPage,
    Toolbar as OnsenToolbar,
    BackButton,
    Icon
} from "react-onsenui";


export function goBack () {

    history.back(); // eslint-disable-line no-restricted-globals

}



export function createToolbar ( {
    title,
    hasBackButton
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
                <Icon icon="md-menu"/>
            </div>
        </OnsenToolbar>
    );

}


export function Page ( {
    title = "",
    hasBackButton = false,
    children
} ) {

    return (
            <OnsenPage
                renderToolbar={createToolbar({ title, hasBackButton })}
            >
                { children }
            </OnsenPage>
    );

}
