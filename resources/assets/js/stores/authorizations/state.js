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
  getUserName: state => {
    return state.user.name;
  }
}

const mutations = {
  setUser(state, obj) {
    state.user = obj
  }
}

export default {
  state,
  getters,
  mutations
}
