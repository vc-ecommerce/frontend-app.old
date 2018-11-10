require('../../bootstrap')

import store from '../../stores';

import AttributeIndex from './components/attributes/AttributeIndex'
import { userIsAuthorizedPage } from "./../../helpers/validates";

new Vue({
  el: '#content',
  store,
  components: {
    AttributeIndex
  },
  beforeCreate() {
    userIsAuthorizedPage(this.$store.getters.getUserRoles, [
      "ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR"
    ]);
  }

});
