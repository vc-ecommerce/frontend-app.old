require('../../bootstrap')

import store from '../../stores';
import router from './pages/pages-info/router'

import PageIndex from './pages/pages-info/PageIndex'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { userIsAuthorizedPage } from "../../helpers/validates";

new Vue({
  el: '#content',
  store,
  router,
  components: {
    Breadcrumbs,
    PageIndex
  },
  beforeCreate() {
    userIsAuthorizedPage(this.$store.getters.getUserRoles, [
      "ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR"
    ]);
  }

});
