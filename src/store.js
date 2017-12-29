import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginVisible : false
  },
  getters: {
    loginVisible: function (state) {
      return state.loginVisible
    }
  },
  mutations: {
    toggleLoginModal: function (state) {
      state.loginVisible = !state.loginVisible
    }
  },
  actions: {
    toggleLoginModal: function (context) {
      context.commit('toggleLoginModal')
    }
  }
})
