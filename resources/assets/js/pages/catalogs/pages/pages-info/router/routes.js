import PageList from './../PageList'
import PageCreate from './../PageCreate'
import PageEdit from './../PageEdit'

export const routes = [
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
];
