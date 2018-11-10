require('../../bootstrap')

import store from '../../stores';

import UserIndex from './pages/users/UserIndex'
import { userIsAuthorizedPage } from "./../../helpers/validates";

new Vue({
  el: '#content',
  store,
  components: {
    UserIndex
  },
  beforeCreate() {
    userIsAuthorizedPage(this.$store.getters.getUserRoles, [
      "ADMIN"
    ]);
  }

});
