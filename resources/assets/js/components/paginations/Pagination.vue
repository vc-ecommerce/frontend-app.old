<template>
  <div>
    <ul class="pagination">

      <li class="page-item" v-if="pagination.current_page > 1">
        <a class="page-link" href="javascript:void(0)" aria-label="Previous" v-on:click.prevent="changePage(pagination.current_page - 1)">
          <span aria-hidden="true">«</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>

      <li class="page-item" v-for="page in pagesNumber" :class="{'active': page == pagination.current_page}" :key="page">
        <a class="page-link" href="javascript:void(0)" v-on:click.prevent="changePage(page)">{{ page }} <span class="sr-only">(current)</span></a>
      </li>

      <li class="page-item" v-if="pagination.current_page < pagination.last_page">
        <a class="page-link" href="javascript:void(0)" aria-label="Next" v-on:click.prevent="changePage(pagination.current_page + 1)">
          <span aria-hidden="true">»</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
  export default{
    props: {
      pagination: {
        type: Object,
        required: true
      },
      offset: {
        type: Number,
        default: 4
      }
    },
    computed: {
      pagesNumber() {
        if (!this.pagination.to) {
          return [];
        }
        let from = this.pagination.current_page - this.offset;
        if (from < 1) {
          from = 1;
        }
        let to = from + (this.offset * 2);
        if (to >= this.pagination.last_page) {
          to = this.pagination.last_page;
        }
        let pagesArray = [];
        for (let page = from; page <= to; page++) {
          pagesArray.push(page);
        }
        return pagesArray;
      }
    },
    methods : {
      changePage(page) {
        this.pagination.current_page = page;
        this.$emit('paginate');
      }
    }
  }
</script>
