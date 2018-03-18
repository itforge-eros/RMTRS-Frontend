import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Showtime from '@/pages/Showtime'
import Seat from '@/pages/Seat'
import Payment from '@/pages/Payment'
import Done from '@/pages/Done'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/showtime',
      name: 'Showtime',
      component: Showtime
    },
    {
      path: '/seat',
      name: 'Seat Selection',
      component: Seat
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/done',
      name: 'Done',
      component: Done
    }
  ]
})
