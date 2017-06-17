import React, { Component } from 'react';
import {
    LoginPage
} from "views/login/Page";
import {
    HomePage
} from "views/Home";
import {
    TodoListPage
} from "views/todolist/Page";
import {
    Route
} from "react-router-dom";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import CloseIcon from "material-ui/svg-icons/content/clear";
import IconButton from "material-ui/IconButton";
import propTypes from "prop-types";




class App extends Component {

    getChildContext () {

        return {
            toggleMenu: () => this.setState( state  => ({
                ...state,
                isOpen: !state.isOpen
            }))
        };

    }

    static childContextTypes = {
        toggleMenu: propTypes.func
    };


    componentWillMount () {

        this.setState({
            isOpen: false
        });

        this.onClose = () => this.setState(state => ({

            ...state,
            isOpen: false

        }));

    }


    render() {
        return (
            <section>
                <Drawer
                    open={this.state.isOpen}
                    openSecondary={true}
                >
                    <div>
                        <IconButton
                            style={{
                                textAlign: "right"
                            }}
                            onClick={this.onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <MenuItem>yolo</MenuItem>
                    <MenuItem>Yola</MenuItem>
                </Drawer>
                <section>
                    <Route
                        path="/"
                        exact={true}
                        component={HomePage}
                    />
                    <Route
                        component={LoginPage}
                        path="/login"
                    />
                    <Route
                        component={TodoListPage}
                        path="/todolist"
                    />
                </section>
            </section>
        );
    }
}

export default App;
