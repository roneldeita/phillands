import { hasSearch, getSearch } from '../../assets/utils/auth.js'
import * as types from '../mutation-types'

let InitialSearch = {
  property_type:1,
  location:'',
}

// console.log(hasSearch())
if(!hasSearch()){
  localStorage.setItem('search', JSON.stringify(InitialSearch));
}

const Search  = {
  state: {
    phillandsSearch: JSON.parse(getSearch())
  },
  getters: {
    phillandsSearch (state) {
      return state.phillandsSearch
    }
  },
  mutations:{
    [types.UPDATE_PHILLANDS_SEARCH] (state, payload) {
      var objectKey = Object.keys(payload).toString()
      state.phillandsSearch[objectKey] = payload[objectKey]

      const getSaveSearced = JSON.parse(getSearch())
      switch (objectKey) {
        case 'location':
          getSaveSearced['location'] = payload[objectKey]
          localStorage.setItem('search', JSON.stringify(getSaveSearced))
          break;
        case 'property_type':
          getSaveSearced['property_type'] = parseInt(payload[objectKey])
          localStorage.setItem('search', JSON.stringify(getSaveSearced))
          break;
        default:
      }
    }
  },
  actions:{
    updatePhillandsSearch ({commit}, payload) {
      commit(types.UPDATE_PHILLANDS_SEARCH, payload)
    }
  }
}

export default Search
