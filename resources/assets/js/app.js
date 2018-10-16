require('./bootstrap')

import store from './stores/store';

import SiteHeader from './components/layouts/header/SiteHeader';
import SidebarMenuLeft from './components/layouts/sidebar/SidebarMenuLeft';
import SidebarMenuRight from './components/layouts/sidebar/SidebarMenuRight';

const appOne = new Vue({
  el: '#vue-site-header',
  store,
  components: {
    SiteHeader,
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
