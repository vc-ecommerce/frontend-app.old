<template>
  <div>
    <div class="mobile-menu-left-overlay"></div>
    <NavMenu>
      <slot></slot>
    </NavMenu>
    <!--.side-menu-->
  </div>
</template>
<script>
import NavMenu from "./../sidebar/NavMenu";

export default {
  name: "SidebarMenuLeft",
  components: {
    NavMenu
  }
};
</script>
