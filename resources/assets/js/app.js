require('./bootstrap')

import store from './stores';

import SiteHeader from './components/layouts/header/SiteHeader';
import SidebarMenuLeft from './components/layouts/sidebar/SidebarMenuLeft';
import SidebarMenuRight from './components/layouts/sidebar/SidebarMenuRight';

const appOne = new Vue({
  el: '#vue-site-header',
  store,
  components: {
    SiteHeader,
  },
  beforeCreate() {
    let user = this.$store.getters.getUser;
    if (!user) {
      window.location = "/login";
    }
  }
});

const appTwo = new Vue({
  el: '#vue-sidebar-menu-left',
  components: {
    SidebarMenuLeft,
  },
  mounted: function () {
    document.getElementById('vue-sidebar-menu-left').style.display = 'block';
  }
});

const appThree = new Vue({
  el: '#vue-sidebar-menu-right',
  store,
  components: {
    SidebarMenuRight,
  },
  mounted() {
    document.getElementById('content').style.display = 'block';

    // const api = `${this.$urlApi}/admin/users/5bd0fd3ba2a09300115d2486`;
    // Vue.axios
    //   .get(api,
    //     {
    //       headers: {
    //         authorization: "Bearer " + this.$store.getters.getToken
    //       }
    //     })
    //   .then(response => {
    //     console.log(response.data)
    //   })
    //   .catch(error => {
    //     console.log(error.response)
    //   });

  }

});
