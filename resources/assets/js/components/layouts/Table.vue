<template>
  <table :class="className">
    <slot name="tr-th"></slot>
    <slot name="tr-td"></slot>
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
