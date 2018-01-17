import { getProfile } from '../../assets/utils/auth.js'
import * as types from '../mutation-types'

const Profile  = {
  state: { phillandsProfile: getProfile() },
  getters: {
    phillandsProfile (state) {
      return state.phillandsProfile
    }
  },
  mutations:{
    [types.UPDATE_PHILLANDS_PROFILE] (state, payload) {
      console.log(payload)
      state.phillandsProfile = getProfile()
    }
  },
  actions:{
    updatePhillandsProfile ({commit}, payload) {
      commit(types.UPDATE_PHILLANDS_PROFILE, payload)
    }
  }
}

export default Profile
