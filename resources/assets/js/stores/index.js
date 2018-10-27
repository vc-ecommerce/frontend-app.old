import Vue from 'vue';
import Vuex from 'vuex';
import authorizations from './authorizations/state'
import itens from './itens/state'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authorizations,
    itens
  }
});
