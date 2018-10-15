<template>
  <div :class="defineCol">
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    col: {
      type: Number,
      default: 12
    }
  },
  computed: {
    defineCol() {
      return `col-sm-${this.col}`;
    }
  }
};
</script>
