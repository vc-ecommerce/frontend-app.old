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
    components: {
      "menu-sales": MenuSales,
      "menu-user": MenuUser,
      "menu-add": MenuAdd,
      "menu-help": MenuHelp,
      "menu-project": MenuProject,
      "menu-form-builder": MenuFormBuilder,
      "menu-social-media": MenuSocialMedia,
      "menu-config": MenuConfig,
      "menu-up-plan": MenuUpPlan
    }
  };
</script>
