<template>
  <div>
    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Página</h3>
            <h3 v-else>{{ total }} Páginas</h3>
          </div>
          <div class="tbl-cell tbl-cell-action-bordered">

            <router-link :to="{ name: 'PageCreate' }" class="btn btn-inline"><i class="glyphicon glyphicon-plus"></i> Criar Página</router-link>

          </div>
        </div>
      </header>
      <div class="box-typical-body">
        <div class="table-responsive">
          <Table elementId="table-edit" className="table table-hover">
            <template slot="thead">
              <tr>
                <th>Páginas</th>
                <th class="tabledit-toolbar-column">Editar</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="(page, index) in pages.data" :key="index">
                <td class="tabledit-view-mode">
                  {{ page.name }}
                </td>
                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">

                    <div class="btn-group btn-group-sm" style="float: none  !important;">

                      <ChangeStatus :dataItem="page"/>

                      <button v-if="!page.default" @click.prevent="clickEdit(page._id)" type="button" class="tabledit-edit-button btn btn-sm btn-default" style="float: none;">
                        <span class="glyphicon glyphicon-pencil"></span>
                      </button>

                      <RemovePage v-if="!page.default" :dataPages="pages" :dataItem="page"/>
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
      <Pagination v-if="total>15" :pagination="pages"
        @paginate="getPages()"
        :offset="4" />
    </section>
  </div>
</template>
<script>
import RemovePage from "./components/RemovePage";
import ChangeStatus from './components/ChangeStatus'
import Table from "./../../../../components/layouts/Table";
import Pagination from "./../../../../components/paginations/Pagination";
import { cleanRole } from "./../../../../helpers/tools";

export default {
  name: "PageList",
  components: {
    RemovePage,
    ChangeStatus,
    Table,
    Pagination
  },
  props: [],
  data() {
    return {
      total: 0,
      pages: {
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
    this.$eventHub.$emit("eventBreadcrumbs", 'Listar páginas');
  },
  mounted() {
    this.getPages();
    const vm = this;
    this.$eventHub.$on("totalPage", function(t) {
      vm.total = t;
    });

  },
  methods: {
    clickEdit(id) {
      this.$router.push({ name: 'PageEdit', params: { id }})
    },
    getPages() {
      const api = `${this.$urlApi}/admin/pages?page=${this.pages.current_page}`;
      Vue.axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getAuthToken,
            "User-ID": this.$store.getters.getAuthId
          }
        })
        .then(response => {
          this.pages = response.data;
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
