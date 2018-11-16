const state = {
  token: sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : null,
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
}

const getters = {
  getAuthToken: state => {
    return state.token;
  },
  getAuth: state => {
    return state.user;
  },
  getAuthId: state => {
    return state.user._id;
  },
  getAuthRoles: state => {
    return state.user.roles;
  }
}

const mutations = {
  setAuth(state, obj) {
    state.user = obj
  }
}

export default {
  state,
  getters,
  mutations
}
