<template>
  <div>
    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Usuário</h3>
            <h3 v-else>{{ total }} Usuários</h3>
          </div>
          <div class="tbl-cell tbl-cell-action-bordered">
            <CreateUser :dataRoles="roles" @reload="getUsers()" />
          </div>
        </div>
      </header>
      <div class="box-typical-body">
        <div class="table-responsive">
          <Table elementId="table-edit" className="table table-hover">
            <template slot="thead">
              <tr>
                <th>Usuários</th>
                <th width="200">Departamentos</th>
                <th class="tabledit-toolbar-column">Editar</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="(user, index) in users.data" :key="index">
                <td class="tabledit-view-mode">
                  {{ user.name }}
                  <br>
                  <small>
                  </small>
                </td>
                <td>
                  <span v-for="(role, index) in user.roles" :key="index" class="label label-info" style="margin:2px">{{ role.description }}</span>
                </td>
                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                    <div class="btn-group btn-group-sm" style="float: none;">
                      <ChangeStatusUser :dataItem="user"/>
                      <EditUser :dataItem="user" :dataRoles="roles"/>
                      <RemoveUser :dataUsers="users" :dataItem="user"/>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
    </section>
    <section>
      <Pagination :pagination="users"
        @paginate="getUsers()"
        :offset="4" />
    </section>
  </div>
</template>
<script>
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import ChangeStatusUser from "./components/ChangeStatusUser";
import RemoveUser from "./components/RemoveUser";
import Table from "./../../../../components/layouts/Table";
import Pagination from "./../../../../components/paginations/Pagination";
import { cleanRole } from "./../../../../helpers/tools";

export default {
  name: "AttributeIndex",
  components: {
    CreateUser,
    EditUser,
    ChangeStatusUser,
    RemoveUser,
    Table,
    Pagination,
  },
  props: [],
  data() {
    return {
      total: 0,
      users: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      roles: []
    };
  },
  mounted() {
    this.getUsers();
    this.getRoles();
    const vm = this;
    this.$eventHub.$on("totalUser", function(t) {
      vm.total = t;
    });
  },
  methods: {
    getRoles() {
      const api = `${this.$urlApi}/admin/roles`;
      Vue.axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "User-ID": this.$store.getters.getUserId
          }
        })
        .then(response => {
          this.roles = cleanRole(response.data.data);
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
          this.error = JSON.parse(error.response.data.error);
        });
    },

    getUsers() {
      const api = `${this.$urlApi}/admin/users?page=${this.users.current_page}`;
      Vue.axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "User-ID": this.$store.getters.getUserId
          }
        })
        .then(response => {
          this.users = response.data;
          this.total = response.data.total;
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
        });
    }
  }
};
</script>
