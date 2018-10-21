//https://alligator.io/vuejs/vuex-dynamic-modules/

import { urlApi } from './../../urlAPI';

const state = {
  data: '',
  email: '',
  errorMsg: ''
}

const getters = {
  getTitle: state => {
    return state.data.title;
  }
}

const actions = {

}

const mutations = {

  makeLogin(state, obj) {

    const api = `${urlApi}/todos/2`

    Vue.axios.get(api).then(response => {

      return response.data;
      //state.data = response.data
      //console.log(state.data)
    }).catch(error => {
      state.errorMsg = 'No user or no location!'
      state.data = []
      console.log(error)
    })

    // console.log(urlApi);
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
