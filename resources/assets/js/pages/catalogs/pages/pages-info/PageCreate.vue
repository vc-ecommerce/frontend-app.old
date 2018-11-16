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
              <html-editor height="200" :dataDesc="data.description" :model.sync="data.description"></html-editor>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-10">
          <WidgetAccordion>
            <WidgetAccordionContent title="Otimização para buscadores (SEO)">

              <div class="row">
                <div class="col-sm-2">
                  Tag Title
                </div>
                <div class="col-sm-9">
                  <div class="form-group">
                    <input class="form-control" v-model="data.meta_title">
                  </div>
                </div>
                <div class="col-sm-1">

                  <div class="form-group">
                    <a href="https://static.googleusercontent.com/media/www.google.com/pt-BR//intl/pt-BR/webmasters/docs/guia-otimizacao-para-mecanismos-de-pesquisa-pt-br.pdf" target="_blank"
                    class="label label-default" data-toggle="tooltip" title="" data-original-title="Guia do Google para Iniciantes">
                    <i class="glyphicon glyphicon-question-sign"></i> Guia
                    </a>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-2">
                  Meta Tag Description
                </div>
                <div class="col-sm-10">
                  <div class="form-group">
                    <textarea class="form-control" v-model="data.meta_description"></textarea>
                  </div>
                </div>
              </div>
            </WidgetAccordionContent>
          </WidgetAccordion>

        </div>
      </div>

      <div class="row col-btn">

        <div class="col-sm-12 text-right">

          <router-link :to="{ name: 'PageList' }" class="btn btn-inline btn-sm btn-default"><i class="glyphicon glyphicon-remove"></i> Cancelar</router-link>
          <button :disabled="btnDisabled" class="btn btn-inline" type="submit">
            <i class="glyphicon glyphicon-ok"></i> Cadastrar Página
          </button>

        </div>
      </div>

    </form>

  </Panel>
</template>
<script>
import Panel from "./../../../../components/layouts/Panel";
import Alert from "./../../../../components/layouts/Alert";
import WidgetAccordion from "./../../../../components/widgets/WidgetAccordion";
import WidgetAccordionContent from "./../../../../components/widgets/WidgetAccordionContent";
import { cleanDataApi, strSlug } from "./../../../../helpers/tools";
import HtmlEditor from "./../../../../components/summernote/HtmlEditor";

export default {
  name: "PageEdit",
  components: {
    Panel,
    Alert,
    WidgetAccordion,
    WidgetAccordionContent,
    HtmlEditor
  },
  props: [],
  data() {
    return {
      data: {
        name: "",
        description: "",
        active: "",
        slug: "",
        meta_description: "",
        meta_title: "",
      },
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
    this.$eventHub.$emit("eventBreadcrumbs", "Cadastrar página");
  },
  methods: {
    cleanData(data) {
      return cleanDataApi(data);
    },
    submitForm() {
      const vm = this;

      this.status = "Enviando...";
      const api = `${this.$urlApi}/admin/pages`;
      this.btnDisabled = true;
      Vue.axios
        .post(
          api,
          {
            name: vm.data.name,
            description: vm.data.description,
            active: vm.data.active,
            slug: strSlug(vm.data.name),
            meta_description: vm.data.meta_description,
            meta_title: vm.data.meta_title
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
          this.status = false;
          if (response.status === 201) {
            swal({
              title: "Dados cadastrados!",
              text: "Página foi cadastrada com sucesso.",
              type: "success",
              confirmButtonClass: "btn-success",
              confirmButtonText: "OK"
            });

            this.$router.push({
              name: "PageList"
            });
          }

          this.btnDisabled = false;
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
          this.status = false;
          this.error = JSON.parse(error.response.data.error);

          swal({
            title: "Houve um erro na solicitação!",
            text: "Corrija os erros!",
            type: "error",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK"
          });
          this.btnDisabled = false;
        });

      setTimeout(() => {
        this.status = false;
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
