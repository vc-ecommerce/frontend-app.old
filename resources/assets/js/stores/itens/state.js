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
  }
}

export default {
  state,
  getters,
  mutations
}
