window.Vue = require('vue');

import SiteHeader from './shareds/header/SiteHeader';
import SideMenuDefault from './shareds/sidebar/SideMenuDefault';
import SideMenuPanelContainer from './shareds/sidebar/SideMenuPanelContainer';

new Vue({
    el: '#site-header',
    components: {
    	'site-header': SiteHeader,
    }
});

new Vue({
    el: '#side-menu-default',
    components: {
        'side-menu-default': SideMenuDefault,
    }
});

new Vue({
    el: '#side-menu-panel-container',
    components: {
        'side-menu-panel-container': SideMenuPanelContainer,
    }
});
