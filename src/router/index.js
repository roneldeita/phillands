import Vue from 'vue'
import Router from 'vue-router'

//components
import Index from '@/components/Index'
import NotFound from '@/components/Not-found'
import Rent from '@/components/Rent'
import Sale from '@/components/Sale'
import PublishProperty from '@/components/seller/Publish-property'

import Users from '@/components/Users'
import User from '@/components/User'

//middlewares
import { requireAuth } from '../assets/utils/auth';

Vue.use(Router)


export default new Router({
  routes: [
        { path: '*', component: NotFound },
        { path: '/', name: 'index', component: Index },
        { path: '/rent', name: 'rent', component: Rent},
        { path: '/sale', name: 'sale', component: Sale},
        { path: '/publish-property', name: 'publish-property', beforeEnter:requireAuth, component: PublishProperty},

        { path: '/users', name: 'users', beforeEnter: requireAuth, component: Users},
        { path: '/user/:userName', name: 'user', component: User},

  ],
  mode: 'history'//to remove the # in the url
})
