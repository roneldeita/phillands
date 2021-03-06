import decode from 'jwt-decode';
import Auth0Lock from 'auth0-lock';
import Router from 'vue-router';
import axios from 'axios'

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const PROFILE = '';

// const CLIENT_ID = 'LFMSdDdhUELn8nDp0Z21nKn0Ux7eo0pN';
// const CLIENT_DOMAIN = 'roneldeita.auth0.com';
// const SCOPE = 'full_access';
// const AUDIENCE = 'http://phillands.com';
// const LOGO = 'http://phillands.com/static/img/PL_Logo_250px.3abadf0.png';

const CLIENT_ID = 'l2hXuS0JvmqsnmGMMqOF7140jUG8MJmv';
const CLIENT_DOMAIN = 'roneldeita.auth0.com';
const SCOPE = 'full_access';
const AUDIENCE = 'http://phillands.dev';
const LOGO = 'http://localhost:8080/static/img/PL_Logo_250px.3abadf0.png';


var router = new Router({
   mode: "history",
});

// lock options
var options = {
  // additionalSignUpFields: [
  //   { name:'first_name', placeholder:'Your first name'},
  //   { name:'last_name', placeholder:'Your last Name'},
  //   { name:'contact', placeholder:'Contact Number'}
  // ],
  //allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
  allowedConnections: ['Username-Password-Authentication'],
  auth: {
    responseType: "token",
    redirect:false
  },
  theme: {
    logo: LOGO,
    primaryColor: "#56BA50"
  },
  languageDictionary: {
    title: ""
  }
};
// Initializing our Auth0Lock
var lock = new Auth0Lock(
  CLIENT_ID,
  CLIENT_DOMAIN,
  options
);

// Listen for authenticated event; pass the result to a function as authResult
lock.on("authenticated", function(authResult) {
  // Call getUserInfo using the token from authResult
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    // Store the token from authResult for later use
    localStorage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken);
    localStorage.setItem(ID_TOKEN_KEY, authResult.idToken);
    localStorage.setItem(PROFILE, JSON.stringify(profile));

    console.log(profile);


    //reload page after the token were set
    if(isLoggedIn){
      setTimeout(function(){
        location.reload();
      }, 2000);
    }
  });
});

export function login() {

  lock.show();

}


//create user
lock.on("signup submit", function(){

    // axios.post('http://103.16.170.117:8090/register', {
    //   first_name:' ',
    //   last_name:' ',
    //   email : localStorage.getItem(PROFILE.email),
    //   password :'February19',
    //   contact: ' '
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

});


/* middleware for authentication */
export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: to.path,
      query: { redirect: to.fullPath }
    });
    lock.show();
  } else {
    next();
  }
}
/* end middleware for authentication */

/* check login */
export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getProfile(){
  return localStorage.getItem(PROFILE);
}
/* end of check login */


/* logout */
export function logout() {
  clearAccessToken();
  clearIdToken();
  clearProfile();

  router.push('/');
  location.reload();
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearProfile() {
  localStorage.removeItem(PROFILE);
}


/* end of logout */
