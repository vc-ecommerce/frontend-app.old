import Vue from 'vue';
import Vuex from 'vuex';
import auths from './auths/state'
import itens from './itens/state'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auths,
    itens
  }
});
