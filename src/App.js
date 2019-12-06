import React from 'react';
import {
  BrowserRouter as Router,
  Switch
  // Link
} from "react-router-dom";

import FrontendAuth from './components/frontend-auth'

import './App.scss';

import routeConfig from './routes'

function App() {
  return (
    <Router>
      {/* <ul>
        <Link to='/login'>Login</Link>
        <Link to='/home'>Home</Link>
        <Link to='/home/dashboard'>Dashboard</Link>
        <Link to='/home/department'>Department</Link>
        <Link to='/home/job'>Job</Link>
        <Link to='/home/user'>User</Link>
      </ul> */}
      <Switch>
        <FrontendAuth config={routeConfig} />
      </Switch>
    </Router>
  );
}

export default App;
