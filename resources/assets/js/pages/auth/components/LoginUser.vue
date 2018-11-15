<template>
  <form class="sign-box" @submit.prevent="submitForm">

    <div class="sign-avatar">
      <img :src="image" alt="">
    </div>

    <header v-if="status && status == 'account_inactive'" class="sign-title red showError">Você ainda não confirmou seu email.</header>
    <header v-else-if="status && status == 'invalid_credentials'" class="sign-title red showError">Email e ou senha inválidos</header>
    <header v-else-if="loading" class="sign-title gray">Aguarde!!!</header>
    <header v-else-if="ok" class="sign-title green">Redirecionando...</header>
    <header v-else class="sign-title">Login</header>

    <div class="form-group">
      <input type="email" required class="form-control" v-model="email" placeholder="Entre com seu email"/>
    </div>

    <div class="form-group">
      <input type="password" required minlength="6" class="form-control" v-model="password"  placeholder="Digite a senha"/>
    </div>

    <div class="form-group">
      <!-- <div class="checkbox float-left">
          <input type="checkbox" id="signed-in"/>
          <label for="signed-in">Mantenha-me conectado</label>
      </div> -->
      <div class="float-right reset">
        <a :href="urlreset">Recuperar Senha</a>
      </div>
    </div>

    <button type="submit" class="btn btn-rounded" :disabled="btnDisabled">
      <span v-if="btnDisabled">Enviando...</span>
      <span v-else>Efetuar Login</span>
    </button>

  </form>
</template>
<script>
export default {
  name: "ResetPassword",
  props: ["image", "urlreset"],
  data() {
    return {
      email: "",
      password: "",
      data: "",
      token: "",
      status: false,
      loading: false,
      ok: false,
      btnDisabled: false
    };
  },
  methods: {
    getCsrfToken() {
      let token = document.head.querySelector('meta[name="csrf-token"]');
      return token.content;
    },
    showError(code) {
      if (code === 401) {
        this.status = true;
        setTimeout(() => {
          this.status = false;
        }, 5000);
      }
    },
    redirectUser() {
      window.location = "/";
    },
    activeSession(data) {
      let token = document.head.querySelector('meta[name="csrf-token"]');

      Vue.axios
        .post(
          "/token",
          {
            token: this.getCsrfToken()
          },
          {
            headers: {
              "X-CSRF-TOKEN": this.getCsrfToken()
            }
          }
        )
        .then(response => {
          this.loading = false;
          this.redirectUser();
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitForm() {
      this.btnDisabled = true;
      this.loading = true;
      const api = `${this.$urlApi}/auth/login`;
      Vue.axios
        .post(api, {
          email: this.email,
          password: this.password
        })
        .then(response => {

          this.ok = true;
          this.status = false;

          sessionStorage.setItem("csrfToken", this.getCsrfToken());

          sessionStorage.setItem(
            "token",
            JSON.stringify(response.data.HTTP_Authorization)
          );

          sessionStorage.setItem(
            "user",
            JSON.stringify(response.data.HTTP_Data)
          );

          this.$store.commit("setUser", response.data);
          this.activeSession(response.data.HTTP_Data);
        })
        .catch(error => {
          this.btnDisabled = false;
          this.loading = false;
          this.status = error.response.data.error;
        });
    }
  },
  mounted() {
    // Remove saved data from sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    // Remove all saved data from sessionStorage
    sessionStorage.clear();
  }
};
</script>

<style scoped>
.showError {
  animation: treme 0.1s;
  animation-iteration-count: 3;
}

.sign-title {
  font-weight: bold;
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
