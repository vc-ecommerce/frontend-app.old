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
      if (this.dataItem._id === this.$store.getters.getUserId) {
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

    remove(user) {
      const parent = this;
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
            let result = parent.send(user);
            result.then(function(value) {
              if (value == true) {
                let index = parent.dataUsers.data.indexOf(user);
                parent.dataUsers.data.splice(index, 1);

                parent.dataUsers.total = parent.dataUsers.total - 1;
                parent.$eventHub.$emit("totalUser", parent.dataUsers.total);

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
