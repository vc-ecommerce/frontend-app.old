<template>
    <textarea class="form-control" v-model="dataDesc"></textarea>
 </template>
<script>
export default {
  name: "HtmlEditor",
  props: {
    model: {
      required: true
    },
    height: {
      type: String,
      default: "150"
    },
    dataDesc:{
      type: String,
      default: ""
    },
  },
  mounted() {
    let config = {
      height: this.height
    };
    let vm = this;
    config.callbacks = {
      onInit: function() {
        $(vm.$el).summernote("code", vm.model);
      },
      onChange: function() {
        vm.$emit("update:model", $(vm.$el).summernote("code"));
      }
    };
    $(this.$el).summernote(config);
  }
};
</script>
