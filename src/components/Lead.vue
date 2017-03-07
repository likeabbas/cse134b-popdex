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
              v-bind:itemBrand="item.itemBrand" 
              v-bind:itemName="item.itemName" 
              v-bind:itemPictureSource="item.itemPictureSource"
              :key="item.itemName">
            </FrontPage>
          </div>
        </div>

    </div>
</template>

<script>
import FrontPage from './LeadComponents/FrontPagePopComponent'

export default {
  components: {
    FrontPage
  },
  name: 'Lead',
  data () {
    return {
      // get object from server and render FrontPagePopComponent
      items: [
        {
          itemBrand: 'Abbas',
          itemName: 'No',
          itemPictureSource: 'http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD'
        },
        {
          itemBrand: 'Abbas',
          itemName: 'No',
          itemPictureSource: 'http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD'
        },
        {
          itemBrand: 'Abbas',
          itemName: 'No',
          itemPictureSource: 'http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD'
        }
      ]
    }
  }
}
</script>
