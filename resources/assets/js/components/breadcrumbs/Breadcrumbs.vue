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
    let vm = this;
    this.$eventHub.$on("eventBreadcrumbs", function(data) {
      vm.active = data;
    });
  }
};
</script>
