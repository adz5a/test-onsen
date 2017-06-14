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
    BrowserRouter as Router,
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



class App extends Component {
    render() {
        return (
            <Router
                forceRefresh={false}
            >
                <Splitter>
                    <SplitterSide
                        style={{
                            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                        }}
                        side='left'
                        width={200}
                        collapse={true}
                        isSwipeable={true}
                        isOpen={true}
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
        </Router>
        );
    }
}

export default App;
