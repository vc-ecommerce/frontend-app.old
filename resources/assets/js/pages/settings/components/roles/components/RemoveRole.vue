<template>
  <button type="button" @click.prevent="remove(dataItem)" class="tabledit-delete-button btn btn-sm btn-danger" style="float: none; margin-left:2px">
    <span class="glyphicon glyphicon-trash"></span>
  </button>
</template>
<script>
export default {
  name: "RemoveRole",
  components: {},
  props: ["dataRoles", "dataItem"],
  data() {
    return {
      total: 0,
      active: true
    };
  },
  methods: {
    send(role) {
      const api = `${this.$urlApi}/admin/roles/${role._id}`;

      return Vue.axios
        .delete(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "User-ID": this.$store.getters.getUserId
          }
        })
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

    remove(role) {
      const parent = this;
      swal(
        {
          title: "Deseja realmente excluir?",
          text: `${role.name}`,
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
              if (value == true) {
                let index = parent.dataRoles.data.indexOf(role);
                parent.dataRoles.data.splice(index, 1);

                parent.dataRoles.total = parent.dataRoles.total - 1;
                parent.$eventHub.$emit("totalRole", parent.dataRoles.total);

                swal({
                  title: "Removido",
                  text: "Dados foram removidos com sucesso",
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
