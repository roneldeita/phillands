// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueAuthenticate from 'vue-authenticate'
import Paginate from 'vuejs-paginate'
import ElementUI from 'element-ui'//ElementUi
import 'element-ui/lib/theme-default/index.css'//ElementUiTheme
import GSignInButton from 'vue-google-signin-button'

Vue.use(VueResource)
Vue.use(GSignInButton)
Vue.use(ElementUI)

Vue.component('paginate', Paginate)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8000', // Your API domain

  providers: {
    github: {
      clientId: '',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    }
  }
})
