<template>
<div id=content class="container">
    <div class="row">
      <div class="col s12">
        <div id=preContent>
      
          <form action="#">
            <input id="mainGuideFilterSearch" type=text name=filterSearch placeholder="Filter Search" v-on:keyup="filterBrands()">
          </form>

        </div>
      </div>

      <div class=guideContent>

        <Franchise v-for="(brand, key) in curBrands"
                   v-bind:brand="brand"
                   :key="key">
        </Franchise>

      </div>
    </div>
  </div>
</template>

<script>
import store from '../services/storage'
import Franchise from '@/components/GuideComponents/FranchiseCard'
import FBService from '../services/fbservice'
import filterService from '../services/filterService'

export default {
  name: 'MainGuide',
  components: {Franchise},
  data: function () {
    return {
      brands: {},
      sharedState: store,
      curBrands: {},
      listOfBrands: []
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
      var vm = this
      // If we have fetched the brands before then don't fetch them again
      if (Object.keys(vm.sharedState.state.mainGuidePage).length === 0) {
        console.log('fetching brands from service')
        FBService.fetchBrands(vm.sharedState.firebase)
          .then(function (data) {
            var brands = data.val()
            vm.brands = brands
            vm.sharedState.state.mainGuidePage = brands
            vm.curBrands = brands
            for (var key in brands) {
              vm.listOfBrands.push(brands[key].brand)
            }
            vm.sharedState.state.listOfBrands = vm.listOfBrands
          }
        )
      } else {
        console.log('Have have brands')
        vm.curBrands = vm.sharedState.state.mainGuidePage
        vm.brands = vm.sharedState.state.mainGuidePage
        for (var key in vm.curBrands) {
          vm.listOfBrands.push(vm.curBrands[key].brand)
        }
      }
    },
    filterBrands: function () {
      this.curBrands = Object.assign({}, filterService.filter(this.listOfBrands, this.brands, document.getElementById('mainGuideFilterSearch').value))
    }

  }
}
</script>
