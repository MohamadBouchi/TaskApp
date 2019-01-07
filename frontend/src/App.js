import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from='/' to='/auth' exact></Redirect>
          <Route path='/auth' component={Auth}></Route>
          <Route path='/Dashboard' component={Dashboard}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
