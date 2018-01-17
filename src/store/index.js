import Vue from 'vue'
import Vuex from 'vuex'
import profile from './modules/Profile'
import token from './modules/Token'
import modals from './modules/Modals'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    profile,
    token,
    modals
  }
})

export default store
