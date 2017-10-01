import axios from 'axios';
import Router from 'vue-router';
const BASE_URL = 'http://103.16.170.117:8090/property';
const ACCESS_TOKEN_KEY = 'access_token';
const USER = 'user';

var router = new Router({
   mode: "history",
});


export function login(data) {
  axios.post('http://103.16.170.117:8090/login',data)
  .then(function (response) {
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);
    localStorage.setItem(USER, JSON.stringify(response.data.user));

    location.reload();


  })
  .catch(function (error) {
    //console.log(JSON.stringify(error))

  });

}

export function register(data) {
  axios.post('http://103.16.170.117:8090/register', data)
  .then(function (response) {
    //location.reload();
    login({email:data.email, password:data.password})
    //console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}


export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    //console.log(to)
    next({
      path: '/',
      query: { redirect: to.name }
    });
  } else {
    next();
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
