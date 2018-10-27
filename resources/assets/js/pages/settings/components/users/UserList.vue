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
                <a href="#" class="btn btn-inline"><i class="glyphicon glyphicon-plus"></i> Criar novo</a>
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
              <tr v-for="user in users.data" :key="user._id">
                <td class="tabledit-view-mode">
                    {{ user.name }}
                    <br>
                    <small>

                    </small>
                </td>
                <td>
                    <span v-for="role in user.roles" :key="role._id" class="label label-info">{{ role.description }}</span>
                </td>
                <td style="white-space: nowrap; width: 1%;">
                    <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                        <div class="btn-group btn-group-sm" style="float: none;"><button type="button" class="tabledit-edit-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="tabledit-delete-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-trash"></span></button></div>
                        <button type="button" class="tabledit-save-button btn btn-sm btn-success" style="display: none; float: none;">Save</button>
                        <button type="button" class="tabledit-confirm-button btn btn-sm btn-danger" style="display: none; float: none;">Confirm</button>
                        <button type="button" class="tabledit-restore-button btn btn-sm btn-warning" style="display: none; float: none;">Restore</button>
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
import Table from "./../../../../components/layouts/Table";
import Pagination from "./../../../../components/paginations/Pagination";
export default {
  name: "UserList",
  components: {
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
    this.getUsers()
  },
  methods: {

    getUsers() {

      const api = `${this.$urlApi}/admin/users?page=${this.users.current_page}`
      Vue.axios
        .get(api, {
          headers: {
            authorization: "Bearer " + this.$store.getters.getToken
          }
        })
        .then(response => {

          this.users = response.data;
          this.total = response.data.total
          //console.log(this.users)

        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
};
</script>

<style scoped>
</style>
