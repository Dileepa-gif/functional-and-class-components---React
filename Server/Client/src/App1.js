import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreatePost from "./Components/CreatePost1";
import EditPost from "./Components/EditPost1";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import PostDetails from "./Components/PostDetails";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={CreatePost} />
            <Route path="/edit/:id" component={EditPost} />
            <Route path="/post/:id" component={PostDetails} />
          
          </Switch>
        </div>
      </Router>
    );
  }
}
