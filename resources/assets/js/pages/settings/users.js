require('../../bootstrap')

import store from '../../stores';

import UserIndex from './components/users/UserIndex'

const app = new Vue({
  el: '#content',
  store,
  components: {
    UserIndex
  }
});
