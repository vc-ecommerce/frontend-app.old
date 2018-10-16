<template>
  <table :class="className">
    <thead>
      <slot name="thead"></slot>
    </thead>
    <tbody>
      <slot name="tbody"></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    className: {
      default: "tbl-typical"
    }
  }
};
</script>
