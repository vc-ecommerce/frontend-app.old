<template>
  <div>
    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Atributo</h3>
            <h3 v-else>{{ total }} Atributos</h3>
          </div>
          <div class="tbl-cell tbl-cell-action-bordered">

            <router-link :to="{ name: 'AttributeCreate' }" class="btn btn-inline"><i class="glyphicon glyphicon-plus"></i> Criar Atributo</router-link>

          </div>
        </div>
      </header>
      <div class="box-typical-body">
        <div class="table-responsive">
          <Table elementId="table-edit" className="table table-hover">
            <template slot="thead">
              <tr>
                <th>Atributos</th>
                <th width="200">Produtos vinculados</th>
                <th class="tabledit-toolbar-column">Editar</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="attribute in attributes.data">
                <td class="tabledit-view-mode">
                  <strong>{{ attribute.name }}</strong>
                  <br>
                  <small v-for="(variation, index) in attribute.variations">
                    <span v-if="index>0">, </span>
                    <span>{{ variation.name }}</span>
                  </small>
                </td>
                <td>
                  <span class="label label-default">-- produtos vinculados</span>
                </td>
                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">

                    <div class="btn-group btn-group-sm" style="float: none  !important;">

                      <button v-if="!attribute.default" @click.prevent="clickEdit(attribute._id)" type="button" class="tabledit-edit-button btn btn-sm btn-default" style="float: none;">
                        <span class="glyphicon glyphicon-pencil"></span>
                      </button>

                      <RemoveAttribute v-if="!attribute.default" :dataAttributes="attributes" :dataItem="attribute"/>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
    </section>
    <section>
      <Pagination v-if="total>15" :pagination="attributes"
        @paginate="getAttributes()"
        :offset="4" />
    </section>
  </div>
</template>
<script>
import RemoveAttribute from "./components/RemoveAttribute";
import Table from "./../../../../components/layouts/Table";
import Pagination from "./../../../../components/paginations/Pagination";
import { cleanRole } from "./../../../../helpers/tools";

export default {
  name: "AttributeList",
  components: {
    RemoveAttribute,
    Table,
    Pagination
  },
  props: [],
  data() {
    return {
      total: 0,
      attributes: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      roles: []
    };
  },
  created() {
    this.$eventHub.$emit("eventBreadcrumbs", 'Listar atributos');
  },
  mounted() {
    this.getAttributes();
    const parent = this;
    this.$eventHub.$on("totalAttribute", function(t) {
      parent.total = t;
    });

  },
  methods: {
    clickEdit(id) {
      this.$router.push({ name: 'AttributeEdit', params: { id }})
    },
    getAttributes() {
      const api = `${this.$urlApi}/admin/attributes?page=${this.attributes.current_page}`;
      Vue.axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "User-ID": this.$store.getters.getUserId
          }
        })
        .then(response => {
          this.attributes = response.data;
          this.total = response.data.total;
        })
        .catch(error => {
          this.$eventHub.$emit("eventError", { data: error.response });
        });
    }
  }
};
</script>

<style scoped>
small {
    font-size: 11px;
    color: #999;
    font-weight: normal;
}
</style>
