<template>
  <div class="chart-statistic-box">
    <div class="chart-txt">
      <div class="chart-txt-top">
        <p><span class="unit">R$</span><span class="number">1540,00</span></p>
        <p class="caption">Vendas da Semana</p>
      </div>
      <table class="tbl-data">
        <tr>
          <td class="price color-purple">R$ 1200.00</td>
          <td>Pedidos</td>
        </tr>
        <tr>
          <td class="price color-yellow">R$ 15</td>
          <td>Investimentos</td>
        </tr>
        <tr>
          <td class="price color-lime">R$ 55</td>
          <td>Outros</td>
        </tr>
      </table>
    </div>
    <div class="chart-container">
      <div class="chart-container-in">
        <div id="chart_div"></div>
        <header class="chart-container-title">Vendas</header>
        <div class="chart-container-x">
          <div class="item"></div>
          <div class="item">ter</div>
          <div class="item">qua</div>
          <div class="item">qui</div>
          <div class="item">sex</div>
          <div class="item">sab</div>
          <div class="item">dom</div>
          <div class="item">seg</div>
          <div class="item"></div>
        </div>
        <div class="chart-container-y">
          <div class="item">{{valor}}</div>
          <div class="item"></div>
          <div class="item">250</div>
          <div class="item"></div>
          <div class="item">200</div>
          <div class="item"></div>
          <div class="item">150</div>
          <div class="item"></div>
          <div class="item">100</div>
          <div class="item"></div>
          <div class="item">50</div>
          <div class="item"></div>
        </div>
      </div>
    </div>
  </div>
  <!--.chart-statistic-box-->

</template>

<script>
export default {
  name: "ChartSaleWeek",
  props: [],
  data() {
    return {
      valor: 30015
    };
  },
  methods: {},
  computed: {}
};
</script>
