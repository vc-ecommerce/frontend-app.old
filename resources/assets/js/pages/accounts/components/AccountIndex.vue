<template>
  <form @submit.prevent="submitForm">
    <section class="card">
      <div class="card-block">
        <div class="row">
          <div class="col-lg-12">
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
          </div>
        </div>
        <h5 class="with-border m-t-lg">Detalhes Pessoais</h5>
        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="exampleInput">Nome</label>
              <input type="text" v-model="user.name" class="form-control maxlength-simple" placeholder="Seu Nome" >
            </fieldset>
          </div>
        </div>
        <h5 class="with-border m-t-lg">E-mail e Senha</h5>
        <div class="row">
          <div class="col-md-6 col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="exampleInputEmail1">E-mail</label>
              <input type="email" v-model="user.email" disabled class="form-control maxlength-custom-message" placeholder="Seu Email">
            </fieldset>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="form-group">
              <label class="form-label" for="hide-show-password">Senha</label>
              <input type="password" v-model="password" id="hide-show-password" class="form-control">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-sm-6">
            <button type="submit" :disabled="bntDisabled" class="btn btn-inline">Salvar Alterações</button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>
<script>
import Alert from "./../../../components/layouts/Alert";
import {
  cleanRole,
  forcePassword,
  cleanDataApi
} from "./../../../helpers/tools";

export default {
  name: "AccountIndex",
  components: {
    Alert
  },

  props: [],
  data() {
    return {
      user: this.$store.getters.getUser,
      status: false,
      error: false,
      password: "",
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ],
      passwordInvalid: false,
      bntDisabled: false
    };
  },
  methods: {

    cleanData(data) {
      return cleanDataApi(data);
    },
    submitForm() {

      if (this.password !== "") {
        if (forcePassword(this.password) < 50) {
          this.passwordInvalid = true;

          setTimeout(() => {
            this.passwordInvalid = false;
          }, 5000);

          return;
        }
      }

      this.status = "Enviando...";
      this.bntDisabled = true;

      const api = `${this.$urlApi}/admin/users/${this.$store.getters.getAuthId}`;
      Vue.axios
        .put(
          api,
          {
            name: this.user.name,
            password: this.password,
            password_confirmation: this.password,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getAuthToken,
              "User-ID": this.$store.getters.getAuthId
            }
          }
        )
        .then(response => {

          let stateUser = this.$store.getters.getUser;
          stateUser.name = this.user.name;

          sessionStorage.setItem(
            "user",
            JSON.stringify(stateUser)
          );

          this.bntDisabled = false;
          this.passwordInvalid = false;

          this.password = "";
          this.error = false;
          this.users = response.data;
          this.total = response.data.total;
          this.status = "Dados do usuário alterados com sucesso.";
        })
        .catch(error => {

          this.bntDisabled = false;
          this.passwordInvalid = false;

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
