<template>

  <div class="chart-statistic-box">
    <div class="chart-txt">
      <div class="chart-txt-top">
        <p><span class="unit">$</span><span class="number">1540</span></p>
        <p class="caption">Vendas da Semana</p>
      </div>
      <table class="tbl-data">
        <tr>
          <td class="price color-purple">120$</td>
          <td>Orders</td>
        </tr>
        <tr>
          <td class="price color-yellow">15$</td>
          <td>Investments</td>
        </tr>
        <tr>
          <td class="price color-lime">55$</td>
          <td>Others</td>
        </tr>
      </table>
    </div>
    <div class="chart-container">
      <div class="chart-container-in">
        <div id="chart_div"></div>
        <header class="chart-container-title">Income</header>
        <div class="chart-container-x">
          <div class="item"></div>
          <div class="item">tue</div>
          <div class="item">wed</div>
          <div class="item">thu</div>
          <div class="item">fri</div>
          <div class="item">sat</div>
          <div class="item">sun</div>
          <div class="item">mon</div>
          <div class="item"></div>
        </div>
        <div class="chart-container-y">
          <div class="item">300</div>
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
    name: 'sale-week',
    props: [],
    mounted() {

      $(document).ready(function () {

        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
          var dataTable = new google.visualization.DataTable();
          dataTable.addColumn('string', 'Day');
          dataTable.addColumn('number', 'Values');
          // A column for custom tooltip content
          dataTable.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
          dataTable.addRows([
            ['MON', 130, ' '],
            ['TUE', 130, '130'],
            ['WED', 180, '180'],
            ['THU', 175, '175'],
            ['FRI', 200, '200'],
            ['SAT', 170, '170'],
            ['SUN', 250, '250'],
            ['MON', 220, '220'],
            ['TUE', 220, ' ']
          ]);

          var options = {
            height: 314,
            legend: 'none',
            areaOpacity: 0.18,
            axisTitlesPosition: 'out',
            hAxis: {
              title: '',
              textStyle: {
                color: '#fff',
                fontName: 'Proxima Nova',
                fontSize: 11,
                bold: true,
                italic: false
              },
              textPosition: 'out'
            },
            vAxis: {
              minValue: 0,
              textPosition: 'out',
              textStyle: {
                color: '#fff',
                fontName: 'Proxima Nova',
                fontSize: 11,
                bold: true,
                italic: false
              },
              baselineColor: '#16b4fc',
              ticks: [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350],
              gridlines: {
                color: '#1ba0fc',
                count: 15
              }
            },
            lineWidth: 2,
            colors: ['#fff'],
            curveType: 'function',
            pointSize: 5,
            pointShapeType: 'circle',
            pointFillColor: '#f00',
            backgroundColor: {
              fill: '#008ffb',
              strokeWidth: 0,
            },
            chartArea: {
              left: 0,
              top: 0,
              width: '100%',
              height: '100%'
            },
            fontSize: 11,
            fontName: 'Proxima Nova',
            tooltip: {
              trigger: 'selection',
              isHtml: true
            }
          };

          var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
          chart.draw(dataTable, options);
        }

        $(window).resize(function () {
          drawChart();
          setTimeout(function () {
          }, 1000);
        });
      });

    },
    data() {
      return {}
    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>
  .sale-week {

  }
</style>
