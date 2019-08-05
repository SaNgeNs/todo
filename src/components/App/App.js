import React, { Component } from "react";
import LeftSidebar from "../LeftSidebar";
import Application from "../Application";

import './reset.scss';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <LeftSidebar className="App__leftSidebar" />
                <Application />
            </div>
        );
    }
}

export default App;