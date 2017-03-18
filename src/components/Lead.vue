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
      if (Object.keys(vm.sharedState.state.mainGuidePage).length === 0) {
        console.log('fetching brands from service')
        FBService.fetchBrands(vm.sharedState.firebase)
          .then(function (data) {
            vm.sharedState.state.mainGuidePage = data.val()
            console.log(vm.sharedState.state.mainGuidePage)
            for (var key in vm.sharedState.state.mainGuidePage) {
              console.log(vm.sharedState.state.mainGuidePage[key].brand)
              vm.sharedState.state.listOfBrands.push(vm.sharedState.state.mainGuidePage[key].brand)
            }
            console.log('after fetch')
            for (var i = 0; i < vm.sharedState.state.listOfBrands.length; i++) {
              console.log(vm.sharedState.state.listOfBrands[i])
              vm.fetchBrandItems(vm.sharedState.state.listOfBrands[i])
            }
          })
      }
    },

    fetchBrandItems: function (curBrand) {
      var vm = this
      if (vm.sharedState.state.brands[curBrand] === undefined) {
        vm.sharedState.state.brandToListOfItemNames[curBrand] = []
        FBService.fetchByBrand(vm.sharedState.firebase, curBrand)
          .then(function (data) {
            console.log(data.val())
            vm.sharedState.state.brands[curBrand] = data.val()
          })
          .then(async function () {
            var i = 0
            for (var key in (vm.sharedState.state.brands[curBrand])) {
              var curImageSource = vm.sharedState.state.brands[curBrand][key].picture_src
              var curItemName = vm.sharedState.state.brands[curBrand][key].name

              vm.sharedState.state.images[i] = curImageSource
              vm.sharedState.state.brandToListOfItemNames[curBrand].push(curItemName)

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
