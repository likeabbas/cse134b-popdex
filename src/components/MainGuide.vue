<template>
<div id=content class="container">
    <div class="row">
      <div class="col s12">
        <div id=preContent>

            <a class="waves-effect waves-light btn" style="float: left; margin: 10px;">Pop! Vinyl</a>
            <a class="waves-effect waves-light btn" style="float: left; margin: 10px;">Dorbz</a>
            <a class="waves-effect waves-light btn" style="float: left; margin: 10px;">Myster Vinyl</a>
      
          <form action="#">
            <input type=text name=filterSearch placeholder="Filter Search">
          </form>
        </div>
      </div>
      <div class=guideContent>
        <Franchise v-for="(brand, key) in brands"
                   v-bind:brand="brand"
                   :key="key">
          <router-link to="{path: 'brand', params: {id: brand.brand}}">
          </router-link>
        </Franchise>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../storage'
import Franchise from '@/components/GuideComponents/FranchiseCard'
import FBService from '../fbservice'
export default {
  name: 'MainGuide',
  components: {Franchise},
  data: function () {
    return {
      brands: {},
      sharedState: store
    }
  },
  created () {
    this.fetchBrandsMain()
  },
  watch: {
    // '$route': 'fetchTrending'
  },
  methods: {
    fetchBrandsMain: function () {
      console.log('fetch brands')
      var vm = this
      FBService.fetchBrands(this.sharedState.firebase)
        .then(function (data) {
          var brands = data.val()
          console.log('got brands\n' + JSON.stringify(brands))
          vm.brands = brands
        })
    }
  }
}
</script>
