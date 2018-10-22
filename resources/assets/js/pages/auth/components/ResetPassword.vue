<template>
  <form class="sign-box" @submit.prevent="submitForm">

    <header v-if="status" class="sign-title red showError">Email não encontrado</header>
    <header v-else-if="loading" class="sign-title gray">Aguarde!!!</header>
    <header v-else-if="ok">
      <div class="alert alert-success alert-fill alert-close alert-dismissible fade show" role="alert">
        O link para redefinição de senha foi enviado para o seu e-mail!
      </div>
    </header>
    <header v-else class="sign-title">Redifinição de senha</header>

    <div class="form-group">
      Digite seu e-mail de cadastro abaixo e clique em enviar. <br />
      Nós lhe enviaremos um e-mail com link para recadastrar sua senha.
    </div>

    <div class="form-group">
      <input type="email" required class="form-control" v-model="email" placeholder="Entre com seu email"/>
    </div>

    <button type="submit" class="btn btn-rounded">Enviar</button>

  </form>
</template>
<script>
export default {
  name: "ResetPassword",
  props: ["urllogin"],
  data() {
    return {
      email: "",
      data: "",
      token: "",
      status: false,
      loading: false,
      ok: false
    };
  },
  methods: {
    showError(code) {
      if (code === 401) {
        this.status = true;
        setTimeout(() => {
          this.status = false;
        }, 5000);
      }
    },
    submitForm() {

      //this.loading = true;
                this.ok = true;
      const api = `${this.$urlApi}/auth/reset`;
      Vue.axios
        .post(api, {
          email: this.email,
        })
        .then(response => {
          this.ok = true;
          console.log(response.data)
        })
        .catch(error => {
          this.loading = false;
          this.showError(error.response.status);
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

.gray{
  color:  #808080;
}
</style>


