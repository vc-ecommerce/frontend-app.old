import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


import notificacoes from './modules/notificacoes'


export default new Vuex.Store({

  modules: {
    notificacoes
  }

});
