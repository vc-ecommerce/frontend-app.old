<template>
  <form class="sign-box" @submit.prevent="submitForm">

    <div class="sign-avatar">
        <img src="/img/avatar-sign.png" alt="">
    </div>
    <header class="sign-title">Login</header>
    <div class="form-group">
        <input type="email" required class="form-control" v-model="email" placeholder="Entre com seu email"/>
    </div>
    <div class="form-group">
        <input type="password" required minlength="6" class="form-control" v-model="password"  placeholder="Digite a senha"/>
    </div>
    <div class="form-group">
        <div class="checkbox float-left">
            <input type="checkbox" id="signed-in"/>
            <label for="signed-in">Mantenha-me conectado</label>
        </div>
        <div class="float-right reset">
            <a href="reset-password.html">Recuperar Senha</a>
        </div>
    </div>

    <button type="submit" class="btn btn-rounded">Efetuar Login</button>

  </form>
</template>

<script>
//import state from '../../../stores/authorizations/state'

export default {
  name: "LoginUser",
  props: ["urlPassword"],
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submitForm() {
      let data = {
        email: this.email,
        password: this.password
      };

      const api = `${this.$urlApi}/auth/login`;

      Vue.axios
        .post(api, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>



