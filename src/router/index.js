import Vue from 'vue'
import Router from 'vue-router'
import Lead from '@/components/Lead'
import FranchisePage from '@/components/FranchisePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lead',
      component: Lead
    },
    {
      path: '/franchise/:id',
      component: FranchisePage,
      name: 'FranchisePage'
    }
  ]
})
