import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Screening from '@/pages/Screening'
import Seat from '@/pages/Seat'
import Payment from '@/pages/Payment'
import Done from '@/pages/Done'
import ScreeningDetail from '@/components/ScreeningDetail'

// Console
import ConsolePage from '@/pages/console/ConsolePage'
import Login from '@/pages/console/Login'
import Dashboard from '@/pages/console/Dashboard'
import MovieAvailable from '@/pages/console/section/MovieAvailable'
import ManagePayment from '@/pages/console/section/Payment'
import ManageTheatre from '@/pages/console/section/Theatre'
import ManageScreening from '@/pages/console/section/Screening'
import MovieEditor from '@/pages/console/MovieEditor'

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
      component: Screening,
      children: [
        {
          path: '',
          name: 'Screening',
          component: ScreeningDetail
        },
        {
          path: 'screening/:screeningId',
          name: 'Seat Selection',
          component: Seat
        }
      ]
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
    },
    {
      path: '/console',
      component: ConsolePage,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: '',
          component: Dashboard,
          children: [
            {
              path: 'payment',
              name: 'Manage Payment',
              component: ManagePayment
            },
            {
              path: 'movie',
              name: 'Manage Movie Available',
              component: MovieAvailable
            },
            {
              path: 'theater',
              name: 'Manage Theater',
              component: ManageTheatre
            },
            {
              path: 'screening',
              name: 'Manage Screening',
              component: ManageScreening
            },
            {
              path: 'movie/edit/:id',
              name: 'MovieEditor',
              component: MovieEditor
            }
          ]
        }
      ]
    }
  ]
})
