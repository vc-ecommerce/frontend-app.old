require('../../bootstrap')

import store from '../../stores';
import router from './pages/attributes/router'

import AttributeIndex from './pages/attributes/AttributeIndex'
import Breadcrumbs from './pages/attributes/breadcrumbs/Breadcrumbs'
import { userIsAuthorizedPage } from "./../../helpers/validates";

new Vue({
  el: '#content',
  store,
  router,
  components: {
    Breadcrumbs,
    AttributeIndex
  },
  beforeCreate() {
    userIsAuthorizedPage(this.$store.getters.getUserRoles, [
      "ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR"
    ]);
  }

});
