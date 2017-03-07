import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Lead from '@/components/Lead'
import ProfilePage from '@/components/ProfilePage'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lead',
      component: Lead
    },
    {
      path: '/user/:id',
      name: 'ProfilePage',
      component: ProfilePage
    }
  ]
})
