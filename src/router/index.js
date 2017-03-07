import Vue from 'vue'
import Router from 'vue-router'

import Lead from '@/components/Lead'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lead',
      component: Lead
    }
  ]
})
