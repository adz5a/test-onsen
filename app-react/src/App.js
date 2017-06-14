import React, { Component } from 'react';
import {
    LoginPage
} from "./views/Login";
import {
    HomePage
} from "./views/Home";
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
            </div>
        </Router>
        );
    }
}

export default App;
