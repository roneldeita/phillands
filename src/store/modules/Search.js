import { hasSearch, getSearch } from '../../assets/utils/auth.js'
import * as types from '../mutation-types'

let InitialSearch = {
  offer_type:'sale',
  property_type:1,
  location:'',
}
console.log(hasSearch())
if(!hasSearch()){
  localStorage.setItem('search', JSON.stringify(InitialSearch));
}

const Search  = {
  state: {
    phillandsSearch: InitialSearch,
    localSearch: getSearch()
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
      // undone
      console.log(payload[objectKey])
      console.log(Object.assign([], JSON.parse(state.localSearch), { objectKey: payload[objectKey] }))
    }
  },
  actions:{
    updatePhillandsSearch ({commit}, payload) {
      commit(types.UPDATE_PHILLANDS_SEARCH, payload)
    }
  }
}

export default Search
