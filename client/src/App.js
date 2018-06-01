import React, { Component } from 'react';
import './App.css';
import ProductsList from './components/ProductsList'
import ProductDetails from './components/ProductDetails'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path="/products" component={ProductsList} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/" render={ () => <Redirect to="/products" /> } />
        </div>
      </Router>
    )
  }
}

export default App;
