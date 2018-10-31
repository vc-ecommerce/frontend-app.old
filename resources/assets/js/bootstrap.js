window.Vue = require('vue');

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

//Vue.config.productionTip = false
Vue.prototype.$urlApi = 'http://api.vocecrianca.site/v1';

//https://jsoneditoronline.org/
