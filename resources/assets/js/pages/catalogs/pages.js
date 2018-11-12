require('../../bootstrap')

import store from '../../stores';
import router from './pages/pages-info/router'

import PagesIndex from './pages/pages-info/PagesIndex'
import Breadcrumbs from './pages/pages-info/breadcrumbs/Breadcrumbs'
import { userIsAuthorizedPage } from "../../helpers/validates";

new Vue({
  el: '#content',
  store,
  router,
  components: {
    Breadcrumbs,
    PagesIndex
  },
  beforeCreate() {
    userIsAuthorizedPage(this.$store.getters.getUserRoles, [
      "ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR"
    ]);
  }

});
