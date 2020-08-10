import React, {Component} from 'react'
import {Route, Switch,  Redirect} from 'react-router-dom'

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
            <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/staffs/:menu/:option" component={Staff}/>
            <PrivateRoute exact path="/students" component={Student}/>
            </Switch>
    
        </div>)
    }
  }
  
  export default MainRouter