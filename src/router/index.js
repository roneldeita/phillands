import Vue from 'vue'
import Router from 'vue-router'

//components
import Index from '@/components/Index'
import NotFound from '@/components/Not-found'
import Callback from '@/components/auth/Callback'
import Rent from '@/components/Rent'
import Sale from '@/components/Sale'
import PreSelling from '@/components/Pre-selling'
import Foreclosure from '@/components/Foreclosure'
import viewProperty from '@/components/View-property'
import Profile from '@/components/seller/profile'
import Listings from '@/components/seller/listings'
import PublishProperty from '@/components/seller/Publish-property'
import PublishCompleted from '@/components/seller/Publish-completed'
import EditProperty from '@/components/seller/Edit-property'

import Admin from '@/components/admin/Dashboard'
import AdminUsers from '@/components/admin/user/user.vue'
import AdminListings from '@/components/admin/listings/listings.vue'
import AdminAds from '@/components/admin/ads/ads.vue'

import Users from '@/components/Users'
import User from '@/components/User'

//middlewares
import { requireAuth, isAdmin } from '../assets/utils/auth';

Vue.use(Router)


export default new Router({
  routes: [
        { path: '*', component: NotFound },
        { path: '/', name: 'index', component: Index },
        { path: '/callback', name: 'callback', component: Callback },
        { path: '/rent', name: 'rent', component: Rent, props: true },
        { path: '/sale', name: 'sale', component: Sale, props: true },
        { path: '/property/:property_no', name: 'view-property', component: viewProperty},
        { path: '/pre-selling', name: 'pre-selling', component: PreSelling, props: true },
        { path: '/foreclosure', name: 'foreclosure', component:Foreclosure, props: true },
        { path: '/profile', name:'profile', beforeEnter:requireAuth, component: Profile },
        { path: '/listings', name:'listings', beforeEnter:requireAuth, component: Listings },
        { path: '/listings/for-approval', name:'for-approval', beforeEnter:requireAuth, component: Listings },
        { path: '/listings/archives', name:'archives', beforeEnter:requireAuth, component: Listings },
        { path: '/listings/inactive', name:'inactive', beforeEnter:requireAuth, component: Listings },
        { path: '/listings/wishlist', name:'wishlist', beforeEnter:requireAuth, component: Listings },
        { path: '/publish-property', name: 'publish-property', beforeEnter:requireAuth, component: PublishProperty },
        { path: '/publish-completed', name: 'publish-completed', beforeEnter:requireAuth, component: PublishCompleted },
        { path: '/edit-property/:property_no', name: 'edit-property', beforeEnter:requireAuth, component: EditProperty },

        { path: '/admin', name: 'admin-dashboard', beforeEnter:isAdmin, component:Admin},
        { path: '/admin/users', name: 'admin-users', beforeEnter:isAdmin, component:AdminUsers },
        { path: '/admin/listings', name: 'admin-listings', beforeEnter:isAdmin, component:AdminListings },
        { path: '/admin/ads', name: 'admin-ads', beforeEnter:isAdmin, component:AdminAds },

        { path: '/users', name: 'users', beforeEnter: requireAuth, component: Users },
        { path: '/user/:userName', name: 'user', component: User }

  ],
  mode: 'history'//to remove the # in the url
})
