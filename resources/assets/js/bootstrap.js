const axios = require('axios');

window.Vue = require('vue');

//Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$urlAPI = 'http://api.vocecrianca.site/v1/';
