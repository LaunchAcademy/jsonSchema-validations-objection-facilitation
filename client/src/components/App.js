import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route, Switch } from "react-router-dom"

import "../assets/scss/main.scss";

import UnicornForm from "./UnicornForm";
import UnicornList from "./UnicornList";
import UnicornDetailsPage from "./UnicornDetailsPage";

const App = props => {

    return (
        <div className="main-body">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/unicorns" component={UnicornList}/>
                    <Route exact path="/unicorns/new" component={UnicornForm}/>
                    <Route exact path="/unicorns/:id" component={UnicornDetailsPage}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default hot(App);
