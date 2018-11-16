<template>
  <button v-if="isUserLogged" type="button" @click.prevent="update(dataItem)" class="tabledit-delete-button btn btn-sm" style="float: none; margin-right:2px">
    <span v-if="dataItem.active" class="glyphicon glyphicon-eye-open"></span>
    <span v-else class="glyphicon glyphicon-eye-close"></span>
  </button>
</template>
<script>
export default {
  name: "ChangeStatusUser",
  components: {},
  props: ["dataItem"],
  data() {
    return {};
  },
  computed: {
    isUserLogged() {
      if (this.dataItem._id === this.$store.getters.getAuthId) {
        return false;
      }
      return true
    }
  },
  methods: {
    send(user) {
      let status = !Boolean(user.active);
      let result = false;

      const api = `${this.$urlApi}/admin/users/${user._id}`;

      return Vue.axios
        .put(
          api,
          {
            active: status,
            admin: "edit-status"
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getAuthToken,
              "User-ID": this.$store.getters.getAuthId
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

    update(user) {
      let status, titleQuestion, titleResp, textResp;
      const vm = this;

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
            let result = vm.send(user);
            result.then(function(value) {
              user.active = !user.active;
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
    }
  }
};
</script>
