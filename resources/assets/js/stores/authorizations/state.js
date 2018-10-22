//https://alligator.io/vuejs/vuex-dynamic-modules/

const state = {
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
}

const getters = {
  getToken: state => {
    return state.user.HTTP_Authorization;
  },

  getUser: state => {
    return state.user;
  }
}

const actions = {

}

const mutations = {

  setUser(state, obj) {
    state.user = obj
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
