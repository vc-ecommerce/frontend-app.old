<template>
  <span>

    <ModalLink
      idModalLink="create-user"
      titleLink="Criar"
      classIcon="glyphicon glyphicon-plus" />

    <Modal idModal="create-user"
      titleModal="Criar novo usuário"
      sizeModal="lg">

      <div v-if="status && error === false" class="row">
        <Alert className="alert alert-success alert-fill alert-close alert-dismissible fade show">
          {{ status }}
        </Alert>
      </div>

      <div v-if="passwordInvalid" class="row">
        <Alert className="alert alert-danger alert-fill alert-close alert-dismissible fade show">
          <strong>Atenção:</strong> Senha administrativa fraca, tente outra mais forte.
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
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="inputName">Nome</label>
              <input type="text" required class="form-control" v-model="user.name" placeholder="Nome">
            </fieldset>
          </div>
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="inputEmail">Email</label>
              <input type="email" required class="form-control" placeholder="E-mail" v-model="user.email">
            </fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="inputPassword">Status</label>
              <select required class="form-control" v-model="user.active">
                <option disabled value="">Escolha um item</option>
                <option v-for="option in options" :key="option.id" :value="option.value">{{ option.text }}</option>
              </select>
            </fieldset>
          </div>
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="hide-show-password">Senha</label>
              <input type="password" id="hide-show-password" required class="form-control" minlength="6" v-model="user.password" placeholder="Senha">
            </fieldset>
          </div>
        </div>
        <div class="row" style="margin:10px 0 10px 0">
          <label class="form-label semibold">Departamentos do usuário [Permissões]</label>
        </div>

        <div class="row">
          <div class="checkbox-toggle" v-for="(role, index) in dataRoles" :key="role.id" style="margin-left:20px">
            <span :class="index = index + generateId"></span>
            <input type="checkbox" v-model="user.roles" :id="'check-toggle-'+ index" :value="role">
            <label :for="'check-toggle-'+ index">{{role.description}}</label>
          </div>
        </div>
      </form>

      <span slot="btn">
        <button form="add-user" type="submit" class="btn btn-rounded btn-primary">Salvar Dados</button>
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
  name: "CreateUser",
  components: {
    Table,
    Modal,
    ModalLink,
    Alert
  },
  props: ["dataRoles"],
  data() {
    return {
      status: false,
      error: false,
      user: {
        name: "",
        email: "",
        password: "",
        active: "",
        roles: []
      },
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ],
      passwordInvalid: false
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
      if (this.user.password !== "") {
        if (forcePassword(this.user.password) < 50) {
          this.passwordInvalid = true;

          setTimeout(() => {
            this.passwordInvalid = false;
          }, 5000);

          return;
        }
      }

      this.status = "Enviando...";

      const api = `${this.$urlApi}/admin/users`;
      Vue.axios
        .post(
          api,
          {
            name: this.user.name,
            email: this.user.email,
            active: this.user.active,
            password: this.user.password,
            password_confirmation: this.user.password,
            roles: this.user.roles,
            admin: "create-user"
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getAuthToken,
              "User-ID": this.$store.getters.getAuthId
            }
          }
        )
        .then(response => {
          this.error = false;
          this.users = response.data;
          this.total = response.data.total;
          this.status = "Usuário criado com sucesso!";

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
