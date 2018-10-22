require('../../bootstrap')

import store from '../../stores';

import LoginUser from './components/LoginUser'
import ResetPassword from './components/ResetPassword'
import ForgotPassword from './components/ForgotPassword'

const app = new Vue({
  el: '#app',
  store,
  components: {
    LoginUser,
    ResetPassword,
    ForgotPassword
  }
});
