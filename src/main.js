// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import store from './services/storage'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    privateState: {},
    sharedState: store
  },
  template: '<App/>',
  components: { App }
})
