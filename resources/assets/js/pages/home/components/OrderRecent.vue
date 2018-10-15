<template>
  <Panel title="Pedidos Recentes">
    <Table>

      <template slot="tr-th">
        <tr>
          <th v-for="header in headers" :key="header.name" :align="header.position || ''">
            <div>{{ header.name }}</div>
          </th>
        </tr>
      </template>

      <template slot="tr-td">

        <tr>
          <td>
            <span class="label label-primary">Paid</span>
            <span class="label label-success">Active</span>
          </td>
          <td>John Doe</td>
          <td align="center">3435362</td>
          <td class="color-blue-grey" nowrap align="center"><span class="semibold">Today</span> 8:30</td>
        </tr>
        <tr>
          <td>
            <span class="label label-primary">Paid</span>
            <span class="label label-success">Active</span>
          </td>
          <td>Thomas Bayer</td>
          <td align="center">3435362</td>
          <td class="color-blue-grey" nowrap align="center"><span class="semibold">Today</span> 16:30</td>
        </tr>
        <tr>
          <td>
            <span class="label label-primary">Paid</span>
            <span class="label label-default">Inactive</span>
          </td>
          <td>Nicolas Karabat</td>
          <td align="center">3435362</td>
          <td class="color-blue-grey" nowrap align="center"><span class="semibold">Yesterday</span></td>
        </tr>
        <tr>
          <td>
            <span class="label label-default">Unpaid</span>
            <span class="label label-default">Inactive</span>
          </td>
          <td>Alexandre Pome</td>
          <td align="center">3435362</td>
          <td class="color-blue-grey" nowrap align="center">23th May</td>
        </tr>
        <tr>
          <td>
            <span class="label label-primary">Paid</span>
            <span class="label label-success">Active</span>
          </td>
          <td>John Doe</td>
          <td align="center">3435362</td>
          <td class="color-blue-grey" nowrap align="center"><span class="semibold">Today</span> 8:30</td>
        </tr>
        <tr>
          <td>
            <span class="label label-primary">Paid</span>
            <span class="label label-success">Active</span>
          </td>
          <td>Thomas Bayer</td>
          <td align="center">3435362</td>
          <td class="color-blue-grey" nowrap align="center"><span class="semibold">Today</span> 16:30</td>
        </tr>
        <tr>
          <td>
            <span class="label label-primary">Paid</span>
            <span class="label label-default">Inactive</span>
          </td>
          <td>Nicolas Karabat</td>
          <td align="center">3435362</td>
          <td class="color-blue-grey" nowrap align="center"><span class="semibold">Yesterday</span></td>
        </tr>
        <tr>
          <td>
            <span class="label label-default">Unpaid</span>
            <span class="label label-default">Inactive</span>
          </td>
          <td>Alexandre Pome</td>
          <td align="center">3435362</td>
          <td class="color-blue-grey" nowrap align="center">23th May</td>
        </tr>

      </template>
    </Table>
  </Panel>
</template>


<script>
import Panel from "./../../../components/layouts/Panel";
import Table from "./../../../components/layouts/Table";

export default {
  name: 'OrderRecent',
  components: {
    Panel,
    Table
  },
  props: [],
  data() {
    return {
      headers: []
    };
  },
  mounted() {
    this.headers = [
      { name: "Status" },
      { name: "Clientes" },
      { name: "Pedidos", position: "center" },
      { name: "Data", position: "center" }
    ];
  }
};
</script>
