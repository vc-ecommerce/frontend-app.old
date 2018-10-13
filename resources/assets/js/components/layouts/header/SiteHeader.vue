<template>
  <header class="site-header">
    <div class="container-fluid">

      <logo-header></logo-header>

      <button id="show-hide-sidebar-toggle" class="show-hide-sidebar">
        <span>toggle menu</span>
      </button>
      <button class="hamburger hamburger--htla">
        <span>toggle menu</span>
      </button>

      <div class="site-header-content">
        <div class="site-header-content-in">
          <div class="site-header-shown">

            <notification-header></notification-header>
            <menu-user :profile="profile"></menu-user>

            <button type="button" class="burger-right">
              <i class="font-icon-menu-addl"></i>
            </button>
          </div>

          <!--.site-header-shown-->
          <div class="mobile-menu-right-overlay"></div>
          <div class="site-header-collapsed">
            <div class="site-header-collapsed-in">

              <menu-header></menu-header>
              <form-search></form-search>

            </div>
            <!--.site-header-collapsed-in-->
          </div>
          <!--.site-header-collapsed-->
        </div>
        <!--site-header-content-in-->
      </div>
      <!--.site-header-content-->
    </div>
    <!--.container-fluid-->
  </header>
</template>
<script>
  import Notification from "./notification/Notification";
  import Menu from "./menu/Menu";
  import MenuUser from "./menu/MenuUser";
  import Logo from "./logo/Logo";
  import FormSearch from "./form/FormSearch";

  export default {
    data: function () {
      return {
        profile: "Meu Perfil"
      };
    },
    components: {
      "notification-header": Notification,
      "menu-header": Menu,
      "logo-header": Logo,
      "form-search": FormSearch,
      "menu-user": MenuUser
    }
  };
</script>

