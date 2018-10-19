    const api = `${this.$urlAPI}/todos/2`
      Vue.axios.get(api).then(response => {
        this.data = response.data
        console.log(this.data)
      }).catch(error => {
        this.errorMsg = 'No user or no location!'
        this.data = []
        console.log(error)
      })




// window._ = require('lodash');
// window.Popper = require('popper.js').default;

// try {
//     window.$ = window.jQuery = require('jquery');

// } catch (e) {}

window.axios = require('axios');

window.Vue = require('vue');

import store from './stores/store';

import SiteHeader from './components/layouts/header/SiteHeader';
import SideMenuDefault from './components/layouts/sidebar/SideMenuDefault';
import SideMenuPanelContainer from './components/layouts/sidebar/SideMenuPanelContainer';

new Vue({
  el: '#site-header',
  store,
  components: {
    'site-header': SiteHeader,
  }
});

new Vue({
  el: '#side-menu-default',
  components: {
    'side-menu-default': SideMenuDefault,
  },
  mounted: function () {

    // http://codeheaven.io/how-to-use-axios-as-your-http-client-pt/

    let r = Math.random().toString(36).substring(7);

    axios({
      method: 'post',
      url: 'http://api.vocecrianca.site/v1/admin/users',
      data: {
        name: 'Criado ' + r,
        email: r + '@gmail.com',
        password: r,
        password_confirmation: r,
      }
    }).then(res => {
      console.log(res);
    }).catch(function (error) {
      console.log(error);
    });

    // axios.put('http://api.vocecrianca.site/v1/admin/users/5bc1127ba2a0930007419a66', {
    //     name: 'Jobs '+ r,
    //     email: r + '@gmail.com'
    // })
    // .then( res => {
    //     console.log(res.data);
    // }).catch(function (error) {
    //     console.log(error);
    // });

    // axios({
    //     method: 'put',
    //     url: 'http://api.vocecrianca.site/v1/admin/users/5bc1127ba2a0930007419a66',
    //     data: {
    //         name: 'Jobs',
    //         email: r + '@gmail.com'
    //     }
    // }).then( res => {
    //     console.log(res);
    // }).catch(function (error) {
    //     console.log(error);
    // });

    // axios.post('http://api.vocecrianca.site/v1/admin/users', {
    //     name: 'William Duarte',
    //     email: 'wsduartes@gmail.com'
    // })
    // .then( res => {
    //     console.log(res.data);
    // }).catch(function (error) {
    //     console.log(error);
    // });

    // axios.delete('http://api.vocecrianca.site/v1/admin/users/5bbe02eca2a093000d15bfd6')
    // .then( res => {
    //     console.log(res.data);
    // }).catch(function (error) {
    //     console.log(error);
    // });

    // axios.get('http://api.vocecrianca.site/v1/admin/users/5bbe02eca2a093000d15bfd7')
    // .then( res => {
    //     console.log(res.data);
    // }).catch(function (error) {
    //     console.log(error);
    // });

  }

});

new Vue({
  el: '#side-menu-panel-container',
  components: {
    'side-menu-panel-container': SideMenuPanelContainer,
  },
  created() {
    this.$http.get(`${this.$urlAPI}admin/users/5bbe02eda2a093000d15bfd8`)
      .then(res => {
        console.log(res.data);
      }).catch(function (error) {
        console.log(error);
      });
  },

});
