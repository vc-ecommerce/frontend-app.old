<template>
  <Modal
    titleLink="Criar"
    classIcon="glyphicon glyphicon-plus"
    titleModal="Criar Novo Usuário"
    btnSave="Salvar">

      carregando

    </Modal>

</template>
<script>
import Table from "./../../../../../components/layouts/Table";
import Modal from "./../../../../../components/layouts/Modal";
export default {
  name: "UserCreateModal",
  components: {
    Table,
    Modal
  },
  props: [],
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
