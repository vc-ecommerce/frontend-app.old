<template>
  <Panel title="Editando Atributo" classContent="panel-body">

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

    <form @submit.prevent="submitForm">

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
          <button :disabled="btnDisabled" class="btn btn-inline" type="submit">
            <i class="glyphicon glyphicon-ok"></i> Alterar nome
          </button>
        </div>
      </div>

    </form>

    <AttributeVariation class="variation"/>

  </Panel>
</template>
<script>
import Panel from "./../../../../components/layouts/Panel";
import Alert from "./../../../../components/layouts/Alert";
import { cleanDataApi } from "./../../../../helpers/tools";

import AttributeVariation from "./components/AttributeVariation";

export default {
  name: "AttributeEdit",
  components: {
    Panel,
    Alert,
    AttributeVariation
  },
  props: [],
  data() {
    return {
      name: "",
      status: false,
      error: false,
      btnDisabled: false
    };
  },
  mounted() {
    this.$eventHub.$emit("eventBreadcrumbs", "Editar atributos");
    this.getAttribute();
    if (sessionStorage.getItem("attributeCreated")) {
      this.status = sessionStorage.getItem("attributeCreated");
      sessionStorage.removeItem("attributeCreated");

      setTimeout(() => {
        this.status = false;
      }, 8000);
    }
  },
  methods: {
    cleanData(data) {
      return cleanDataApi(data);
    },

    getAttribute() {
      const api = `${this.$urlApi}/admin/attributes/${this.$route.params.id}`;
      Vue.axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "User-ID": this.$store.getters.getUserId
          }
        })
        .then(response => {
          this.name = response.data.name;
        })
        .catch(error => {
          this.error = JSON.parse(error.response.data.error);
        });
    },

    submitForm() {
      this.status = "Enviando...";
      const api = `${this.$urlApi}/admin/attributes/${this.$route.params.id}`;
      this.btnDisabled = true;
      Vue.axios
        .put(
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
          this.status = "Atributo alterado com sucesso.";
          this.btnDisabled = false;
        })
        .catch(error => {
          this.status = false;
          this.error = JSON.parse(error.response.data.error);
          this.btnDisabled = false;
        });

      setTimeout(() => {
        this.status = false;
        this.error = false;
      }, 8000);
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

.variation {
  border-top: 1px solid #ece9e9;
}
</style>
