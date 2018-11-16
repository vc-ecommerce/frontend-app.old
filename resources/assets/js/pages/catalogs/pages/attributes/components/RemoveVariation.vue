<template>
  <button type="button" @click.prevent="remove(dataItem)" class="tabledit-delete-button btn btn-sm btn-danger">
    <span class="glyphicon glyphicon-trash"></span>
  </button>

</template>
<script>
export default {
  name: "RemoveVariation",
  components: {},
  props: ["dataVariations", "dataItem"],
  data() {
    return {
      total: 0,
      active: true,
      attributeId: this.$route.params.id
    };
  },
  methods: {
    send(variation) {
      const api = `${this.$urlApi}/admin/attributes/${
        this.attributeId
      }/variations/${this.dataItem._id}`;

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

    remove(variation) {
      const vm = this;
      swal(
        {
          title: "Deseja realmente excluir a variação?",
          text: `${variation.name}`,
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
            let result = vm.send(variation);
            result.then(function(value) {
              if (value == true) {
                let index = vm.dataVariations.data.indexOf(variation);
                vm.dataVariations.data.splice(index, 1);

                vm.dataVariations.total = vm.dataVariations.total - 1;
                vm.$eventHub.$emit(
                  "totalAttribute",
                  vm.dataVariations.total
                );

                swal({
                  title: "Removido",
                  text: "Variação removida com sucesso",
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
