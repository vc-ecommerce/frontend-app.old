require('./bootstrap')

import store from './stores';

import SiteHeader from './components/layouts/header/SiteHeader';
import SidebarMenuLeft from './components/layouts/sidebar/SidebarMenuLeft';
import SidebarMenuRight from './components/layouts/sidebar/SidebarMenuRight';
import { userIsAuthorized, isRoleUser } from "./helpers/validates";
import { swalErrorUnauthorized } from "./helpers/tools";

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
      "ADMIN",
      "STAFF_AUDITOR",
      "STAFF_FINANCE",
      "STAFF_COMMERCIAL",
      "STAFF_SUPPORT",
      "STAFF_SALE",
      "STAFF_EDITOR",
      "STAFF_EXPEDITION",
    ]);

  },
  created() {
    const parent = this;
    this.$eventHub.$on('eventError', function (obj) {
      parent.showError(obj)
    });
    this.isTokenEquals();
  },
  methods: {
    getCsrfToken() {
      let token = document.head.querySelector('meta[name="csrf-token"]');
      return token.content;
    },
    isTokenEquals() {
      let equals = this.getCsrfToken() === sessionStorage.getItem("csrfToken");
      if (!equals) {
        userIsAuthorized({});
      }
    },
    showError(obj) {
      swalErrorUnauthorized(obj);
    }
  }
});

const appTwo = new Vue({
  el: '#vue-sidebar-menu-left',
  store,
  data() {
    return{
      isAdmin: false
    }
  },
  components: {
    SidebarMenuLeft,
  },
  created(){

    this.isRoleAdmin = isRoleUser(this.$store.getters.getUserRoles, [
      "ADMIN"
    ]);

    this.isRoleFinance = isRoleUser(this.$store.getters.getUserRoles, [
      "STAFF_FINANCE"
    ]);

    this.isRoleEditor = isRoleUser(this.$store.getters.getUserRoles, [
      "STAFF_EDITOR"
    ]);

    this.isRoleExpedition = isRoleUser(this.$store.getters.getUserRoles, [
      "STAFF_EXPEDITION"
    ]);

  },

});

const appThree = new Vue({
  el: '#vue-sidebar-menu-right',
  store,
  components: {
    SidebarMenuRight,
  },
  mounted() {
    document.getElementById('vue-sidebar-menu-left').style.display = 'block';
    document.getElementById('content').style.display = 'block';
  }

});
