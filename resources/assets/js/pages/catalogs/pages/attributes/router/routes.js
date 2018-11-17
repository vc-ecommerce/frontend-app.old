import AttributeList from './../AttributeList'
import AttributeCreate from './../AttributeCreate'
import AttributeEdit from './../AttributeEdit'

export const routes = [
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
];
