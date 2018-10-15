<template>
  <div class="site-header-search-container">
    <form class="site-header-search closed">
      <input type="text" placeholder="Pesquisa rápida"/>
      <button type="submit">
        <span class="font-icon-search"></span>
      </button>
      <div class="overlay"></div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormSearch",
  props: [],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style scoped>
</style>
