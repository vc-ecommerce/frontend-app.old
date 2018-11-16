import Vue from 'vue'
import Router from 'vue-router'
import PageList from './../PageList'
import PageCreate from './../PageCreate'
import PageEdit from './../PageEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/catalogs/pages',
      name: 'PageList',
      component: PageList
    },
    {
      path: '/catalogs/pages/create',
      name: 'PageCreate',
      component: PageCreate
    },
    {
      path: '/catalogs/pages/:id/edit',
      name: 'PageEdit',
      component: PageEdit
    }
  ]
})
