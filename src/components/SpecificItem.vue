<template>
  <div class="content container">
    <div class="row">
    
      <ItemView  
        v-bind:itemBrand="brandName" 
        v-bind:itemName="item.name" 
        v-bind:itemPictureSource="item.itemPictureSource">
      </ItemView>

      <div class="col s6">
        <br><br><br><br>
        <table class="striped">
          <tr>
            <td>Market Price</td>
            <td>{{item.price}}</td>
          </tr>
          <tr>
            <td>Edition Size</td>
            <td>{{item.edition}}</td>
          </tr>
          <tr>
            <td>Quantity You Own</td>
            <td></td>
            <td><button class="btn">Update</button></td>
          </tr>
        </table>
      </div>

      <div class="col s12">
        <h4>Related item</h4>
        <img src="http://placehold.it/900x200" class="responsive-img">
      </div> 

    </div>

  </div>
</template>

<script>
  import ItemView from './SpecificItemComponents/ItemView'
  import store from '../storage'

  export default {
    name: 'SpecificItem',
    props: ['brandName', 'item'],
    components: {
      ItemView
    },
    data () {
      return {
        sharedSate: store
        // item: {
        //   itemBrand: 'Abbas',
        //   itemName: 'No',
        //   itemPictureSource: 'http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD',
        //   itemPrice: '$400',
        //   itemQuantity: '9000',
        //   ownerQuantity: '1'
        // }
        // itemId: this.$route.params.itemId,
      }
    },
    created () {
      // this.fetchData()
      this.please()
    },
    methods: {
      // fetchData: function() {
      //   var vm = this
      //   console.log("in specific item fetch")
      //   FBService.fetchItem(vm.sharedSate.firebase, vm.brandName, vm.item.name).then(function (data) )
      // }
      please () {
        console.log(this.item)
      }
    }
  }
</script>
