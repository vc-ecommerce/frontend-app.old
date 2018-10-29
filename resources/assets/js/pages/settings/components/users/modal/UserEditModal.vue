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

    <div class="row" style="margin:10px 0 10px 0">
        <label class="form-label semibold">Funções do usuário</label>
    </div>

    <div class="row">
        <div class="checkbox-toggle" v-for="(role, index) in roles" :key="role.id" style="margin-left:20px">
          <input type="checkbox" v-model="roleUser" :id="'check-toggle-'+ index" :value="role">
          <label :for="'check-toggle-'+ index">{{role.description}}</label>
        </div>
    </div>

  </Modal>

</template>
<script>
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
      roles: []
    };
  },
  computed: {
    roleUser: {
      get() {
        return filterRoles(this.$store.getters.getItem.roles);
      },
      set(value) {
        this.$store.commit("updateRoleUser", value);
      }
    }
  },
  mounted() {
    this.getRoles();
  },
  methods: {
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
    },

    sendForm() {
      console.log(this.$store.getters.getItem);
    }
  }
};
</script>
