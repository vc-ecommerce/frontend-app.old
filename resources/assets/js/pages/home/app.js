import ChartSaleWeek from './components/ChartSaleWeek'
import OrderApproved from './components/OrderApproved'
import OrderCanceled from './components/OrderCanceled'
import OrderDone from './components/OrderDone'
import OrderPending from './components/OrderPending'
import OrderRecent from './components/OrderRecent'
import RecentComments from './components/RecentComments'
import Contacts from './components/Contacts'

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
    Contacts,
  },
  mounted: function () {
    document.getElementById('content').style.display = 'block';
  }
});
