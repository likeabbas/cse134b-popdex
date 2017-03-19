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
      console.log('fetch trending')
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
      var guideData = vm.sharedState.state.mainGuidePage
      var brandData = vm.sharedState.state.listOfBrands

      if (Object.keys(guideData).length === 0) {
        console.log('fetching brands from service')
        FBService.fetchBrands(vm.sharedState.firebase)
          .then(function (data) {
            vm.sharedState.state.mainGuidePage = data.val()

            console.log('GUIDE DATA' + guideData)
            for (var key in guideData) {
              // console.log(guideData[key].brand)
              brandData.push(guideData[key].brand)
            }
            // console.log(brandData)
            vm.sharedState.state.listOfBrands =
              brandData.sort(function (a, b) {
                return a.localeCompare(b)
              })
            console.log(vm.sharedState.state.listOfBrands)
            console.log('after fetch')
            for (var i = 0; i < brandData.length; i++) {
              // console.log(brandData[i])
              vm.fetchBrandItems(brandData[i])
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
            console.log(data.val())
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

              console.log('couldn\'t get image')
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
        console.log('could not get image')
      }
      return img.complete || (img.width + img.height) > 0
    },
    awaitingFunction: function (img, imageUrl) {
      img.src = imageUrl
    }

  }
}
</script>
