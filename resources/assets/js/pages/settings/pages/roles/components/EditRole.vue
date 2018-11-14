<template>
  <span>

   <ModalLink
      :idModalLink="$store.getters.getItem ? $store.getters.getItem._id : ''"
      showTypeClassName="tabledit-edit-button btn btn-sm btn-default"
      classIcon="glyphicon glyphicon-pencil"
      :dataItem="dataItem" />


    <Modal :idModal="$store.getters.getItem ? $store.getters.getItem._id : ''"
      titleModal="Editar função"
      sizeModal="lg">

      <div v-if="status && error === false" class="row">
        <Alert className="alert alert-success alert-fill alert-close alert-dismissible fade show">
          {{ status }}
        </Alert>
      </div>

      <div v-if="error && status === false" class="row">
        <Alert className="alert alert-danger alert-fill alert-close alert-dismissible fade show">
          <dl>
            <dt v-for="err in error" :key="err.id">
              {{ cleanData( err ) }}
            </dt>
          </dl>
        </Alert>
      </div>

      <form id="edit-role" @submit.prevent="submitForm">

        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="role">Role Description</label>
              <input v-if="$store.getters.getItem" type="text" required class="form-control" v-model="$store.getters.getItem.description" placeholder="Description">
            </fieldset>
          </div>
           <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
              <input v-if="$store.getters.getItem" type="text" required class="form-control" v-model="$store.getters.getItem.name" placeholder="Example: STAFF_COMMERCIAL">
            </fieldset>
          </div>
        </div>

        <div class="row" style="margin:10px 0 10px 0">
          <label class="form-label semibold">Privilégios</label>
        </div>

        <div class="row">
          <div class="checkbox-toggle" v-for="(privilege, index) in dataPrivilegies" :key="index" style="margin-left:20px">
            <span :class="index = index + generateId"></span>
            <input type="checkbox" v-model="privilegeRole" :id="'check-toggle-'+ index" :value="privilege">
            <label :for="'check-toggle-'+ index">{{ privilege.description }}</label>
          </div>
        </div>

      </form>

      <span slot="btn">
        <button form="edit-role" type="submit" class="btn btn-rounded btn-primary"><i class="glyphicon glyphicon-ok"></i> Salvar Alterações</button>
      </span>

    </Modal>
  </span>
</template>
<script>
import Table from "./../../../../../components/layouts/Table";
import Modal from "./../../../../../components/modals/Modal";
import ModalLink from "./../../../../../components/modals/ModalLink";
import Alert from "./../../../../../components/layouts/Alert";
import { cleanDataApi } from "./../../../../../helpers/tools";

export default {
  name: "EditRole",
  components: {
    Table,
    Modal,
    ModalLink,
    Alert
  },
  props: ["dataPrivilegies", "dataItem"],
  data() {
    return {
      status: false,
      error: false,
      role: {
        name: "",
        description: "",
        privileges: []
      },
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ]
    };
  },
  computed: {
    generateId() {
      return Math.floor(Math.random() * 1000000 + 1);
    },

    privilegeRole: {
      get() {
        return this.$store.getters.getItem
          ? this.$store.getters.getItem.privileges
          : [];
      },
      set(value) {
        this.$store.commit("setItemPrivilege", value);
      }
    }
  },
  methods: {
    cleanData(data) {
      return cleanDataApi(data);
    },
    submitForm() {
      if (!this.$store.getters.getItem) {
        return;
      }

      let data = this.$store.getters.getItem;

      this.status = "Enviando...";

      const api = `${this.$urlApi}/admin/roles/${data._id}`;
      Vue.axios
        .put(
          api,
          {
            name: data.name.toUpperCase(),
            description: data.description,
            privileges: data.privileges,
            default: false,
            action: "edit-role"
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "User-ID": this.$store.getters.getUserId
            }
          }
        )
        .then(response => {
          this.error = false;
          this.roles = response.data;
          this.total = response.data.total;
          this.status = "Função editada com sucesso!";
          this.$emit("reload");
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
          this.status = false;
          this.error = JSON.parse(error.response.data.error);

          setTimeout(() => {
            this.error = false;
          }, 5000);
        });
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
