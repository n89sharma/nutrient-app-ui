// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ApplicationContainer from './ApplicationContainer'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={ApplicationContainer}/>
      </Router>
    );
  }
}

export default App;
