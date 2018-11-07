<template>
  <button type="button" @click.prevent="update(dataItem)" class="tabledit-delete-button btn btn-sm" style="float: none; margin-right:2px">
    <span v-if="dataItem.active" class="glyphicon glyphicon-eye-open"></span>
    <span v-else class="glyphicon glyphicon-eye-close"></span>
  </button>
</template>
<script>
export default {
  name: "ChangeStatusRole",
  components: {},
  props: ["dataItem"],
  data() {
    return {};
  },
  methods: {
    send(role) {
      let status = !Boolean(role.active);
      let result = false;

      const api = `${this.$urlApi}/admin/roles/${role._id}`;

      return Vue.axios
        .put(
          api,
          {
            active: status,
            admin: "edit-status"
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "User-ID": this.$store.getters.getUserId
            }
          }
        )
        .then(response => {
          if (Boolean(response.data) === true) {
            return true;
          }
          return false;
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
          return false;
        });
    },

    update(role) {
      let status, titleQuestion, titleResp, textResp;
      const parent = this;

      status = !Boolean(role.active);

      if (status === true) {
        titleQuestion = "ativar";
      } else {
        titleQuestion = "desativar";
      }

      swal(
        {
          title: `Deseja realmente ${titleQuestion} a função?`,
          text: role.name,
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
            let result = parent.send(role);
            result.then(function(value) {
              role.active = !role.active;
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
                  text: `Função ${textResp} com sucesso.`,
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
    }
  }
};
</script>
