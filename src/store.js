import Vue from 'vue'
import Vuex from 'vuex'
import { getProfile, getIdToken } from './assets/utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phillandsProfile: getProfile(),
    phillandsIdToken: getIdToken(),
    loginVisible: false,
    feedbackVisible: false
  },
  getters: {
    phillandsProfile: function (state) {
      return state.phillandsProfile
    },
    phillandsIdToken: function (state) {
      return state.phillandsIdToken
    },
    loginVisible: function (state) {
      return state.loginVisible
    },
    feedbackVisible: function (state) {
      return state.feedbackVisible
    }
  },
  mutations: {
    updatePhillandsProfile: function (state) {
      state.phillandsProfile = getProfile()
    },
    toggleLoginModal: function (state) {
      state.loginVisible = !state.loginVisible
    },
    toggleFeedbackModal: function (state) {
      state.feedbackVisible = !state.feedbackVisible
    }
  },
  actions: {
    updatePhillandsProfile: function (context) {
      context.commit('updatePhillandsProfile')
    },
    toggleLoginModal: function (context) {
      context.commit('toggleLoginModal')
    },
    toggleFeedbackModal: function (context) {
      context.commit('toggleFeedbackModal')
    }
  }
})
