require('../../bootstrap')

import store from '../../stores';

import LoginUser from './components/LoginUser'

const app = new Vue({
  el: '#app',
  store,
  components: {
    LoginUser
  }
});
