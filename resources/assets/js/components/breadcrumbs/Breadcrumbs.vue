<template>
  <li class="active">{{ active }}</li>
</template>
<script>
export default {
  name: "Breadcrumbs",
  components: {},
  props: [],
  data() {
    return {
      active: "Listar"
    };
  },
  created() {
    let parent = this;
    this.$eventHub.$on("eventBreadcrumbs", function(data) {
      parent.active = data;
    });
  }
};
</script>
