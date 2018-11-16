<template>
  <form @submit.prevent="submitFormVariation">

    <div class="row">
      <div class="col-sm-12">
        <h3>Variações do atributo</h3>
      </div>

      <div class="col-sm-12">
        <Table elementId="table-edit" className="table table-hover">

            <template slot="tbody">
              <tr v-for="(variation, index) in variations.data" :key="index">
                <td class="tabledit-view-mode">
                  {{ variation.name }}
                </td>
                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                    <div class="btn-group btn-group-sm" style="float: none;">

                      <EditVariation v-if="!variation.default" :dataVariations="variations" :dataItem="variation"  style="float: none;" />
                      <RemoveVariation v-if="!variation.default" :dataVariations="variations" :dataItem="variation"  style="float: none; margin-left:-1px"/>

                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="total<=0">
                <td>
                  Não há opção da variação.
                </td>
              </tr>
            </template>

          </Table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <input type="text" required class="form-control" v-model="name" placeholder="Nome da variação do atributo">
      </div>
      <div class="col-sm-4">
         <button :disabled="btnDisabled" class="btn btn-inline" type="submit">
          <i class="glyphicon glyphicon-ok"></i> Criar variação
        </button>
      </div>
    </div>

  </form>

</template>

<script>
import Table from "./../../../../../components/layouts/Table";
import RemoveVariation from "./RemoveVariation";
import EditVariation from "./EditVariation";

export default {
  name: "AttributeVariation",
  props: [],
  components: {
    Table,
    RemoveVariation,
    EditVariation
  },
  data() {
    return {
      attributeId: this.$route.params.id,
      total: 0,
      name: "",
      variations: [],
      btnDisabled: false
    };
  },
  mounted() {
    this.getVariations();
  },
  methods: {
    getVariations() {
      const api = `${this.$urlApi}/admin/attributes/${
        this.attributeId
      }/variations`;
      Vue.axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "User-ID": this.$store.getters.getUserId
          }
        })
        .then(response => {
          this.variations = response;
          this.total = response.data.total;
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
        });
    },

    submitFormVariation() {
      const api = `${this.$urlApi}/admin/attributes/${
        this.attributeId
      }/variations`;

      this.btnDisabled = true;

      Vue.axios
        .post(
          api,
          {
            name: this.name,
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
          let data = response.data;
          this.btnDisabled = false;
          if (data._id) {
            this.getVariations();

            swal({
              title: "Salvo com sucesso!",
              text: "A variação do atributo foi gravado com sucesso!",
              type: "success",
              confirmButtonClass: "btn-success",
              confirmButtonText: "OK!"
            });

            this.name = "";
          }
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
          if (error.response.data === "attribute_variation_is_exists") {
            swal({
              title: "Dados duplicado!",
              text: `Variação ${this.name} já existe.`
            });
          }
          this.btnDisabled = false;
        });
    }
  }
};
</script>

<style scoped>
.row {
  padding: 20px;
}
span {
  font-size: 12px;
  color: #999;
}
.col-btn {
  margin-top: -20px;
}

.glyphicon-pencil:before {
  color: #fff;
}

.glyphicon-trash:before {
  color: #fff;
}
</style>
