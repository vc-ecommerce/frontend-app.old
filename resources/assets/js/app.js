require('./bootstrap')

import store from './stores';

import SiteHeader from './components/layouts/header/SiteHeader';
import SidebarMenuLeft from './components/layouts/sidebar/SidebarMenuLeft';
import SidebarMenuRight from './components/layouts/sidebar/SidebarMenuRight';

const appOne = new Vue({
  el: '#vue-site-header',
  store,
  data() {
    return {
      showErrorStatus401: false
    }
  },
  components: {
    SiteHeader,
  },
  beforeCreate() {
    let user = this.$store.getters.getUser;
    if (!user) {
      window.location = "/login";
    }
  },
  created() {
    const parent = this;
    this.$eventHub.$on('eventError', function (obj) {
      parent.showError(obj)
    });
  },
  methods: {
    showError(obj) {

      if (obj.data.status === 401) {
        if(obj.data.statusText==="Unauthorized") {

          swal({
            title: "Atenção!!!",
            text: "Acesso não autorizado ou negado pelo servidor.",
            type: "error",
            showCancelButton: false,
            cancelButtonClass: "btn-default",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Fazer login",
            closeOnConfirm: false
          },
          function(){
            sessionStorage.clear();
            window.location.replace("/login");
          });

        }
      }
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
  }

});
