  <template>
    <div id="content" class="container">

        <div class="row">
          <div class="col s12">
            <div id="preContent">
              <h4>Trending Pops</h4>
            </div>
          </div>
          
          <div id="mainContent">
            <FrontPage 
              v-for="item in items" 
              v-bind:item="item"
              :key="item.name">
            </FrontPage>
          </div>
        </div>

    </div>
</template>

<script>
import FrontPage from './LeadComponents/FrontPagePopComponent'
import store from '../services/storage'
import FBService from '../services/fbservice'

export default {
  components: {
    FrontPage
  },
  name: 'Lead',
  data () {
    return {
      items: [],
      sharedState: store
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      var vm = this
      FBService.fetchTrending(this.sharedState.firebase)
      .then(
        function (data) {
          var pops = data.val()
          var num = 0
          for (var prop in pops) {
            pops[prop].brand = data.key
            vm.items.push(pops[prop])
            if (num === 2) break
            num++
          }
          vm.fetchBrandData()
        })
    },
    fetchBrandData: function () {
      var vm = this
      var guideData = vm.sharedState.state.brandData

      if (Object.keys(guideData).length === 0) {
        FBService.fetchBrands(vm.sharedState.firebase)
          .then(function (data) {
            var rawData = data.val()
            var brandList = []

            for (var key in rawData) {
              var obj = rawData[key]
              obj.uid = key
              brandList.push(obj)
            }

            brandList = brandList.sort(function (a, b) {
              return a.brand.localeCompare(b.brand)
            })

            vm.sharedState.state.brandData = brandList

            for (var i = 0; i < brandList.length; i++) {
              vm.fetchBrandItems(brandList[i].brand)
            }
          })
      }
    },
    fetchBrandItems: function (curBrand) {
      var vm = this
      var brands = vm.sharedState.state.brands
      var itemMap = vm.sharedState.state.brandToListOfItemNames

      if (brands[curBrand] === undefined) {
        itemMap[curBrand] = []
        FBService.fetchByBrand(vm.sharedState.firebase, curBrand)
          .then(function (data) {
            brands[curBrand] = data.val()
          })
          .then(async function () {
            var i = 0
            for (var key in (brands[curBrand])) {
              var curImageSource = brands[curBrand][key].picture_src
              var curItemName = brands[curBrand][key].name

              vm.sharedState.state.images[i] = curImageSource
              itemMap[curBrand].push(curItemName)

              var img = new Image()
              img.onload = function () {
                vm.isCached(curImageSource)
              }

              await vm.awaitingFunction(img, curImageSource)
              i++
            }
          })
      }
    },
    isCached: function (imageUrl) {
      var img = new Image()
      try {
        img.src = imageUrl
      } catch (e) {
      }
      return img.complete || (img.width + img.height) > 0
    },
    awaitingFunction: function (img, imageUrl) {
      img.src = imageUrl
    }

  }
}
</script>
