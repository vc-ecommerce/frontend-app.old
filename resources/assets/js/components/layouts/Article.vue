<template>
  <article :class="defineClass">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "Article",
  props: {
    className: {
      type: String,
      required: true
    },
    color: {
      type: String
    }
  },
  computed: {
    defineClass() {
      return this.className + " " + this.color || "";
    }
  }
};
</script>
