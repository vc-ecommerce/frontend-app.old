<template>
  <span>
    <a v-if="showType =='href'" v-on:click="fillDataStore()" href="javascript:void(0)" :class="showTypeClassName"
      data-toggle="modal" :data-target="!sizeModal ? '#'+idLinkModal : '.bd-example-modal-'+ sizeModal">
      <i :class="classIcon"></i> {{ titleLink || '' }}
    </a>
    <button v-else v-on:click="fillDataStore()" type="button" :class="showTypeClassName"
      data-toggle="modal" :data-target="!sizeModal ? '#'+idLinkModal : '.bd-example-modal-'+ sizeModal">
      <i :class="classIcon"></i> {{ titleLink || '' }}
    </button>
  </span>
</template>

<script>
export default {
  name: 'LinkModal',
  props: {
    showType: {
      type: String,
      default: 'button'
    },
    showTypeClassName: {
      default: 'btn btn-inline'
    },
    sizeModal: {
      type: String,
      default: ""
    },
    idLinkModal: {
      type: String,
      default: "myModal"
    },
    classIcon: {
      type: String,
      required: true
    },
    titleLink: {
      type: String,
      required: false
    },
    dataItem: {
      type: Object,
      require: false
    }
  },
  methods:{
    fillDataStore:function(){
      this.$store.commit('setItem',this.dataItem);
    }
  }
}
</script>
