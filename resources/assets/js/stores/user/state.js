const state = {
  user: {}
}

const getters = {
  getUser: state => {
    return state.user;
  },
  getUserRoles: state => {
    return state.user.roles;
  },
  getUserPrivileges: state => {
    return state.user.privileges;
  },
  getUserActive: state => {
    return state.user.active;
  }
}

const mutations = {
  setUserRoles(state, roles) {
    state.user.roles = roles
  },
  setUserPrivileges(state, privileges) {
    state.user.privileges = privileges
  },
  setUserActive(state, active) {
    state.user.active = active
  }
}

export default {
  state,
  getters,
  mutations
}
