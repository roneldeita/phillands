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
    phillandsProfile: (state) => {
      return state.phillandsProfile
    },
    phillandsIdToken: (state) => {
      return state.phillandsIdToken
    },
    loginVisible:  (state) => {
      return state.loginVisible
    },
    feedbackVisible: (state) => {
      return state.feedbackVisible
    }
  },
  mutations: {
    updatePhillandsProfile: (state) => {
      state.phillandsProfile = getProfile()
    },
    toggleLoginModal: (state) => {
      state.loginVisible = !state.loginVisible
    },
    toggleFeedbackModal: (state) => {
      state.feedbackVisible = !state.feedbackVisible
    }
  },
  actions: {
    updatePhillandsProfile: (context) => {
      context.commit('updatePhillandsProfile')
    },
    toggleLoginModal: (context) => {
      context.commit('toggleLoginModal')
    },
    toggleFeedbackModal: (context) => {
      context.commit('toggleFeedbackModal')
    }
  }
})
