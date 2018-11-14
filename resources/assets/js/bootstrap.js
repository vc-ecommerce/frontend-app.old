window.Vue = require('vue');

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

Vue.prototype.$eventHub = new Vue();

//Vue.config.productionTip = false
Vue.prototype.$urlApi = 'http://api.vocecrianca.site/v1';
Vue.prototype.$urlSite = 'https://vocecrianca.com.br';

//https://jsoneditoronline.org/
