import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TestInterface from './components/TestInterface';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/test/:id" component={TestInterface} />
        <Route path="/results/:id" component={Results} />
      </Switch>
    </Router>
  );
}