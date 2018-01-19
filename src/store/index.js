import Vue from 'vue'
import Vuex from 'vuex'
import profile from './modules/Profile'
import token from './modules/Token'
import modals from './modules/Modals'
import search from './modules/Search'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    profile,
    token,
    modals,
    search
  }
})

export default store
