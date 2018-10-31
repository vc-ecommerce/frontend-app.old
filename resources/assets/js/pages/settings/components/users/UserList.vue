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

              <UserCreateModal />

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
                        <div class="btn-group btn-group-sm" style="float: none;">

                          <button type="button" @click.prevent="changeStatus(user)" class="tabledit-delete-button btn btn-sm" style="float: none; margin-right:2px">
                            <span v-if="user.active" class="glyphicon glyphicon-eye-open"></span>
                            <span v-else class="glyphicon glyphicon-eye-close"></span>
                          </button>

                          <UserEditModal :dataItem="user"/>

                          <button type="button" @click.prevent="alertRemove(user)" class="tabledit-delete-button btn btn-sm btn-danger" style="float: none; margin-left:2px">
                            <span class="glyphicon glyphicon-trash"></span>
                          </button>

                        </div>
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
import UserCreateModal from "./modal/UserCreateModal";
import UserEditModal from "./modal/UserEditModal";

import Pagination from "./../../../../components/paginations/Pagination";
export default {
  name: "UserList",
  components: {
    Table,
    UserCreateModal,
    UserEditModal,
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
  },
  computed: {},
  methods: {
    changeStatus(user) {
      let status, titleQuestion, titleResp, textResp;
      const parent = this;

      status = !Boolean(user.active);

      if (status === true) {
        titleQuestion = "ativar";
      } else {
        titleQuestion = "desativar";
      }

      swal(
        {
          title: `Deseja realmente ${titleQuestion} o usuário?`,
          text: user.name,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Sim!",
          cancelButtonText: "Cancelar",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {

            let result = parent.sendDataActive(user);
            result.then(function(value) {

              // Faça algo com o valor aqui dentro.
              // Se precisar dele em outro lugar, chame uma função
              // e passe adiante. Não tente atribuir seu valor a uma
              // variável de fora e acessar lá embaixo, não vai funcionar.
              // (exceto em certos casos com frameworks reativos)

              if (value == true) {
                if (status === true) {
                  titleResp = "Ativado";
                  textResp = "ativado";
                } else {
                  titleResp = "Desativado";
                  textResp = "desativado";
                }

                swal({
                  title: titleResp,
                  text: `Usuário ${textResp} com sucesso.`,
                  type: "success",
                  confirmButtonClass: "btn-success"
                });
              } else {
                swal({
                  title: "Erro",
                  text: "Houve um erro na socilitação do pedido.",
                  type: "error",
                  confirmButtonClass: "btn-danger"
                });
              }
            });
          } else {
            swal({
              title: "Cancelado",
              text: "Pedido cancelado com sucesso.",
              type: "error",
              confirmButtonClass: "btn-danger"
            });
          }
        }
      );
    },

    sendDataActive(user) {
      let status = !Boolean(user.active);
      let result = false;

      const api = `${this.$urlApi}/admin/users/${user._id}`;

      return Vue.axios
        .put(
          api,
          {
            active: status,
            local: "user-edit-status"
          },
          {
            headers: {
              authorization: "Bearer " + this.$store.getters.getToken
            }
          }
        )
        .then(response => {
          if (Boolean(response.data) === true) {
            user.active = !user.active;
            return true;
          }
          return false;
        })
        .catch(error => {
          return false;
        });
    },

    alertRemove(user) {
      swal(
        {
          title: "Deseja realmente excluir?",
          text: `${user.name} -  ${user._id}`,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Sim!",
          cancelButtonText: "Cancelar",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            swal({
              title: "Removido",
              text: "Dados foram removidos com sucesso",
              type: "success",
              confirmButtonClass: "btn-success"
            });
          } else {
            swal({
              title: "Cancelado",
              text: "Pedido cancelado com sucesso.",
              type: "error",
              confirmButtonClass: "btn-danger"
            });
          }
        }
      );
    },

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
          //console.log(this.users)
        })
        .catch(error => {
          // console.log(error.response);
        });
    }
  }
};
</script>

<style scoped>
</style>
