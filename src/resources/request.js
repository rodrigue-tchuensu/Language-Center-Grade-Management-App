import {API_BASE_URL} from '../constants'

const request = require('superagent');


const login = (user, callback) => {
    request.post(API_BASE_URL  + 'login')
            .set('Content-Type', 'application/json')
            .set('Accept', 'text/plain')
            .send(user)
            .end((err, res) =>{
                callback(err, res)
            }) 
}


const logout = (callback)=> {
    callback()
}



const get = (url, callback) => {
    request.get(API_BASE_URL + url)
           .set('Content-Type', 'application/json')
           .set('Accept', 'application/json')
           .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
           .end((err, res) => {
                callback(err, res)
           })
}



const post = (url,body, callback) => {
    request.post(API_BASE_URL + url)
           .set('Content-Type', 'application/json')
           .set('Accept', 'application/json')
           .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
           .send(body)
           .end((err, res) => {
               callback(err,res)
           })
}


const put = (url, body, callback) => {
    request.put(API_BASE_URL + url)
           .set('Content-Type', 'application/json')
           .set('Accept', 'application/json')
           .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
           .send(body)
           .end((err, res) => {
                callback(err,res)
           })
}


const remove = (url, body, callback) => {
    request.delete(API_BASE_URL + url)
           .set('Content-Type', 'application/json')
           .set('Accept', 'application/json')
           .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
           .send(body)
           .end((err, res) => {
                callback(err,res)
           })
}

function isObjectPresent(obj)
{
 return obj && obj !== 'null' && obj !== 'undefined';
}

const auth = {

    isAuthenticated() {
      if (sessionStorage.getItem('jwt'))
        return JSON.parse(sessionStorage.getItem('jwt'))
      else
        return false
    },

    authenticate(jwt, callback) {
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
      if(typeof callback === 'function' && callback()) {
        callback()
      }
      
    },

    logout(callback) {
      sessionStorage.removeItem('jwt')
      if(typeof callback === 'function' && callback()) {
        callback()
      }
    },

    decodeJWT(token){

      if(isObjectPresent(token)) {
        const jwtPayload = JSON.parse(atob(token.split('.')[1]));
        return jwtPayload; 
      } else {
        return undefined
      }   
    },

    getAvailableUserDetails() {
      const jwtPayload = this.decodeJWT(JSON.parse(sessionStorage.getItem('jwt')))
      const userDetails = {
        username: jwtPayload.sub,
        studentOrStaffNumber: jwtPayload.studentOrStaffNumber,
        roles: jwtPayload.roles,
      }
      return userDetails
    }
  }


export{
    get,
    post,
    put,
    remove,
    login,
    //singup,
    logout,
    auth
}