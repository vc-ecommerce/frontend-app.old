window.Vue = require('vue');

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

//Vue.config.productionTip = false
Vue.prototype.$urlAPI = 'https://jsonplaceholder.typicode.com';
//Vue.prototype.$urlAPI = 'http://api.vocecrianca.site/v1/';

