import Vue from 'vue'
import Router from 'vue-router'

//components
import Index from '@/components/Index'
import NotFound from '@/components/Not-found'
import Users from '@/components/Users'
import User from '@/components/User'
import Rent from '@/components/Rent'
import Sale from '@/components/Sale'

//middlewares
import { requireAuth } from '../assets/utils/auth';

Vue.use(Router)


export default new Router({
  routes: [
        { path: '*', component: NotFound },
        { path: '/', name: 'index', component: Index },
        { path: '/users', name: 'users', beforeEnter: requireAuth, component: Users},
        { path: '/user/:userName', name: 'user', component: User},
        { path: '/rent', name: 'rent', component: Rent},
        { path: '/sale', name: 'sale', component: Sale},
  ],
  mode: 'history'//to remove the # in the url
})
