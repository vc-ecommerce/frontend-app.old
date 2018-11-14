<template>
  <Panel title="Editando Página" classContent="panel-body">

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
          Página ativa?
        </div>
        <div class="col-sm-4">
            <select class="form-control" required v-model="data.active">
              <option disabled value="">Escolha um item</option>
              <option v-for="option in options" :key="option.id" :value="option.value">{{ option.text }}</option>
            </select>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2">
          Título da página
        </div>
        <div class="col-sm-10">
            <input type="text" required class="form-control" v-model="data.name" placeholder="Digite aqui o título da página">
            <span v-if="applySlug" class="control">{{ $urlSite +"/pg/"+ applySlug }}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2">
          Conteúdo da página
        </div>
        <div class="col-sm-10">
          <div class="form-group">
              <html-editor v-if="data.description" height="200" :dataDesc="data.description" :model.sync="data.description"></html-editor>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2">
          Tag Title
        </div>
        <div class="col-sm-10">
          <div class="form-group">
            <input class="form-control" v-model="meta_title">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2">
          Meta Tag Description
        </div>
        <div class="col-sm-10">
          <div class="form-group">
            <textarea class="form-control" v-model="meta_description"></textarea>
          </div>
        </div>
      </div>

      <div class="row col-btn">
        <div class="col-sm-2">
        </div>
        <div class="col align-self-end">
          <button :disabled="btnDisabled" class="btn btn-inline" type="submit">
            <i class="glyphicon glyphicon-ok"></i> Salvar alterações
          </button>
          <router-link :to="{ name: 'PageList' }" class="btn btn-inline btn-sm btn-default"><i class="glyphicon glyphicon-remove"></i> Cancelar</router-link>

        </div>
      </div>

    </form>

  </Panel>
</template>
<script>
import Panel from "./../../../../components/layouts/Panel";
import Alert from "./../../../../components/layouts/Alert";
import { cleanDataApi, strSlug } from "./../../../../helpers/tools";

import HtmlEditor from "./../../../../components/summernote/HtmlEditor";

export default {
  name: "PageEdit",
  components: {
    Panel,
    Alert,
    HtmlEditor
  },
  props: [],
  data() {
    return {
      data: {},
      status: false,
      error: false,
      btnDisabled: false,
      options: [{ text: "Sim", value: true }, { text: "Não", value: false }]
    };
  },
  computed: {
    applySlug() {
      if (this.data.name) {
        return strSlug(this.data.name);
      }
      return "";
    }
  },
  created() {
    this.$eventHub.$emit("eventBreadcrumbs", "Editar página");
    this.getPage();

    if (sessionStorage.getItem("pageCreated")) {
      this.status = sessionStorage.getItem("pageCreated");
      sessionStorage.removeItem("pageCreated");

      setTimeout(() => {
        this.status = false;
      }, 8000);
    }
  },
  methods: {
    getPage() {
      const api = `${this.$urlApi}/admin/pages/${this.$route.params.id}`;
      Vue.axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "User-ID": this.$store.getters.getUserId
          }
        })
        .then(response => {
          this.data = response.data;
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
          this.error = JSON.parse(error.response.data.error);
        });
    },

    submitForm() {

      let vm = this;

      this.status = "Enviando...";
      const api = `${this.$urlApi}/admin/pages/${this.$route.params.id}`;
      this.btnDisabled = true;
      Vue.axios
        .put(
          api,
          {
            name: vm.data.name,
            description: vm.data.description,
            active: vm.data.active,
            slug: strSlug( vm.data.name ),
            meta_description: vm.data.meta_description,
            meta_title: vm.data.meta_title,
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
          this.status = "Página alterado com sucesso.";
          this.btnDisabled = false;
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
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
