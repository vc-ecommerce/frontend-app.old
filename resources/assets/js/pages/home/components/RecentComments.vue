<template>
  <Panel title="Comentários Recentes">
    <Table>

      <template slot="thead">
        <tr>
          <th v-for="header in headers" :key="header.name" :align="header.position || ''">
            <div>{{ header.name }}</div>
          </th>
        </tr>
      </template>

      <template slot="tbody">
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
      </template>

    </Table>
  </Panel>
</template>

<script>
import Panel from "./../../../components/layouts/Panel";
import Table from "./../../../components/layouts/Table";

export default {
  name: 'RecentComments',
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
      { name: "Assunto" },
      { name: "Departamento", position: "center" },
      { name: "Data", position: "center" }
    ];
  }
};
</script>
