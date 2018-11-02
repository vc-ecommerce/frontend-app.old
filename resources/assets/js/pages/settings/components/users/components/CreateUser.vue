<template>
  <span>

    <LinkModal
      idLinkModal="create-user"
      titleLink="Criar"
      classIcon="glyphicon glyphicon-plus" />

    <ModalSubmit idModal="create-user"
      titleModal="Criar novo usuário"
      sizeModal="lg"
      btnTitle="Salvar" @submit="submitForm">

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
              {{ err }}
            </dt>
          </dl>
        </Alert>
      </div>
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
            <select required class="form-control" v-model="selected">
              <option disabled value="">Escolha um item</option>
              <option v-for="option in options" :key="option.id" :value="option.value">{{ option.text }}</option>
            </select>
          </fieldset>
        </div>
        <div class="col-lg-6">
          <fieldset class="form-group">
            <label class="form-label" for="inputPassword">Senha</label>
            <input type="password" class="form-control" minlength="6" v-model="user.password" placeholder="Senha">
          </fieldset>
        </div>
      </div>
      <div class="row" style="margin:10px 0 10px 0">
        <label class="form-label semibold">Funções do usuário</label>
      </div>

      <div class="row">
        <div class="checkbox-toggle" v-for="(role, index) in dataRoles" :key="role.id" style="margin-left:20px">
          <span :class="index = index + Math.floor((Math.random() * 1000) + 1)"></span>
          <input type="checkbox" v-model="user.roles" :id="'check-toggle-'+ index" :value="role">
          <label :for="'check-toggle-'+ index">{{role.description}}</label>
        </div>
      </div>

    </ModalSubmit>
  </span>
</template>
<script>
import Table from "./../../../../../components/layouts/Table";
import ModalSubmit from "./../../../../../components/layouts/ModalSubmit";
import LinkModal from "./../../../../../components/layouts/LinkModal";
import Alert from "./../../../../../components/layouts/Alert";
import filterRoles from "./../../../../../helpers/filterRoles";
import forcePassword from "./../../../../../helpers/forcePassword";

export default {
  name: "CreateUser",
  components: {
    Table,
    LinkModal,
    ModalSubmit,
    Alert
  },
  props: ["dataItem", "dataRoles"],
  data() {
    return {
      status: false,
      error: false,
      user: {
        name: "",
        email: "",
        password: "",
        roles: []
      },
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ],
      passwordInvalid: false,
      selected: ""
    };
  },
  methods: {
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
            roles: this.user.roles
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
          this.users = response.data;
          this.total = response.data.total;
          this.status = "Dados cadastrados com sucesso.";

          this.$emit("reload");

          setTimeout(() => {
            this.$eventHub.$emit("closeModal", true);
          }, 5000);
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
          this.status = false;
          this.error = JSON.parse(error.response.data.error);
        });

      setTimeout(() => {
        this.status = false;
        this.error = false;
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
