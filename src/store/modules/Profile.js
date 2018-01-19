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
      state.phillandsProfile = payload
    }
  },
  actions:{
    updatePhillandsProfile ({commit}) {
      commit(types.UPDATE_PHILLANDS_PROFILE, getProfile())
    }
  }
}

export default Profile
