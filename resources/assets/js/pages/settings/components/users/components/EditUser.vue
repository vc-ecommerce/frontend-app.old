<template>
  <span>

    <LinkModal
      :idLinkModal="$store.getters.getItem ? $store.getters.getItem._id : ''"
      showTypeClassName="tabledit-edit-button btn btn-sm btn-default"
      classIcon="glyphicon glyphicon-pencil"
      :dataItem="dataItem" />

    <ModalSubmit
      :idModal="$store.getters.getItem ? $store.getters.getItem._id : ''"
      titleModal="Editar dados de Usuário"
      sizeModal="lg"
      btnTitle="Salvar Alterações" @submit="submitForm">

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
            <input v-if="$store.getters.getItem" type="text" required class="form-control" v-model="$store.getters.getItem.name" placeholder="Nome">
          </fieldset>
        </div>
        <div class="col-lg-6">
          <fieldset class="form-group">
            <label class="form-label" for="inputEmail">Email</label>
            <input v-if="$store.getters.getItem" type="email" required class="form-control" placeholder="E-mail" v-model="$store.getters.getItem.email">
          </fieldset>
        </div>
      </div>
      <!--.row-->
      <div class="row">
        <div class="col-lg-6">
          <fieldset class="form-group">
            <label class="form-label" for="inputPassword">Status</label>
            <select class="form-control" required v-model="selectedOption">
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
      </div>
      <!--.row-->
      <div class="row" style="margin:10px 0 10px 0">
        <label class="form-label semibold">Funções do usuário</label>
      </div>
      <div class="row">
        <div class="checkbox-toggle" v-for="(role, index) in dataRoles" :key="role.id" style="margin-left:20px">
          <span :class="index = index + Math.floor((Math.random() * 1000000) + 1)"></span>
          <input type="checkbox" v-model="roleUser" :id="'check-toggle-'+ index" :value="role">
          <label :for="'check-toggle-'+ index">{{role.description}}</label>
        </div>
      </div>
    </ModalSubmit>
  </span>
</template>
<script>
import Table from "./../../../../../components/layouts/Table";
import ModalSubmit from "./../../../../../components/layouts/ModalSubmit";
import LinkModal from "./../../../../../components/layouts/LinkModal";
import Alert from "./../../../../../components/layouts/Alert";
import { cleanRole, forcePassword } from "./../../../../../helpers/tools";

export default {
  name: "EditUser",
  components: {
    Table,
    ModalSubmit,
    LinkModal,
    Alert
  },
  props: ["dataItem", "dataRoles"],
  data() {
    return {
      status: false,
      error: false,
      password: "",
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
        return cleanRole(
          this.$store.getters.getItem ? this.$store.getters.getItem.roles : []
        );
      },
      set(value) {
        this.$store.commit("updateRoleUser", value);
      }
    },
    selectedOption: {
      get() {
        return Boolean(
          this.$store.getters.getItem
            ? this.$store.getters.getItem.active
            : false
        );
      },
      set(value) {
        this.$store.commit("updateActiveUser", Boolean(value));
      }
    }
  },
  methods: {
    submitForm() {
      if (!this.$store.getters.getItem) {
        return;
      }

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
            local: "user-edit",
            password: this.password,
            roles: data.roles
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "User-ID": this.$store.getters.getUserId
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
.row,
.col-lg-6 {
  text-align: left;
}
</style>
