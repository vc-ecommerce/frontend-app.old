require('../../bootstrap')

import store from '../../stores';

import UserList from './components/users/UserList'

const app = new Vue({
  el: '#content',
  store,
  components: {
    UserList
  }
});
