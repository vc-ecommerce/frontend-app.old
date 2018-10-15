axios = require('axios');

window.Vue = require('vue');



// //Vue.config.productionTip = false
// Vue.prototype.$http = axios;
// Vue.prototype.$urlAPI = 'http://api.vocecrianca.site/';


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
  }
});
