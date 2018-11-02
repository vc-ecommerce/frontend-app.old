
window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.jQuery = require('jquery');
    //require('./parallax-header.js');
} catch (e) {}



window.Vue = require('vue');

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

Vue.prototype.$eventHub = new Vue();

//Vue.config.productionTip = false
Vue.prototype.$urlApi = 'http://api.vocecrianca.site/v1';

//https://jsoneditoronline.org/
