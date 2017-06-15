import React, { Component } from 'react';
import {
    LoginPage
} from "./views/login/Page";
import {
    HomePage
} from "./views/Home";
import {
    TodoListPage
} from "./views/todolist/Page";
import {
    Route
} from "react-router-dom";
import {
    Splitter,
    SplitterSide,
    SplitterContent,
    Page as OnsenPage,
    List,
    ListItem
} from "react-onsenui";
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

        this.onOpen = () => this.setState(state => ({

            ...state,
            isOpen: true

        }));
        this.onClose = () => this.setState(state => ({

            ...state,
            isOpen: false

        }));

    }


    render() {
        return (
            <Splitter>
                <SplitterSide
                    style={{
                        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                    }}
                    side='right'
                    width={200}
                    collapse={true}
                    isSwipeable={true}
                    isOpen={this.state.isOpen}
                    onClose={this.onClose}
                    onOpen={this.onOpen}
                >
                    <OnsenPage>
                        <List
                            dataSource={["Profile", "Settings"]}
                            renderRow={
                                (data, index) => <ListItem key={index}>{data}</ListItem>

                            }
                        />
                    </OnsenPage>
                </SplitterSide>
                <SplitterContent>
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
                </SplitterContent>
            </Splitter>
        );
    }
}

export default App;
