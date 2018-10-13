<template>

  <statistic color="green" :sizeColSM="6">
    <div>
      <div class="number">--</div>
      <div class="caption">
        <div>Nenhum pedido aprovado nos últimos 30 dias</div>
      </div>
    </div>
  </statistic>

</template>

<script>

  import Statistic from './../../../../../shareds/StatisticBoxHelper'

  export default {
    components: {
      'statistic': Statistic
    },
    props: [],
    mounted() {

    },
    data() {
      return {}
    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>

</style>
