<template>
  <div>
    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Privilégio</h3>
            <h3 v-else>{{ total }} Privilégios</h3>
          </div>

        </div>
      </header>
      <div class="box-typical-body">
        <div class="table-responsive">
          <Table elementId="table-edit" className="table table-hover">
            <template slot="thead">
              <tr>
                <th width="200" >Privilégios</th>
                <th>Name</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="(privilege, index) in privileges.data" :key="index">
                <td class="tabledit-view-mode">
                  {{ privilege.description }}
                  <br>
                  <small>
                  </small>
                </td>
                <td class="tabledit-view-mode">
                  <span class="label label-info">{{ privilege.name }}</span>
                </td>

              </tr>
            </template>
          </Table>
        </div>
      </div>
    </section>

  </div>
</template>
<script>

import Table from "./../../../../components/layouts/Table";
import { cleanRole } from "./../../../../helpers/tools";

export default {
  name: "PrivilegeIndex",
  components: {
    Table,
  },
  props: [],
  data() {
    return {
      total: 0,
      privileges: []
    };
  },
  mounted() {
    this.getPrivileges();
    const parent = this;
    this.$eventHub.$on("totalUser", function(t) {
      parent.total = t;
    });
  },
  methods: {
    getPrivileges() {
      const api = `${this.$urlApi}/admin/privileges`;
      Vue.axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "User-ID": this.$store.getters.getUserId
          }
        })
        .then(response => {
          this.privileges = response.data;
          this.total = response.data.total;
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
        });
    }
  }
};
</script>
