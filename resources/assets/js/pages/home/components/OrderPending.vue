<template>
  <Grid :col="6">
    <Article className="statistic-box" color="green">
      <div>
        <div class="number">--</div>
        <div class="caption">
          <div>Nenhum pedido pendente nos últimos 30 dias.</div>
        </div>
      </div>
    </Article>
  </Grid>
</template>

<script>
import Grid from "./../../../components/layouts/Grid";
import Article from "./../../../components/layouts/Article";

export default {
  name: 'OrderPending',
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

