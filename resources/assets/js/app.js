require('./bootstrap')

import store from './stores';

import SiteHeader from './components/layouts/header/SiteHeader';
import SidebarMenuLeft from './components/layouts/sidebar/SidebarMenuLeft';
import SidebarMenuRight from './components/layouts/sidebar/SidebarMenuRight';
import { userIsAuthorized } from "./helpers/validates";
import { swalError } from "./helpers/tools";

const appOne = new Vue({
  el: '#vue-site-header',
  store,
  data() {
    return {
      showErrorStatus401: false
    }
  },
  components: {
    SiteHeader,
  },
  beforeCreate() {
    let user = this.$store.getters.getUser;
    if (!user) {
      window.location = "/login";
    }

    userIsAuthorized(this.$store.getters.getUserRoles, [
      "ADMINs",
      "STAFF_FINANCE",
      "STAFF_EDITOR",
      "STAFF_EXPEDITION"
    ]);

  },
  created() {
    const parent = this;
    this.$eventHub.$on('eventError', function (obj) {
      parent.showError(obj)
    });
  },
  methods: {
    showError(obj) {
      swalError(obj);
    }
  }
});

const appTwo = new Vue({
  el: '#vue-sidebar-menu-left',
  components: {
    SidebarMenuLeft,
  },
  mounted: function () {
    document.getElementById('vue-sidebar-menu-left').style.display = 'block';
  }
});

const appThree = new Vue({
  el: '#vue-sidebar-menu-right',
  store,
  components: {
    SidebarMenuRight,
  },
  mounted() {
    document.getElementById('content').style.display = 'block';
  }

});
