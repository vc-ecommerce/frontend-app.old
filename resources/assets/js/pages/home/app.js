require('./../../bootstrap')

import ChartSaleWeek from './components/ChartSaleWeek'
import OrderApproved from './components/OrderApproved'
import OrderCanceled from './components/OrderCanceled'
import OrderDone from './components/OrderDone'
import OrderPending from './components/OrderPending'
import OrderRecent from './components/OrderRecent'
import RecentComments from './components/RecentComments'
import RecentContacts from './components/RecentContacts'

const app = new Vue({
  el: '#content',
  components: {
    ChartSaleWeek,
    OrderApproved,
    OrderCanceled,
    OrderDone,
    OrderPending,
    OrderRecent,
    RecentComments,
    RecentContacts,
  },
  mounted: function () {
    document.getElementById('content').style.display = 'block';
  }
});
