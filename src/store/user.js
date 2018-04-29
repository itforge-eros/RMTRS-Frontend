const state = {
  account: null,
  rights: {
    staff: {
      reservation: {read: true, write: true},
      movie: {read: true, write: false},
      theatre: {read: true, write: false},
      screening: {read: true, write: false},
      account: {read: 0, write: 0}
    },
    manager: {
      reservation: {read: false, write: false},
      movie: {read: true, write: true},
      theatre: {read: true, write: true},
      screening: {read: true, write: true},
      account: {read: 1, write: 1}
    },
    admin: {
      reservation: {read: false, write: false},
      movie: {read: false, write: false},
      theatre: {read: false, write: false},
      screening: {read: false, write: false},
      account: {read: 2, write: 2}
    }
  }
}
const mutations = {
  GETACCOUNT (state) {
    if (localStorage.currentAccount !== undefined) {
      state.account = JSON.parse(localStorage.currentAccount)
    }
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
  getAccount: state => state.account,
  getRights: state => role => state.rights[role]
}
export default {
  state,
  getters,
  mutations,
  actions
}
