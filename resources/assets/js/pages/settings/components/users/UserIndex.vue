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
            <CreateUser  />
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
                  <span v-for="(role, index) in user.roles" :key="index" class="label label-info">{{ role.description }}</span>
                </td>
                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                    <div class="btn-group btn-group-sm" style="float: none;">
                      <ChangeStatusUser :dataItem="user"/>
                      <EditUser :dataItem="user"/>
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

export default {
  name: "UserIndex",
  components: {
    CreateUser,
    EditUser,
    ChangeStatusUser,
    RemoveUser,
    Table,
    Pagination
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
      offset: 4
    };
  },
  mounted() {
    this.getUsers();
    const parent = this;
    this.$eventHub.$on("totalUser", function(t) {
      parent.total = t;
    });
  },
  methods: {
    getUsers() {
      const api = `${this.$urlApi}/admin/users?page=${this.users.current_page}`;
      Vue.axios
        .get(api, {
          headers: {
            authorization: "Bearer " + this.$store.getters.getToken
          }
        })
        .then(response => {
          this.users = response.data;
          this.total = response.data.total;
        })
        .catch(error => {
          //console.log(error.response);
          this.$eventHub.$emit("eventError", { data: error.response });
        });
    }
  }
};
</script>
