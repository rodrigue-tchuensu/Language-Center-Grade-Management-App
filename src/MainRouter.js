import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch,  Redirect} from 'react-router-dom'
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';

import Staff from './components/staff/Staff'
import Student from './components/student/Student'
import Login from './components/login/Login'

const request = require ('./resources/request');

//inspired from https://reacttraining.com/react-router/web/example/auth-workflow
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    request.auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)



class MainRouter extends Component {
    render() {
      return (
        <div>   
            <Router>
              <LastLocationProvider>
                <Route exact path="/" component={Login}/>
                <PrivateRoute exact  path="/login" component={Login}/>
                <PrivateRoute  exact path="/staffs/:menu/:option" component={Staff}/>
                <PrivateRoute  exact path="/students/:user/:option" component={Student}/>
              </LastLocationProvider>
            </Router>
    
        </div>)
    }
  }
  
  export default MainRouter