<template>

  <button  v-if="isUserLogged" type="button" @click.prevent="remove(dataItem)" class="tabledit-delete-button btn btn-sm btn-danger" style="float: none; margin-left:-1px">
    <span class="glyphicon glyphicon-trash"></span>
  </button>

</template>
<script>
export default {
  name: "RemoveUser",
  components: {},
  props: ["dataUsers", "dataItem"],
  data() {
    return {
      total: 0,
      active: true
    };
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
      const api = `${this.$urlApi}/admin/users/${user._id}`;

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

    remove(user) {
      const vm = this;
      swal(
        {
          title: "Deseja realmente excluir?",
          text: `${user.name}`,
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
              if (value == true) {
                let index = vm.dataUsers.data.indexOf(user);
                vm.dataUsers.data.splice(index, 1);

                vm.dataUsers.total = vm.dataUsers.total - 1;
                vm.$eventHub.$emit("totalUser", vm.dataUsers.total);

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
