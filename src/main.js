// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueResource from 'vue-resource'
import Paginate from 'vuejs-paginate'
import ElementUI from 'element-ui'// ElementUi
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'// ElementUiTheme
import * as VueGoogleMaps from 'vue2-google-maps'
import VueLazyload from 'vue-lazyload'// for img
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueMoment from 'vue-moment-jalaali'// datetime library
import VueCarousel from 'vue-carousel'
import SocialSharing from 'vue-social-sharing'
import GSignInButton from 'vue-google-signin-button'
import FBSignInButton from 'vue-facebook-signin-button'

Vue.use(ElementUI, { locale })
Vue.use(VueLazyload)
Vue.use(VueMoment)
Vue.use(VueAxios, axios)
Vue.use(VueCarousel)
Vue.use(SocialSharing)
Vue.use(GSignInButton)
Vue.use(FBSignInButton)
Vue.use(VueGoogleMaps, {
   load: {
     key: 'AIzaSyATSZ8ZMz0L0e3dNxz3hzNJw7FHyFcZFcs',
     v: '3.29',
     libraries: 'places', // If you need to use place input
   }
 })
Vue.component('paginate', Paginate)
Vue.component('gmap-map', VueGoogleMaps.Map)
Vue.component('gmap-marker', VueGoogleMaps.Marker)

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
