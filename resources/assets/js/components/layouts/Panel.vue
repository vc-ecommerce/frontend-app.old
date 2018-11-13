<template>

  <section class="box-typical box-typical-dashboard panel panel-default scrollable">
    <header class="box-typical-header panel-heading">
      <h3 class="panel-title">{{ title }}</h3>
    </header>

    <div :class="classContent">
      <slot></slot>
    </div>
    <!--.box-typical-body-->
  </section>

</template>

<script>
export default {
  name: "Panel",
  props: {
    title: {
      type: String,
      required: true
    },
    classContent: {
      default: 'box-typical-body panel-body'
    }
  }
};
</script>
