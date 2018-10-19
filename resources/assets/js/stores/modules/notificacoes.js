const state = {
  item: {}
}

const getters = {
  getNome: state => {
    return state.item.nome;
  }
}

const actions = {

}

const mutations = {
  addNotificacao: (state, obj) => {
    state.item = obj;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
