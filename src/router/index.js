import Vue from 'vue'
import Router from 'vue-router'

//components
import Index from '@/components/Index'
import NotFound from '@/components/Not-found'
import Rent from '@/components/Rent'
import Sale from '@/components/Sale'
import Profile from '@/components/seller/profile'
import Listings from '@/components/seller/listings'
import PublishProperty from '@/components/seller/Publish-property'

import Users from '@/components/Users'
import User from '@/components/User'

//middlewares
import { requireAuth } from '../assets/utils/lock';

Vue.use(Router)


export default new Router({
  routes: [
        { path: '*', component: NotFound },
        { path: '/', name: 'index', component: Index },
        { path: '/rent', name: 'rent', component: Rent, props: true },
        { path: '/sale', name: 'sale', component: Sale, props: true },
        { path: '/profile', name:'profile', beforeEnter:requireAuth, component: Profile },
        { path: '/listings', name:'listings', beforeEnter:requireAuth, component: Listings },
        { path: '/publish-property', name: 'publish-property', beforeEnter:requireAuth, component: PublishProperty },

        { path: '/users', name: 'users', beforeEnter: requireAuth, component: Users },
        { path: '/user/:userName', name: 'user', component: User }

  ],
  mode: 'history'//to remove the # in the url
})
