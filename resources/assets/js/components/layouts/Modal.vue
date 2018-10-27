<template>
  <span>


                <a href="javascript:void(0)" class="btn btn-inline" data-toggle="modal"
              data-target=".bd-example-modal-lg">
                  <i class="glyphicon glyphicon-plus"></i> Criar novo</a>

    <button class="btn btn-inline btn-primary"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"> <i class="glyphicon glyphicon-plus"></i> Criar</button>

    <div class="modal fade bd-example-modal-lg"
       tabindex="-1"
       role="dialog"
       aria-labelledby="myLargeModalLabel"
       aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">
              <i class="font-icon-close-2"></i>
            </button>
            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-rounded btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-rounded btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div><!--.modal-->

  </span>
</template>

<script>
export default {
  name: "Modal",
  props: []
};
</script>
