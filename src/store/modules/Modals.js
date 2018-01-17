import * as types from '../mutation-types'

const Modals = {
  state: {
    loginVisible: false,
    feedbackVisible: false
  },
  getters: {
    loginVisible (state) {
      return state.loginVisible
    },
    feedbackVisible (state) {
      return state.feedbackVisible
    }
  },
  mutations:{
    [types.TOGGLE_LOGIN_MODAL] (state) {
      state.loginVisible = !state.loginVisible
    },
    [types.TOGGLE_FEEDBACK_MODAL] (state) {
      state.feedbackVisible = !state.feedbackVisible
    }
  },
  actions:{
    toggleLoginModal ({commit}) {
      commit(types.TOGGLE_LOGIN_MODAL)
    },
    toggleFeedbackModal ({commit}) {
      commit(types.TOGGLE_FEEDBACK_MODAL)
    }
  }
}

export default Modals
