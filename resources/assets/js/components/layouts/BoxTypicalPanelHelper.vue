<template>

  <section class="box-typical box-typical-dashboard panel panel-default scrollable">
    <header class="box-typical-header panel-heading">
      <h3 class="panel-title">{{ title }}</h3>
    </header>

    <div class="box-typical-body panel-body">
      <slot></slot>
    </div>
    <!--.box-typical-body-->
  </section>

</template>

<script>

  export default {
    name: 'BoxTypicalPanelHelper',
    props: ["title"],
    mounted() {

    },
    data() {
      return {

      };
    },
    methods: {},
    computed: {}
  };
</script>

<style scoped>
</style>
