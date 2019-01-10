import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar/NavBar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar></NavBar>
          <main>
            <Switch>
              <Redirect from='/' to='/auth' exact></Redirect>
              <Route path='/auth' component={Auth}></Route>
              <Route path='/Dashboard' component={Dashboard}></Route>
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
