// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import router from './router'
import { timeAgo } from './util'

Vue.config.productionTip = false

Vue.filter('timeago', timeAgo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
