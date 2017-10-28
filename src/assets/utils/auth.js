import axios from 'axios';
import Router from 'vue-router';
const BASE_URL = 'http://103.16.170.117:8090';
const ACCESS_TOKEN_KEY = 'access_token';
const USER = 'user';
var user_access = {};

var router = new Router({
   mode: "history",
});


export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.name }
    });
  } else {
    next();
  }
}

export function isAdmin(to, from, next){
  if(!isLoggedIn()){//check if logged in
    next({
      path: '/',
    });
  } else {
    getAccess()
    .then(response =>{
      if(response.role === 2){//check if role is admin
        next();
      }else{
        next({
          path: '/',
          redirect:{name:'index'}
        });
        location.reload();
      }
    });
  }
}

export function isLoggedIn(){
  const idToken = getIdToken();
  return !!idToken;
}

export function getIdToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getProfile(){
  return localStorage.getItem(USER);
}

export function getAccess(){
  axios.defaults.headers.common['token'] = getIdToken();
  return axios.post(BASE_URL+'/auth/check').then( response => response.data );
}

/* logout */
export function logout() {
  clearAccessToken();
  clearProfile();

  router.push('/');
  location.reload();
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearProfile() {
  localStorage.removeItem(USER);
}


/* end of logout */
