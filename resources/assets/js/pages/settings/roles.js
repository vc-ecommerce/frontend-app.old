require('../../bootstrap')

import store from '../../stores';

//import RoleIndex from './components/roles/RoleIndex'
import { userIsAuthorizedPage } from "../../helpers/validates";

new Vue({
  el: '#content',
  store,
  components: {
    //RoleIndex
  },
  beforeCreate() {
    userIsAuthorizedPage(this.$store.getters.getUserRoles, [
      "ADMIN"
    ]);
  }

});
