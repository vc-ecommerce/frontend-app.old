//https://codeburst.io/vuex-store-d888de10d499

import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        item: {}
    },
    mutations: {
        setItem(state, obj) {
            state.item = obj;
        }
    }

});