import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Users from '@/components/Users'
import User from '@/components/User'

import Rent from '@/components/Rent'
import Sale from '@/components/Sale'

Vue.use(Router)

export default new Router({
  routes: [
        { path: '/', name: 'index', component: Sale },
        { path: '/login', name: 'login', component: Login },
        { path: '/users', name: 'users', component: Users},
        { path: '/user/:userName', name: 'user', component: User},
        { path: '/rent', name: 'rent', component: Rent},
        { path: '/sale', name: 'sale', component: Sale}
  ],
  mode: 'history'//to remove the # in the url
})
