<template>
  <span>
    <menu-sales></menu-sales>
    <menu-config></menu-config>
    <menu-social-media></menu-social-media>
    <menu-project></menu-project>
    <menu-form-builder></menu-form-builder>
    <menu-add></menu-add>
    <menu-help></menu-help>
    <menu-up-plan></menu-up-plan>
  </span>
</template>

<script>
import MenuSales from "./MenuSales";
import MenuUser from "./MenuUser";
import MenuHelp from "./MenuHelp";
import MenuAdd from "./MenuAdd";
import MenuProject from "./MenuProject";
import MenuFormBuilder from "./MenuFormBuilder";
import MenuSocialMedia from "./MenuSocialMedia";
import MenuConfig from "./MenuConfig";
import MenuUpPlan from "./MenuUpPlan";

export default {
  name: "MenuHeader",
  components: {
    MenuSales,
    MenuUser,
    MenuAdd,
    MenuHelp,
    MenuProject,
    MenuFormBuilder,
    MenuSocialMedia,
    MenuConfig,
    MenuUpPlan
  }
};
</script>
