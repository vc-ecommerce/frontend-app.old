import Vue from 'vue'
import Router from 'vue-router'
import AttributeList from './../AttributeList'
import AttributeCreate from './../AttributeCreate'
import AttributeEdit from './../AttributeEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/catalogs/attributes',
      name: 'AttributeList',
      component: AttributeList
    },
    {
      path: '/catalogs/attributes/create',
      name: 'AttributeCreate',
      component: AttributeCreate
    },
    {
      path: '/catalogs/attributes/:id/edit',
      name: 'AttributeEdit',
      component: AttributeEdit
    }
  ]
})
