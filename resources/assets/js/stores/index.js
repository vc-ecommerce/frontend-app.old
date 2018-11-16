import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth/state'
import user from './user/state'
import item from './item/state'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    item
  }
});
