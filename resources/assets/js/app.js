require('./bootstrap')

import store from './stores';

import SiteHeader from './components/layouts/header/SiteHeader';
import SidebarMenuLeft from './components/layouts/sidebar/SidebarMenuLeft';
import SidebarMenuRight from './components/layouts/sidebar/SidebarMenuRight';

const appOne = new Vue({
  el: '#vue-site-header',
  store,
  components: {
    SiteHeader,
  },
  beforeCreate() {
    let user = this.$store.getters.getUser;
    if (!user) {
      window.location = "/login";
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
  components: {
    SidebarMenuRight,
  }
});
