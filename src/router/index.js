import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Screening from '@/pages/Screening'
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
      path: '/movie/:id',
      name: 'Screening',
      component: Screening
    },
    {
      path: '/movie/:id/screening/:screening_id',
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
