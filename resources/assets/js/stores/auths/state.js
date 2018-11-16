const state = {
  token: sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : null,
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
}

const getters = {
  getToken: state => {
    return state.token;
  },
  getUser: state => {
    return state.user;
  },
  getUserId: state => {
    return state.user._id;
  },
  getUserRoles: state => {
    return state.user.roles;
  }
}

const mutations = {
  setUser(state, obj) {
    state.user = obj
  },
  setToken(state, obj) {
    state.token = obj
  }
}

export default {
  state,
  getters,
  mutations
}
