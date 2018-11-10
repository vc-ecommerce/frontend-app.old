<template>
  <button type="button" @click.prevent="remove(dataItem)" class="tabledit-delete-button btn btn-sm btn-danger">
    <span class="glyphicon glyphicon-trash"></span>
  </button>
</template>
<script>
export default {
  name: "RemoveAttribute",
  components: {},
  props: ["dataAttributes", "dataItem"],
  data() {
    return {
      total: 0,
      active: true
    };
  },
  methods: {
    send(attribute) {
      const api = `${this.$urlApi}/admin/attributes/${attribute._id}`;

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

    remove(attribute) {
      const parent = this;
      swal(
        {
          title: "Deseja realmente excluir o atributo?",
          text: `${attribute.name}`,
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
            let result = parent.send(attribute);
            result.then(function(value) {
              if (value == true) {
                let index = parent.dataAttributes.data.indexOf(attribute);
                parent.dataAttributes.data.splice(index, 1);

                parent.dataAttributes.total = parent.dataAttributes.total - 1;
                parent.$eventHub.$emit("totalAttribute", parent.dataAttributes.total);

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
