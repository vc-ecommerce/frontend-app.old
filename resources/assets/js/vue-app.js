// window._ = require('lodash');
// window.Popper = require('popper.js').default;

// try {
//     window.$ = window.jQuery = require('jquery');

// } catch (e) {}

window.axios = require('axios');

window.Vue = require('vue');

import store from './stores/store';

import SiteHeader from './components/layouts/header/SiteHeader';
import SideMenuDefault from './components/layouts/sidebar/SideMenuDefault';
import SideMenuPanelContainer from './components/layouts/sidebar/SideMenuPanelContainer';

const appOne = new Vue({
  el: '#site-header',
  store,
  components: {
    SiteHeader,
  }
});

const appTwo = new Vue({
  el: '#side-menu-default',
  components: {
    SideMenuDefault,
  }
});

const appThree = new Vue({
  el: '#side-menu-panel-container',
  components: {
    SideMenuPanelContainer,
  }
});
