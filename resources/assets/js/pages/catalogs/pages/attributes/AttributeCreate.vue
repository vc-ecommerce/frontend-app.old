<template>
  <Panel title="Criando Atributo" classContent="panel-body">

    <div v-if="status && error === false" class="row">
      <Alert className="alert alert-success alert-fill alert-close alert-dismissible fade show">
        {{ status }}
      </Alert>
    </div>

    <div v-if="error && status === false" class="row">
      <Alert className="alert alert-danger alert-fill alert-close alert-dismissible fade show">
        <dl>
          <dt v-for="err in error" :key="err.id">
            {{ cleanData( err ) }}
          </dt>
        </dl>
      </Alert>
    </div>

    <form id="add-user" @submit.prevent="submitForm">

      <div class="row">
        <div class="col-sm-2">
          Nome do atributo
        </div>
        <div class="col-sm-10">
            <input type="text" required class="form-control" v-model="name" placeholder="Digite aqui">
            <span>Nome do atributo para controle interno</span>
        </div>
      </div>

      <div class="row col-btn">
        <div class="col-sm-2">
        </div>
        <div class="col align-self-end">
          <router-link :to="{ name: 'AttributeList' }" class="btn btn-inline btn-default"><i class="glyphicon glyphicon-remove"></i> Cancelar</router-link>
          <button class="btn btn-inline" type="submit">
            <i class="glyphicon glyphicon-ok"></i> Criar atributo
          </button>
        </div>
      </div>

    </form>
  </Panel>
</template>
<script>
import Panel from "./../../../../components/layouts/Panel";
import Alert from "./../../../../components/layouts/Alert";
import { cleanDataApi } from "./../../../../helpers/tools";

export default {
  name: "AttributeCreate",
  components: {
    Panel,
    Alert
  },
  props: [],
  data() {
    return {
      name: "",
      status: false,
      error: false
    };
  },
  mounted() {
    this.$eventHub.$emit("eventBreadcrumbs", "Criar atributos");
  },
  methods: {
    cleanData(data) {
      return cleanDataApi(data);
    },
    submitForm() {
      this.status = "Enviando...";
      const api = `${this.$urlApi}/admin/attributes`;
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
          if (data._id) {
            sessionStorage.setItem("attributeCreated", "Atributo criado com sucesso!");
            this.$router.push({
              name: "AttributeEdit",
              params: { id: data._id }
            });
          }

          this.name = "";
        })
        .catch(error => {
          this.status = false;
          this.error = JSON.parse(error.response.data.error);

          setTimeout(() => {
            this.error = false;
          }, 5000);
        });
    }
  }
};
</script>
<style scoped>
.row {
  padding: 20px;
}
.col-btn {
  margin-top: -20px;
}
span {
  font-size: 12px;
  color: #999;
}
</style>
