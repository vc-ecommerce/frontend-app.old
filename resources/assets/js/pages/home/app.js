/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import OrderApproved from './components/statistics/box/OrderApproved'
import OrderCanceled from './components/statistics/box/OrderCanceled'
import OrderDone from './components/statistics/box/OrderDone'
import OrderPending from './components/statistics/box/OrderPending'
import OrderRecent from './components/box-panel/OrderRecent'
import RecentComments from './components/box-panel/RecentComments'
import Contacts from './components/box-panel/Contacts'
import SaleWeek from './components/statistics/chart/SaleWeek'

const app = new Vue({
  el: '#content',
  components: {
    'sale-week': SaleWeek,
    'order-approved': OrderApproved,
    'order-canceled': OrderCanceled,
    'order-done': OrderDone,
    'order-pending': OrderPending,
    'order-recent': OrderRecent,
    'recent-comments': RecentComments,
    'contacts': Contacts,
  },
  mounted: function () {
    document.getElementById('content').style.display = 'block';
  }
});
