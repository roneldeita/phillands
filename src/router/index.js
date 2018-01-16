import Vue from 'vue'
import Router from 'vue-router'

//components
import Index from '@/components/Index'
import NotFound from '@/components/Not-found'
import Privacy from '@/components/Policy'
import Rent from '@/components/property/Rent'
import Sale from '@/components/property/Sale'
import PreSelling from '@/components/property/Pre-selling'
import Foreclosure from '@/components/property/Foreclosure'
import viewProperty from '@/components/property/View-property'
import Profile from '@/components/seller/profile/Profile'
import EmailVerification from '@/components/seller/profile/Email-verification'
import ResetPassword from '@/components/auth/Reset-Password'
import Listings from '@/components/seller/Listings'
import PublishProperty from '@/components/seller/Publish-property'
import PublishCompleted from '@/components/seller/Publish-completed'
import EditProperty from '@/components/seller/property/Edit-property'

import Admin from '@/components/admin/Dashboard'
import AdminUsers from '@/components/admin/user/Users'
import AdminListings from '@/components/admin/listings/Listings'
import AdminAds from '@/components/admin/ads/Ads'
import AdminCMS from '@/components/admin/cms/Cms'
import AdminForclosures from '@/components/admin/foreclosures/Foreclosure'

//middlewares
import { requireAuth, isAdmin } from '../assets/utils/auth';

Vue.use(Router)


export default new Router({
  routes: [
    { path: '*', component: NotFound },
    { path: '/', name: 'index', component: Index },
    { path: '/privacy', name: 'privacy', component: Privacy},
    { path: '/rent', name: 'rent', component: Rent, props: true },
    { path: '/sale', name: 'sale', component: Sale, props: true },
    { path: '/pre-selling', name: 'pre-selling', component: PreSelling, props: true },
    { path: '/foreclosure', name: 'foreclosure', component:Foreclosure, props: true },
    { path: '/property/:property_no', name: 'view-property', component: viewProperty},
    { path: '/profile', name:'profile', beforeEnter:requireAuth, component: Profile },
    { path: '/email/verification', name:'email-verification', component:EmailVerification, props: true},
    { path: '/forgot_password/', name:'reset-password', component: ResetPassword},
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
    { path: '/admin/cms', name: 'admin-cms', beforeEnter:isAdmin, component:AdminCMS },
    { path: '/admin/foreclosures', name: 'admin-foreclosures', beforeEnter:isAdmin, component:AdminForclosures }
  ],
  mode: 'history'//to remove the # in the url
})
