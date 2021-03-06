import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Screening from '@/pages/Screening'
import Seat from '@/pages/Seat'
import Reservation from '@/pages/Reservation'
import Done from '@/pages/Done'
import ScreeningDetail from '@/components/ScreeningDetail'

// Console
import ConsolePage from '@/pages/console/ConsolePage'
import Login from '@/pages/console/Login'
import Dashboard from '@/pages/console/Dashboard'
import MovieAvailable from '@/pages/console/section/MovieAvailable'
import ManageReservation from '@/pages/console/section/Reservation'
import ManageTheatre from '@/pages/console/section/Theatre'
import ManageScreening from '@/pages/console/section/Screening'
import ManageAccount from '@/pages/console/section/Account'
import ManageSeatType from '@/pages/console/section/SeatType'
import MovieEditor from '@/pages/console/editor/MovieEditor'
import ScreeningEditor from '@/pages/console/editor/ScreeningEditor'
import TheatreEditor from '@/pages/console/editor/TheatreEditor'
import AccountEditor from '@/pages/console/editor/AccountEditor'

import { checkAuth, checkIsLogin } from './checkAuth'

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
      path: '/reservation/:reserveId',
      name: 'reservation',
      component: Reservation
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
          component: Login,
          beforeEnter: checkIsLogin
        },
        {
          path: '',
          component: Dashboard,
          beforeEnter: checkAuth,
          children: [
            {
              path: '',
              redirect: 'reservation'
            },
            {
              path: 'reservation',
              name: 'Manage Reservation',
              component: ManageReservation
            },
            {
              path: 'movie',
              name: 'Manage Movie Available',
              component: MovieAvailable
            },
            {
              path: 'theatre',
              name: 'Manage Theatre',
              component: ManageTheatre
            },
            {
              path: 'screening',
              name: 'Manage Screening',
              component: ManageScreening
            },
            {
              path: 'account',
              name: 'Manage Account',
              component: ManageAccount
            },
            {
              path: 'seat-type',
              name: 'Manage Seat Type',
              component: ManageSeatType
            },
            {
              path: 'movie/edit/:id',
              name: 'MovieEditor',
              component: MovieEditor,
              alias: 'movie/view/:id'
            },
            {
              path: 'movie/add',
              name: 'Add Movie',
              component: MovieEditor
            },
            {
              path: 'screening/add',
              name: 'Add Screening',
              component: ScreeningEditor
            },
            {
              path: 'account/add',
              name: 'Add Account',
              component: AccountEditor
            },
            {
              path: 'theatre/add',
              name: 'Add Theatre',
              component: TheatreEditor
            },
            {
              path: 'screening/edit/:id',
              name: 'ScreeningEditor',
              component: ScreeningEditor,
              alias: 'screening/view/:id'
            },
            {
              path: 'theatre/edit/:id',
              name: 'TheatreEditor',
              component: TheatreEditor,
              alias: 'theatre/view/:id'
            },
            {
              path: 'account/edit/:id',
              name: 'AccountEditor',
              component: AccountEditor
            }
          ]
        }
      ]
    }
  ]
})
