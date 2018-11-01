<template>
  <Modal
    sizeModal="lg"
    showTypeClassName="tabledit-edit-button btn btn-sm btn-default"
    classIcon="glyphicon glyphicon-pencil"
    titleModal="Editar dados de Usuário"
    btnSave="Salvar" :dataItem="dataItem" @submit="sendForm()">

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
          <input type="text" required class="form-control" v-model="$store.getters.getItem.name" placeholder="Nome">
        </fieldset>
      </div>

      <div class="col-lg-6">
        <fieldset class="form-group">
          <label class="form-label" for="inputEmail">Email</label>
          <input type="email" required class="form-control" placeholder="E-mail" v-model="$store.getters.getItem.email">
        </fieldset>
      </div>

    </div><!--.row-->

    <div class="row">

      <div class="col-lg-6">
        <fieldset class="form-group">
          <label class="form-label" for="inputPassword">Status</label>
          <select class="form-control" v-model="selectedOption">
            <option disabled value="">Escolha um item</option>
            <option v-for="option in options" :key="option.id" :value="option.value">{{ option.text }}</option>
          </select>
        </fieldset>
      </div>

      <div class="col-lg-6">
        <fieldset class="form-group">
          <label class="form-label" for="inputPassword">Senha</label>
          <input type="password" class="form-control" minlength="6" v-model="password" placeholder="Senha">
        </fieldset>
      </div>

    </div><!--.row-->

    <div class="row" style="margin:10px 0 10px 0">
        <label class="form-label semibold">Funções do usuário</label>
    </div>

    <div class="row">
        <div class="checkbox-toggle" v-for="(role, index) in roles" :key="role.id" style="margin-left:20px">
          <span :class="index = index + Math.floor((Math.random() * 1000) + 1)"></span>
          <input type="checkbox" v-model="roleUser" :id="'check-toggle-'+ index" :value="role">
          <label :for="'check-toggle-'+ index">{{role.description}}</label>
        </div>
    </div>

  </Modal>

</template>
<script>
import Table from "./../../../../../components/layouts/Table";
import Modal from "./../../../../../components/layouts/Modal";
import Alert from "./../../../../../components/layouts/Alert";
import filterRoles from "./../../../../../helpers/filterRoles";
import forcePassword from "./../../../../../helpers/forcePassword";

export default {
  name: "EditUser",
  components: {
    Table,
    Modal,
    Alert
  },
  props: ["dataItem"],
  data() {
    return {
      status: false,
      error: false,
      roles: [],
      password: '',
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ],
      passwordInvalid: false
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
    },
    selectedOption: {
      get() {
        return Boolean(this.$store.getters.getItem.active);
      },
      set(value) {
        this.$store.commit("updateActiveUser", Boolean(value));
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
          this.$eventHub.$emit("eventError", { data: error.response });
          this.error = JSON.parse(error.response.data.error);
        });
    },

    sendForm() {
      let data = this.$store.getters.getItem;

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

      const api = `${this.$urlApi}/admin/users/${data._id}`;
      Vue.axios
        .put(
          api,
          {
            name: data.name,
            email: data.email,
            active: data.active,
            local: 'user-edit',
            password: this.password,
            roles: data.roles,
            user_id: this.$store.getters.getUserId,

          },
          {
            headers: {
              authorization: "Bearer " + this.$store.getters.getToken
            }
          }
        )
        .then(response => {
          this.password = "";
          this.error = false;
          this.users = response.data;
          this.total = response.data.total;
          this.status = "Dados do usuário alterados com sucesso.";
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
.col-lg-6 {
  text-align: left
}
</style>
