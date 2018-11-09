<template>
  <header class="site-header">
    <div class="container-fluid">

      <Logo />

      <button id="show-hide-sidebar-toggle" class="show-hide-sidebar">
        <span>toggle menu</span>
      </button>
      <button class="hamburger hamburger--htla">
        <span>toggle menu</span>
      </button>

      <div class="site-header-content">
        <div class="site-header-content-in">
          <div class="site-header-shown">

            <Notification />

            <MenuTopUser :urlLogout="urllogout" :urlAccounts="urlaccounts"/>

            <button type="button" class="burger-right">
              <i class="font-icon-menu-addl"></i>
            </button>
          </div>

          <!--.site-header-shown-->
          <div class="mobile-menu-right-overlay"></div>
          <div class="site-header-collapsed">
            <div class="site-header-collapsed-in">

              <FormSearch />

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
import MenuTopUser from "./MenuTopUser";
import Logo from "./Logo";
import FormSearch from "./FormSearch";

export default {
  name: 'SiteHeader',
  props: ['urllogout', 'urlaccounts'],
  data() {
    return {

    }
  },
  components: {
    Notification,
    Logo,
    FormSearch,
    MenuTopUser
  }
};
</script>

