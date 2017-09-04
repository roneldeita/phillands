// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Paginate from 'vuejs-paginate'
import ElementUI from 'element-ui'//ElementUi
import 'element-ui/lib/theme-default/index.css'//ElementUiTheme

Vue.use(VueResource)
Vue.use(ElementUI)

Vue.component('paginate', Paginate)

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
