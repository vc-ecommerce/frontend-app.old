require('../../bootstrap')

import store from '../../stores';
import AccountIndex from './components/AccountIndex'

const app = new Vue({
  el: '#content',
  store,
  components: {
    AccountIndex
  }
});
