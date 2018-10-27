<template>
  <span>

    <button type="button" v-if="showButton" :class="showButtonCss"
      data-toggle="modal" :data-target="!sizeModal ? '#myModal' : '.bd-example-modal-'+ sizeModal">
      <i :class="classIcon"></i> {{ titleLink || '' }}
    </button>

    <a v-else href="javascript:void(0)" :class="showButtonCss"
      data-toggle="modal" :data-target="!sizeModal ? '#myModal' : '.bd-example-modal-'+ sizeModal">
      <i :class="classIcon"></i> {{ titleLink || '' }}
    </a>

    <div id="myModal" :class="!sizeModal ? 'modal fade' : 'modal fade bd-example-modal-'+ sizeModal" tabindex="-1" role="dialog">
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
            <button type="button" class="btn btn-rounded btn-primary">{{ btnSave }}</button>
          </div>
        </div>
      </div>
    </div><!--.modal-->

  </span>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showButton: false,
    showButtonCss: {
      default: 'btn btn-inline'
    },
    sizeModal: {
      type: String,
      default: ""
    },
    classIcon: {
      type: String,
      required: true
    },
    titleLink: {
      type: String,
      required: false
    },
    titleModal:{
      type: String,
      required: true
    },
    btnSave: {
      type: String,
      default: "Salvar",
      require: true
    }
  }
};
</script>
