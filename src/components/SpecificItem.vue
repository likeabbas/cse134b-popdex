<template>
  <div class="content container">
    <div class="row">
      
      <div class="col s6">
      <ItemView  
        v-bind:itemBrand="brand" 
        v-bind:itemName="item.name" 
        v-bind:itemPictureSource="item.picture_src">
      </ItemView>
      <div v-if="!owned">
        <a v-on:click="addToCollection" class="waves-effect waves-light btn">Add to Collection</a>
        <a v-on:click="addToWishlist" class="waves-effect waves-light btn">Add to Wish List</a>
      </div>
      <div v-else>
        <a v-on:click="removeFromCollection" class="waves-effect waves-light btn">Remove From Collection</a>
      </div>
      </div>

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
  import UserService from '../userservice'

  export default {
    name: 'SpecificItem',
    props: ['brand', 'item', 'uid'],
    components: {
      ItemView
    },
    data () {
      return {
        owned: false,
        sharedState: store
        // item = this.
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
      this.checkOwned()
    },
    methods: {
      // fetchData: function() {
      //   var vm = this
      //   console.log("in specific item fetch")
      //   FBService.fetchItem(vm.sharedSate.firebase, vm.brandName, vm.item.name).then(function (data) )
      // }
      checkOwned () {
        var vm = this
        var user = vm.sharedState.firebase.auth().currentUser
        if (user === null || user === undefined) {
          return
        }

        UserService.checkForItem(vm.sharedState.firebase, user, vm.brand, vm.uid)
        .then(function (data) {
          if (data.exists()) {
            vm.owned = true
          } else {
            vm.owned = false
          }
        })
      },
      addToCollection () {
        var vm = this
        var user = vm.sharedState.firebase.auth().currentUser
        if (user === null || user === undefined) {
          alert('Not logged in')
          return
        }
        console.log('add to collection ' + vm.uid + ', ' + vm.item.name)
        UserService.modifyCollection(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.item, 'add')
        vm.owned = true
      },
      removeFromCollection () {
        var vm = this
        var user = vm.sharedState.firebase.auth().currentUser
        if (user === null || user === undefined) {
          alert('Not logged in')
          return
        }
        console.log('add to collection ' + vm.uid + ', ' + vm.item.name)
        UserService.modifyCollection(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.item, 'remove')
        vm.owned = false
      },
      addToWishlist () {
        var vm = this
        var user = vm.sharedState.firebase.auth().currentUser
        if (user === null || user === undefined) {
          alert('Not logged in')
          return
        }
        console.log('add to collection ' + vm.uid + ', ' + vm.item.name)
        UserService.modifyWishlist(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.item, 'add')
      }
    }
  }
</script>
