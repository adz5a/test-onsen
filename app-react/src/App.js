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



class App extends Component {
    render() {
        return (
            <Router
                forceRefresh={false}
            >
                <div>
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
            </div>
        </Router>
        );
    }
}

export default App;
