import { getIdToken } from '../../assets/utils/auth.js'

const Token  = {
  state: { phillandsIdToken: getIdToken() },
  getters: {
    phillandsIdToken (state) {
      return state.phillandsIdToken
    }
  },
  mutations:{},
  actions:{}
}

export default Token
