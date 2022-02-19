import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css"

export default class NavBar extends Component {
  render() {
      return (
        <nav className="navbar">
          <h5>Posts</h5>
          <div className="links">
            <Link to="/">Home</Link>
          </div>
        </nav>
      );
  }
}
