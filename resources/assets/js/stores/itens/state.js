const state = {
  item: {}
}

const getters = {
  getItem: state => {
    return state.item;
  }
}

const mutations = {
  setItem(state, obj) {
    state.item = obj
  },
  updateRoleUser(state, roles) {
    state.item.roles = roles
  },
  updatePrivilegeRole(state, privileges) {
    state.item.privileges = privileges
  },
  updateActiveUser(state, active) {
    state.item.active = active
  },

}

export default {
  state,
  getters,
  mutations
}
