// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Paginate from 'vuejs-paginate'
import ElementUI from 'element-ui'//ElementUi
import 'element-ui/lib/theme-default/index.css'//ElementUiTheme
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueGoogleMaps, {
   load: {
     key: 'AIzaSyATSZ8ZMz0L0e3dNxz3hzNJw7FHyFcZFcs',
     v: '3.28',
     libraries: 'places', //// If you need to use place input
   }
 });

Vue.component('paginate', Paginate)
Vue.component('gmap-map', VueGoogleMaps.Map);
Vue.component('gmap-marker', VueGoogleMaps.Marker);

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
