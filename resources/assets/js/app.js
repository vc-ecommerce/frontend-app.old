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
  }
});

const appThree = new Vue({
  el: '#vue-sidebar-menu-right',
  components: {
    SidebarMenuRight,
  },
  created() {

    this.$http.get(`${this.$urlAPI}admin/users/5bbe02eda2a093000d15bfd8`)
      .then(res => {
        console.log(res.data);
      }).catch(function (error) {
        console.log(error);
      });
  },
});
