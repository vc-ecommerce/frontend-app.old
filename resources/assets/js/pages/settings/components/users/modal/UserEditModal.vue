<template>
  <Modal
    sizeModal="lg"
    showTypeClassName="tabledit-edit-button btn btn-sm btn-default"
    classIcon="glyphicon glyphicon-pencil"
    titleModal="Editar dados de Usuário"
    btnSave="Salvar" :dataItem="dataItem" @submit="sendForm()">

    <div class="row">
      <div class="col-lg-4">
        <fieldset class="form-group">
          <label class="form-label semibold" for="exampleInput">Nome</label>
          <input type="text" class="form-control" v-model="$store.getters.getItem.name" placeholder="Nome">
        </fieldset>
      </div>
      <div class="col-lg-4">
        <fieldset class="form-group">
          <label class="form-label" for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control" placeholder="E-mail" v-model="$store.getters.getItem.email">
        </fieldset>
      </div>
      <div class="col-lg-4">
        <fieldset class="form-group">
          <label class="form-label" for="exampleInputPassword1">Senha</label>
          <input type="password" class="form-control" placeholder="Senha">
        </fieldset>
      </div>
    </div><!--.row-->

    <div class="row" style="margin-top:20px">
      <div class="checkbox-toggle" v-for="(role, index) in roles" :key="role.id" style="margin-left:20px">
        <input type="checkbox" v-model="user.roles" :id="'check-toggle-'+ index" :value="role">
        <label :for="'check-toggle-'+ index">{{role.description}}</label>
      </div>
    </div>


    <p>User's selected roels</p>
    {{user.roles}}

  </Modal>

</template>
<script>
//https://stackoverflow.com/questions/50648407/checkbox-array-in-vue-js

//https://stackoverflow.com/questions/49663539/why-error-in-render-typeerror-cannot-read-property-filter-of-undefined-ret?noredirect=1&lq=1

import Table from "./../../../../../components/layouts/Table";
import Modal from "./../../../../../components/layouts/Modal";

import filterRoles from "./../../../../../helpers/filterRoles";

export default {
  name: "UserEditModal",
  components: {
    Table,
    Modal
  },
  props: ["dataItem"],
  data() {
    return {
      roles: [],
      user: {
        roles: []
      },
    };
  },
  computed: {
    filterEvent() {
      this.user = this.$store.getters.getItem;
      return filterRoles(this.user.roles);
    }
  },
  mounted() {
    this.getRoles();
  },
  methods: {
    sendForm() {
      console.log(this.user)
    },
    getRoles() {
      const api = `${this.$urlApi}/admin/roles`;
      Vue.axios
        .get(api, {
          headers: {
            authorization: "Bearer " + this.$store.getters.getToken
          }
        })
        .then(response => {
          this.roles = filterRoles(response.data.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>
