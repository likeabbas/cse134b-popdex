import Vue from 'vue'
import Router from 'vue-router'

import Lead from '@/components/Lead'
import SpecificItem from '../components/SpecificItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lead',
      component: Lead
    },
    {
      path: '/ayy',
      name: 'Item',
      component: SpecificItem
    }
  ]
})
