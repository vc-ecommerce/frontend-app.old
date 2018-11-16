<template>
  <button type="button" @click.prevent="remove(dataItem)" class="tabledit-delete-button btn btn-sm btn-danger" style="float: none; margin-left:-1px">
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
            Authorization: "Bearer " + this.$store.getters.getAuthToken,
            "User-ID": this.$store.getters.getAuthId
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
      const vm = this;
      swal(
        {
          title: "Deseja realmente excluir?",
          text: `${role.description}`,
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
            let result = vm.send(role);
            result.then(function(value) {
              if (value == true) {
                let index = vm.dataRoles.data.indexOf(role);
                vm.dataRoles.data.splice(index, 1);

                vm.dataRoles.total = vm.dataRoles.total - 1;
                vm.$eventHub.$emit("totalRole", vm.dataRoles.total);

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
