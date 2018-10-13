<template>
  <box-panel title="Comentários Recentes">
    <table class="tbl-typical">
      <tr>
        <th>
          <div>Status</div>
        </th>
        <th>
          <div>Subject</div>
        </th>
        <th align="center">
          <div>Department</div>
        </th>
        <th align="center">
          <div>Date</div>
        </th>
      </tr>
      <tr>
        <td>
          <span class="label label-success">Open</span>
        </td>
        <td>Website down for one week</td>
        <td align="center">Support</td>
        <td nowrap align="center"><span class="semibold">Today</span> 8:30</td>
      </tr>
      <tr>
        <td>
          <span class="label label-success">Open</span>
        </td>
        <td>Restoring default settings</td>
        <td align="center">Support</td>
        <td nowrap align="center"><span class="semibold">Today</span> 16:30</td>
      </tr>
      <tr>
        <td>
          <span class="label label-warning">Progress</span>
        </td>
        <td>Loosing control on server</td>
        <td align="center">Support</td>
        <td nowrap align="center"><span class="semibold">Yesterday</span></td>
      </tr>
      <tr>
        <td>
          <span class="label label-danger">Closed</span>
        </td>
        <td>Authorizations keys</td>
        <td align="center">Support</td>
        <td nowrap align="center">23th May</td>
      </tr>
    </table>
  </box-panel>
</template>

<script>
  import BoxTypical from './../../../../shareds/BoxTypicalPanelHelper';

  export default {
    components: {
      'box-panel': BoxTypical
    },
    props: [],
    mounted() {

      $(document).ready(function () {

        $('.panel').each(function () {
          try {
            $(this).lobiPanel({
              sortable: true
            }).on('dragged.lobiPanel', function (ev, lobiPanel) {
              $('.dahsboard-column').matchHeight();
            });
          } catch (err) {
          }
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

</style>
