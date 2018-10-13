// window._ = require('lodash');
// window.Popper = require('popper.js').default;

// try {
//     window.$ = window.jQuery = require('jquery');

// } catch (e) {}

window.axios = require('axios');

window.Vue = require('vue');

import store from './stores/store';

import SiteHeader from './shareds/header/SiteHeader';
import SideMenuDefault from './shareds/sidebar/SideMenuDefault';
import SideMenuPanelContainer from './shareds/sidebar/SideMenuPanelContainer';

new Vue({
  el: '#site-header',
  store,
  components: {
    SiteHeader,
  }
});

new Vue({
  el: '#side-menu-default',
  components: {
    SideMenuDefault,
  }
});

new Vue({
  el: '#side-menu-panel-container',
  components: {
    SideMenuPanelContainer,
  }
});
