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
  setItemRole(state, roles) {
    state.item.roles = roles
  },
  setItemPrivilege(state, privileges) {
    state.item.privileges = privileges
  },
  setItemActive(state, active) {
    state.item.active = active
  }
}

export default {
  state,
  getters,
  mutations
}
