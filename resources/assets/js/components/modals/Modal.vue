<template>
  <div :id="idModal" :class="!sizeModal ? 'modal fade' : 'modal fade bd-example-modal-'+ sizeModal" tabindex="-1" role="dialog">
    <div :class="!sizeModal ? 'modal-dialog' : 'modal-dialog modal-'+ sizeModal">
      <div class="modal-content">
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
          <slot name="btn"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
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
    }
  }
};
</script>
