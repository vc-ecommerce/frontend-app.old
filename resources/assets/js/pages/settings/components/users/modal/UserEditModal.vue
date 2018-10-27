<template>
  <Modal
    :showButton=true
    sizeModal="lg"
    showButtonCss="tabledit-edit-button btn btn-sm btn-default"
    classIcon="glyphicon glyphicon-pencil"
    titleModal="Editar dados de Usuário"
    btnSave="Salvar">

      {{ dataUser }}

    </Modal>

</template>
<script>
import Table from "./../../../../../components/layouts/Table";
import Modal from "./../../../../../components/layouts/Modal";
export default {
  name: "UserEditModal",
  components: {
    Table,
    Modal
  },
  props: ['dataUser'],
  data() {
    return {

    };
  }
};
</script>

<style scoped>
</style>
