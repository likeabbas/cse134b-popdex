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

        <Franchise v-for="(brand, index) in curBrands"
                   v-bind:brand="brand"
                   :key="brand.uid">
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
      brands: [],
      sharedState: store,
      curBrands: []
    }
  },
  created () {
    this.fetchBrandsMain()
  },
  methods: {
    fetchBrandsMain: function () {
      var vm = this
      // If we have fetched the brands before then don't fetch them again
      if (vm.sharedState.state.brandData.length === 0) {
        console.log('fetching brands from service')
        FBService.fetchBrands(vm.sharedState.firebase)
          .then(function (data) {
            var rawData = data.val()
            var brandList = []

            for (var key in rawData) {
              console.log(key)
              var obj = rawData[key]
              obj.uid = key
              brandList.push(obj)
            }

            brandList = brandList.sort(function (a, b) {
              return a.brand.localeCompare(b.brand)
            })
            vm.brands = brandList
            vm.sharedState.state.brandData = brandList
            vm.curBrands = brandList
          }
        )
      } else {
        console.log('Have have brands')
        vm.curBrands = vm.sharedState.state.brandData
        vm.brands = vm.sharedState.state.brandData
      }
    },
    filterBrands: function () {
      var vm = this
      vm.curBrands = Object.assign({},
        filterService.filterBrands(vm.brands,
          document.getElementById('mainGuideFilterSearch').value))
    }

  }
}
</script>
