<template>
  <button type="button" @click.prevent="update(dataItem)" class="tabledit-delete-button btn btn-sm" style="float: none;">
    <span v-if="dataItem.active" class="glyphicon glyphicon-eye-open"></span>
    <span v-else class="glyphicon glyphicon-eye-close"></span>
  </button>
</template>
<script>
export default {
  name: "ChangeStatus",
  components: {},
  props: ["dataItem"],
  data() {
    return {};
  },
  methods: {
    send(page) {
      let status = !Boolean(page.active);
      let result = false;

      const api = `${this.$urlApi}/admin/pages/${page._id}`;

      return Vue.axios
        .put(
          api,
          {
            active: status,
            action: 'edit-status'
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

    update(page) {
      let status, titleQuestion, titleResp, textResp;
      const vm = this;

      status = !Boolean(page.active);

      if (status === true) {
        titleQuestion = "ativar";
      } else {
        titleQuestion = "desativar";
      }

      swal(
        {
          title: `Deseja realmente ${titleQuestion} a página?`,
          text: page.name,
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
            let result = vm.send(page);
            result.then(function(value) {
              page.active = !page.active;
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
                  text: `Página ${textResp} com sucesso.`,
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
