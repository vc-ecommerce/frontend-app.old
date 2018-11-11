<template>
  <form @submit.prevent="submitFormVariation">

    <div class="row">
      <div class="col-sm-12">
        <h3>Variações do atributo</h3>
      </div>

      <div class="col-sm-12">
        <Table elementId="table-edit" className="table table-hover">

            <template slot="tbody">
              <tr>
                <td class="tabledit-view-mode">
                  teste
                </td>
                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                    <div class="btn-group btn-group-sm" style="float: none;">
                      <button type="button" class="tabledit-edit-button btn btn-sm btn-default" style="float: none;">
                        <span class="glyphicon glyphicon-pencil"></span>
                      </button>
                        <button type="button" class="tabledit-delete-button btn btn-sm btn-danger" style="float: none;">
                          <span class="glyphicon glyphicon-trash"></span>
                        </button>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </Table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <input type="text" required class="form-control" v-model="name" placeholder="Nome da variação do atributo">
      </div>
      <div class="col-sm-4">
         <button class="btn btn-inline" type="submit">
          <i class="glyphicon glyphicon-ok"></i> Criar variação
        </button>
      </div>
    </div>

  </form>

</template>

<script>
import Table from "./../../../../../components/layouts/Table";

  export default {
    name: 'AttributeVariation',
    props: [],
    components: {
      Table
    },
    data() {
      return {

      }
    },
    methods: {
      submitFormVariation() {

      }
    }



  }
</script>

<style scoped>
.row {
  padding: 20px;
}
span {
  font-size: 12px;
  color: #999;
}
.col-btn {
  margin-top: -20px;
}


.glyphicon-pencil:before {
    color: #fff;
}

.glyphicon-trash:before {
    color: #fff;
}

</style>
