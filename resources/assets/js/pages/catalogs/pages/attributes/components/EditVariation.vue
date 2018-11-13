<template>
  <span>

   <ModalLink
      :idModalLink="$store.getters.getItem ? $store.getters.getItem._id : ''"
      showTypeClassName="tabledit-edit-button btn btn-sm btn-default"
      classIcon="glyphicon glyphicon-pencil"
      :dataItem="dataItem" />


    <Modal :idModal="$store.getters.getItem ? $store.getters.getItem._id : ''"
      titleModal="Editar variação de atributo"
      sizeModal="lg">

      <div v-if="status && error === false" class="row">
        <Alert className="alert alert-success alert-fill alert-close alert-dismissible fade show">
          {{ status }}
        </Alert>
      </div>

      <div v-if="error" class="row">
        <Alert className="alert alert-danger alert-fill alert-close alert-dismissible fade show">
          {{ error }}
        </Alert>
      </div>

      <form id="edit-variation" @submit.prevent="submitForm">

        <div class="row">

           <div class="col-lg-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Nome da variação do atributo</label>
              <input v-if="$store.getters.getItem" type="text" required class="form-control" v-model="$store.getters.getItem.name" placeholder="Nome da variação do atributo">
            </fieldset>
          </div>
        </div>

      </form>

      <span slot="btn">
        <button form="edit-variation" type="submit" class="btn btn-rounded btn-primary"><i class="glyphicon glyphicon-ok"></i> Salvar Alterações</button>
      </span>

    </Modal>
  </span>
</template>
<script>
import Table from "./../../../../../components/layouts/Table";
import Modal from "./../../../../../components/modals/Modal";
import ModalLink from "./../../../../../components/modals/ModalLink";
import Alert from "./../../../../../components/layouts/Alert";
import { cleanDataApi } from "./../../../../../helpers/tools";

export default {
  name: "EditRole",
  components: {
    Table,
    Modal,
    ModalLink,
    Alert
  },
  props: ["dataVariations", "dataItem"],
  data() {
    return {
      status: false,
      error: false,
      variation: {
        name: ""
      }
    };
  },
  methods: {
    cleanData(data) {
      return cleanDataApi(data);
    },
    submitForm() {
      if (!this.$store.getters.getItem) {
        return;
      }

      let data = this.$store.getters.getItem;

      this.status = "Enviando...";

      const api = `${this.$urlApi}/admin/attributes/${
        this.$route.params.id
      }/variations/${data._id}`;

      Vue.axios
        .put(
          api,
          {
            name: data.name,
            default: false
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "User-ID": this.$store.getters.getUserId
            }
          }
        )
        .then(response => {
          this.error = false;
          this.variations = response.data;
          this.total = response.data.total;
          this.status = "Variação editada com sucesso!";
          this.$emit("reload");

          console.log(response);
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });

          if ((error.response.data = "attribute_variation_is_exists")) {
            this.error = `Variação ${data.name} já existe.`;
          }
        });

      setTimeout(() => {
        this.error = false;
        this.status = false;
      }, 5000);
    }
  }
};
</script>

<style scoped>
.row,
.col-lg-6 {
  text-align: left;
}
</style>
