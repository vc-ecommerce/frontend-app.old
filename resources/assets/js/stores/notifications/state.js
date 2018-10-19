//https://alligator.io/vuejs/vuex-dynamic-modules/

export default {
  state: [],
  mutations: {
    addNotification(state, notification) {
      state.push(notification);
    }
  }
};
