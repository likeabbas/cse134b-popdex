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
import store from '../storage'
import FBService from '../fbservice'
export default {
  components: {
    FrontPage
  },
  name: 'Lead',
  data () {
    return {
      // get object from server and render FrontPagePopComponent
      items: [],
      sharedState: store
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    // '$route': 'fetchTrending'
  },
  methods: {
    fetchData: function () {
      console.log('fetch trending')
      var vm = this
      FBService.fetchTrending(this.sharedState.firebase)
        .then(
          function (data) {
            var pops = data.val()
            console.log('got pops\n' + JSON.stringify(pops))
            var num = 0
            for (var prop in pops) {
              pops[prop].brand = data.key
              vm.items.push(pops[prop])
              if (num === 2) break
              num++
            }
          })
    }
  }
}
</script>
