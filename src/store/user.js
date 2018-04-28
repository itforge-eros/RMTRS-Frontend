const state = {
  account: null
}
const mutations = {
  GETACCOUNT (state) {
    state.account = JSON.parse(localStorage.currentAccount)
  },
  CLEARACCOUNT (state) {
    localStorage.clear()
    state.account = null
  }
}
const actions = {
  fetchAccount: ({ commit }) => commit('GETACCOUNT'),
  clearAccount: ({ commit }) => commit('CLEARACCOUNT')
}
const getters = {
  getAccount: state => state.account
}
export default {
  state,
  getters,
  mutations,
  actions
}
