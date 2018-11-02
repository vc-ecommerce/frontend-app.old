<template>
  <form class="sign-box" id="sign-box" style="display: none" @submit.prevent="submitForm">

    <header class="sign-title">Redefinir Senha</header>

    <header v-if="!tokenOk">
      <div class="alert alert-warning alert-icon alert-close alert-dismissible fade show" role="alert">
        <i class="font-icon font-icon-warning"></i>
        Token inválido ou expirado!!!
      </div>
    </header>

    <header v-if="passwordNotEquals" class="sign-title red showError">
      <div class="alert alert-warning alert-icon alert-close alert-dismissible fade show" role="alert">
        <i class="font-icon font-icon-warning"></i>
        Senhas não são iguais !
      </div>
    </header>

    <header v-else-if="loading" class="sign-title red">Aguarde enviando...</header>

    <header v-else-if="passwordInvalid">
      <div class="alert alert-danger alert-fill alert-close alert-dismissible fade show __web-inspector-hide-shortcut__" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <strong>Atenção:</strong> Senha administrativa fraca, tente outra mais forte.
      </div>
    </header>

    <header v-else-if="updateOk">
      <div class="alert alert-success alert-fill alert-close alert-dismissible fade show" role="alert">
        Senha alterada com sucesso! <br/><a :href="urllogin">Clique aqui para fazer login</a>
      </div>
    </header>

    <div class="form-group">
      <input type="password" @click="checkAlert" required minlength="6" class="form-control" v-model="password"  placeholder="Nova senha"/>
    </div>

    <div class="form-group">
      <input type="password" @click="checkAlert" required minlength="6" class="form-control" v-model="confirme"  placeholder="Confirme a senha"/>
    </div>

    <button type="submit" class="btn btn-rounded" :disabled="passwordInvalid">Redefinir senha agora</button>

  </form>
</template>
<script>

import { forcePassword } from "./../../../helpers/tools"

export default {
  name: "ForgotPassword",
  props: ["token", "urllogin"],
  data() {
    return {
      password: "",
      confirme: "",
      passwordNotEquals: false,
      passwordInvalid: false,
      status: false,
      loading: false,
      userId: "",
      tokenOk: false,
      updateOk: false
    };
  },
  mounted() {
    this.checkToken();
    document.getElementById("sign-box").style.display = "block";
  },
  methods: {
    checkAlert() {
      if (this.passwordInvalid === true) {
        this.passwordInvalid = false;
      }
    },
    showError(code) {
      if (code === 401) {
        this.status = true;
        setTimeout(() => {
          this.status = false;
        }, 5000);
      }
    },
    isPasswordValid() {
      if (this.password !== this.confirme) {
        this.passwordNotEquals = true;
        setTimeout(() => {
          this.passwordNotEquals = false;
        }, 6000);
        return false;
      }
      return true;
    },
    checkToken() {
      const api = `${this.$urlApi}/auth/forgot/check/token`;
      Vue.axios
        .post(api, {
          token: this.token
        })
        .then(response => {
          if (response.data) {
            this.tokenOk = true;
            this.userId = response.data;
          }
        })
        .catch(error => {
          this.tokenOk = false;
          this.showError(error.response.status);
        });
    },
    sendData() {
      this.loading = true;
      const api = `${this.$urlApi}/auth/forgot`;
      Vue.axios
        .post(api, {
          user_id: this.userId,
          token: this.token,
          password: this.password
        })
        .then(response => {
          if (response.data === "update_password") {
            this.loading = false;
            this.updateOk = true;
            this.password = "";
            this.confirme = "";
          }
        })
        .catch(error => {
          this.loading = false;
          this.showError(error.response.status);
        });
    },
    submitForm() {
      if (!this.isPasswordValid()) {
        return;
      }

      if (forcePassword(this.password) < 50) {
        this.passwordInvalid = true;
        return;
      }

      if (this.tokenOk === false) {
        return;
      }

      if (this.userId !== "") {
        this.sendData();
      }
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

.sign-box a {
  text-decoration: none;
  color: #f3ecca;
  border-bottom: solid 1px transparent;
}
</style>
