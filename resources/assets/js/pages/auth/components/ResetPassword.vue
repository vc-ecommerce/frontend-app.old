<template>
  <form class="sign-box" @submit.prevent="submitForm">

    <header class="sign-title">Redefinição de senha</header>

    <header v-if="error">
      <div class="alert alert-danger alert-fill alert-close alert-dismissible fade show" role="alert">

        <span v-if="error === 404">
          Email não encontrado!
        </span>

        <span v-else v-for="err in error" :key="err._id">
          {{ cleanData( err ) }}
        </span>

      </div>
    </header>

    <header v-else-if="success">
      <div class="alert alert-success alert-fill alert-close alert-dismissible fade show" role="alert">
        O link para redefinição de senha foi enviado para o seu e-mail!
      </div>
    </header>

    <div v-else class="form-group">
      Digite seu e-mail de cadastro abaixo e clique em enviar. <br />
      Nós lhe enviaremos um e-mail com link para recadastrar sua senha.
    </div>

    <div class="form-group">
      <input type="email" required class="form-control" v-model="email" placeholder="Endereço de email"/>
    </div>

    <button type="submit" class="btn btn-rounded" :disabled="btnDisabled">
      <span v-if="btnDisabled">Enviando...</span>
      <span v-else>Enviar</span>
    </button>

  </form>
</template>
<script>

import { cleanDataApi } from "./../../../helpers/tools"

export default {
  name: "ResetPassword",
  props: [],
  data() {
    return {
      email: "",
      data: "",
      token: "",
      loading: false,
      success: false,
      btnDisabled: false,
      error: false
    };
  },
  methods: {

    cleanData(data) {
      return cleanDataApi(data);
    },

    submitForm() {
      this.btnDisabled = true;
      this.loading = true;
      const api = `${this.$urlApi}/auth/reset`;
      Vue.axios
        .post(api, {
          email: this.email
        })
        .then(response => {
          this.success = true;
          this.loading = false;
          this.btnDisabled = false;
        })
        .catch(error => {
          this.loading = false;
          this.btnDisabled = false;

          if (error.response.status === 404) {
            this.error = error.response.status;
          } else {
            this.error = JSON.parse(error.response.data.error);
          }

          setTimeout(() => {
            this.error = false;
          }, 5000);


        });
    }
  }
};
</script>

<style scoped>
.sign-title {
  font-weight: bold;
}

.showError {
  animation: treme 0.1s;
  animation-iteration-count: 3;
}

@keyframes treme {
  0% {
    margin-left: 0;
  }
  25% {
    margin-left: 5px;
  }
  50% {
    margin-left: 0;
  }
  75% {
    margin-left: -5px;
  }
  100% {
    margin-left: 0;
  }
}

.red {
  color: #fa424a;
}

.green {
  color: #46c35f;
}

.gray {
  color: #808080;
}
</style>
