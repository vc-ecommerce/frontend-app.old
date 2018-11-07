<template>
  <span>

    <ModalLink
      idModalLink="create-role"
      titleLink="Criar"
      classIcon="glyphicon glyphicon-plus" />

    <Modal idModal="create-role"
      titleModal="Criar nova função"
      sizeModal="lg">

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

      <form id="add-role" @submit.prevent="submitForm">

        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Nome</label>
              <input type="text" required class="form-control" v-model="role.name" placeholder="Nome">
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">Status</label>
              <select required class="form-control" v-model="role.active">
                <option disabled value="">Escolha um item</option>
                <option v-for="option in options" :key="option.id" :value="option.value">{{ option.text }}</option>
              </select>
            </fieldset>
          </div>
        </div>

        {{ dataPrivilegies }}

        <div class="row" style="margin:10px 0 10px 0">
          <label class="form-label semibold">Privilégios</label>
        </div>

        <div class="row">
          <div class="checkbox-toggle" v-for="(privilege, index) in dataPrivilegies" :key="index" style="margin-left:20px">
            <span :class="index = index + generateId"></span>
            <input type="checkbox" v-model="role.privilege" :id="'check-toggle-'+ index" :value="privilege">
            <label :for="'check-toggle-'+ index">{{ privilege.description }}</label>
          </div>
        </div>

      </form>

      <span slot="btn">
        <button form="add-role" type="submit" class="btn btn-rounded btn-primary">Salvar Dados</button>
      </span>

    </Modal>
  </span>
</template>
<script>
import Table from "./../../../../../components/layouts/Table";
import Modal from "./../../../../../components/modals/Modal";
import ModalLink from "./../../../../../components/modals/ModalLink";
import Alert from "./../../../../../components/layouts/Alert";
import {
  cleanRole,
  forcePassword,
  cleanDataApi
} from "./../../../../../helpers/tools";

export default {
  name: "CreateRole",
  components: {
    Table,
    Modal,
    ModalLink,
    Alert
  },
  props: ["dataPrivilegies"],
  data() {
    return {
      status: false,
      error: false,
      role: {
        name: "",
        active: ""
      },
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ]
    };
  },
  computed: {
    generateId() {
      return Math.floor(Math.random() * 1000000 + 1);
    }
  },
  methods: {
    cleanData(data) {
      return cleanDataApi(data);
    },
    submitForm() {

      this.status = "Enviando...";

      const api = `${this.$urlApi}/admin/roles`;
      Vue.axios
        .post(
          api,
          {
            name: this.role.name,
            active: this.role.active,
            privileges: this.role.privileges,
            admin: "create-role"
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
          this.roles = response.data;
          this.total = response.data.total;
          this.status = "Dados cadastrados com sucesso.";
          this.$emit("reload");

        })
        .catch(error => {

          this.$eventHub.$emit("eventError", { data: error.response });
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
.row,
.col-lg-6 {
  text-align: left;
}
</style>
