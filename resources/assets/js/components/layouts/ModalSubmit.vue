<template>
  <div :id="idModal" :class="!sizeModal ? 'modal fade' : 'modal fade bd-example-modal-'+ sizeModal" tabindex="-1" role="dialog">
    <div :class="!sizeModal ? 'modal-dialog' : 'modal-dialog modal-'+ sizeModal">
      <div class="modal-content">
        <form @submit.prevent="submitForm">
          <div class="modal-header">
            <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">
              <i class="font-icon-close-2"></i>
            </button>
            <h4 class="modal-title">{{ titleModal }}</h4>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-rounded btn-default" data-dismiss="modal">Fechar</button>
            <button type="submit" class="btn btn-rounded btn-primary">{{ btnTitle }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalSubmit",
  props: {
    idModal: {
      type: String,
      default: "myModal"
    },
    sizeModal: {
      type: String,
      default: ""
    },
    titleModal: {
      type: String,
      required: true
    },
    btnTitle: {
      type: String,
      default: "Salvar",
      require: true
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit');
    }
  }
};
</script>
