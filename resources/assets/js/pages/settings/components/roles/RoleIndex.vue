<template>
  <div>
    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Função</h3>
            <h3 v-else>{{ total }} Funções</h3>
          </div>
          <div class="tbl-cell tbl-cell-action-bordered">
            <CreateRole @reload="getRoles()" :dataPrivilegies="privileges" />
          </div>
        </div>
      </header>
      <div class="box-typical-body">
        <div class="table-responsive">
          <Table elementId="table-edit" className="table table-hover">
            <template slot="thead">
              <tr>
                <th width="200" >Funções</th>
                <th>Name</th>
                <th>Privilégios</th>
                <th width="300" class="tabledit-toolbar-column">Editar</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="(role, index) in roles.data" :key="index">
                <td class="tabledit-view-mode">
                  {{ role.description }}
                  <br>
                  <small>
                  </small>
                </td>
                <td class="tabledit-view-mode">
                  <span class="label label-info">{{ role.name }}</span>
                </td>
                <td>
                  <span v-for="(privilege) in role.privileges" :key="privilege._id" class="label label-success" style="margin:2px">{{ privilege.description }}</span>
                </td>

                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                    <div class="btn-group btn-group-sm" style="float: none;">

                      <EditRole v-if="!role.default" :dataPrivilegies="privileges" :dataRoles="roles" :dataItem="role" />

                      <RemoveRole v-if="!role.default" :dataRoles="roles" :dataItem="role"/>

                    </div>

                  </div>
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
import CreateRole from "./components/CreateRole";
import EditRole from "./components/EditRole";
import RemoveRole from "./components/RemoveRole";
import Table from "./../../../../components/layouts/Table";

export default {
  name: "UserIndex",
  components: {
    CreateRole,
    EditRole,
    RemoveRole,
    Table
  },
  props: [],
  data() {
    return {
      total: 0,
      roles: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      privileges: [],
    };
  },
  mounted() {
    this.getRoles();
    this.getPrivileges();
    const parent = this;
    this.$eventHub.$on("totalUser", function(t) {
      parent.total = t;
    });
  },
  methods: {
    getRoles() {
      const api = `${this.$urlApi}/admin/roles?page=${this.roles.current_page}`;
      Vue.axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "User-ID": this.$store.getters.getUserId
          }
        })
        .then(response => {
          this.roles = response.data;
          this.total = response.data.total;
        })
        .catch(error => {
          //console.log(error.response);
          this.$eventHub.$emit("eventError", { data: error.response });
        });
    },
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
          this.privileges = response.data.data;
        })
        .catch(error => {
          //console.log(error.response);
          this.$eventHub.$emit("eventError", { data: error.response });
        });
    }
  }
};
</script>
