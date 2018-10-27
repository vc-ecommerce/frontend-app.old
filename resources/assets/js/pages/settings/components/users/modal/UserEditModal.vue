<template>
  <Modal
    sizeModal="lg"
    showTypeClassName="tabledit-edit-button btn btn-sm btn-default"
    classIcon="glyphicon glyphicon-pencil"
    titleModal="Editar dados de Usuário"
    btnSave="Salvar" :dataItem="dataItem">

      <div class="row">
					<div class="col-lg-4">
						<fieldset class="form-group">
							<label class="form-label semibold" for="exampleInput">First Name</label>
							<input type="text" class="form-control" v-model="$store.getters.getItem.name" placeholder="First Name">
							<small class="text-muted">We'll never share your email with anyone else.</small>
						</fieldset>
					</div>
					<div class="col-lg-4">
						<fieldset class="form-group">
							<label class="form-label" for="exampleInputEmail1">Email address</label>
							<input type="email" class="form-control" placeholder="Enter email" v-model="$store.getters.getItem.email">
						</fieldset>
					</div>
					<div class="col-lg-4">
						<fieldset class="form-group">
							<label class="form-label" for="exampleInputPassword1">Password</label>
							<input type="password" class="form-control" placeholder="Password">
						</fieldset>
					</div>
				</div><!--.row-->





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
  props: ['dataItem'],
  data() {
    return {

    };
  },
  computed: {
    teste() {
      console.log(this.$store.getters.getItem)
    }

  },

};
</script>

<style scoped>
</style>
