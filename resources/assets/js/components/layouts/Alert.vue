<template>
  <div :class="defineCol">
    <div :class="className" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    col: {
      type: Number,
      default: 12
    },
    className: {
      type: String,
      required: true
    },
  },
  computed: {
    defineCol() {
      return `col-lg-${this.col}`;
    }
  }
};
</script>
