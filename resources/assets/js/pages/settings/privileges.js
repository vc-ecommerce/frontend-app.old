require('../../bootstrap')

import store from '../../stores';

import PrivilegeIndex from './pages/privileges/PrivilegeIndex'
import { userIsAuthorizedPage } from "../../helpers/validates";

new Vue({
  el: '#content',
  store,
  components: {
    PrivilegeIndex
  },
  beforeCreate() {
    userIsAuthorizedPage(this.$store.getters.getUserRoles, [
      "ADMIN"
    ]);
  }

});
