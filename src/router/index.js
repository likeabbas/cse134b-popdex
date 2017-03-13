import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import SpecificItem from '../components/SpecificItem'
import Lead from '@/components/Lead'
import ProfilePage from '@/components/ProfilePage'
import Guide from '@/components/MainGuide'
import BrandPage from '@/components/BrandPage'
import SpecificItemPage from '@/components/SpecificItem'

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
    },
    {
      path: '/ayy',
      name: 'Item',
      component: SpecificItem
    },
    {
      path: '/guide',
      component: Guide
    },
    {
      path: '/brand/:id',
      component: BrandPage,
      name: 'brand'
    },
    {
      path: '/item/:itemId',
      component: SpecificItemPage,
      name: 'item',
      props: true
    }

  ]
})
