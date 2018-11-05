<template>
  <div class="dropdown user-menu">
    <button class="dropdown-toggle" id="dd-user-menu" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img src="/img/avatar-2-64.png" alt="">
    </button>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dd-user-menu">
      <a class="dropdown-item" :href="urlAccounts">
        <span class="font-icon glyphicon glyphicon-user"></span>
        {{ user.name }}
      </a>
      <!--
      <a class="dropdown-item" href="#">
        <span class="font-icon glyphicon glyphicon-cog"></span>
        Configurações
      </a>
      <a class="dropdown-item" href="#">
        <span class="font-icon glyphicon glyphicon-question-sign"></span>
        Ajuda
      </a>
      -->
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" :href="urlLogout">
        <span class="font-icon glyphicon glyphicon-log-out"></span>
        Sair
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "MenuTopUser",
  props: ['urlLogout', 'urlAccounts'],
  data() {
    return {
      user: this.$store.getters.getUser
    }
  }
}
</script>
