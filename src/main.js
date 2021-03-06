// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VTooltip from 'v-tooltip'
import App from './App'
import router from './router'
import store from './store/'
import 'bootstrap/scss/bootstrap.scss'
import './scss/main.scss'

Vue.use(VueFire)
Vue.use(VTooltip)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
