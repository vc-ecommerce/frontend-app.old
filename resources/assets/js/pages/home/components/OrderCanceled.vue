<template>
  <Grid :col="6">
    <Article className="statistic-box" color="red">
      <div>
        <div class="number">--</div>
        <div class="caption">
          <div>Pedidos cancelados nos últimos 30 dias</div>
        </div>
      </div>
    </Article>
  </Grid>
</template>

<script>
import Grid from "./../../../components/layouts/Grid";
import Article from "./../../../components/layouts/Article";

export default {
  name: 'OrderCanceled',
  components: {
    Grid,
    Article
  },
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
