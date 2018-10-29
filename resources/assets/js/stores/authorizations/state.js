//https://alligator.io/vuejs/vuex-dynamic-modules/

const state = {
  token: sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : null,
  user:  sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
}

const getters = {

  getToken: state => {
    return state.token;
  },
  getUser: state => {
    return state.user;
  },
  getUserName: state => {
    return state.user.name;
  },
  getRoles: state => {

    let roles = state.user.roles

    let newRoles = roles.filter(function (role) {
      delete role['_id'];
      delete role['default'];
      delete role['privileges'];
      delete role['updated_at'];
      delete role['created_at'];

      return role

    });

    return newRoles

  }
}

const mutations = {

  setUser(state, obj) {
    state.user = obj
  }

}

export default {
  state,
  getters,
  mutations
}
