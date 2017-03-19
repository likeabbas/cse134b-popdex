<template>
  <div class="content container" style="margin-top: 50px">
    <div class="row" style="margin: auto">
      
      <div class="col s6">

        <ItemView v-if="displayItem"  
          v-bind:itemBrand="brand" 
          v-bind:itemName="itemData.name" 
          v-bind:itemPictureSource="itemData.picture_src">
        </ItemView>

        <div v-if="!owned">
          <a v-on:click="addToCollection" class="waves-effect waves-light btn">Add to Collection</a>

          <a v-if="!wanted" v-on:click="addToWishlist" class="waves-effect waves-light btn">Add to Wishlist</a>
          <a v-else v-on:click="removeFromWishlist" class="waves-effect waves-light btn">Remove from Wishlist</a> 
        </div>

        <div v-else>
          <a v-on:click="removeFromCollection" class="waves-effect waves-light btn">Remove From Collection</a>
        </div>

      </div>

      <div class="col s3" style="margin-top: 60px; font-size: 20p; margin-left: 80px">
        <br><br><br><br>

        <table>
          <tr>
            <td>Market Price</td>
            <td style="font-style: italic">{{itemData.price}}</td>
          </tr>
          <tr>
            <td>Edition Size</td>
            <td style="font-style: italic">{{itemData.edition}}</td>
          </tr>
          <tr v-if="owned">
            <td>Quantity</td>
            <td>{{itemData.quantity}}</td>
            <td><button class="btn" v-on:click="showUpdateQuantityModal = true">Update</button></td>
          </tr>
        </table>
      </div>
    </div>
  <UpdateQuantity v-bind:item="itemData" v-bind:brand="brand" v-bind:uid="uid" v-if="showUpdateQuantityModal" @close="showUpdateQuantityModal = false"></UpdateQuantity>
  </div>
  
</template>

<script>
  import ItemView from './SpecificItemComponents/ItemView'
  import UpdateQuantity from './SpecificItemComponents/UpdateQuantity'
  import store from '../services/storage'
  import UserService from '../services/userservice'

  export default {
    name: 'SpecificItem',
    props: ['brand', 'item', 'uid'],
    components: {
      ItemView, UpdateQuantity
    },
    data () {
      return {
        owned: false,
        wanted: false,
        sharedState: store,
        showUpdateQuantityModal: false,
        itemData: this.item,
        displayItem: false
      }
    },
    created () {
      var vm = this
      var user = vm.sharedState.firebase.auth().currentUser

      if (vm.itemData === undefined || vm.itemData === null) {
        var brandName = vm.$route.params.brandName
        var itemId = vm.$route.params.itemId
        vm.itemData = vm.sharedState.state.brands[brandName][itemId]
      }

      vm.displayItem = true

      if (user === null || user === undefined) {
        return
      }
      this.checkStatus(user, 'collection')
      this.checkStatus(user, 'wishlist')
    },
    watch: {
      showUpdateQuantityModal: function (val) {}
    },

    methods: {
      checkStatus (user, gallery) {
        var vm = this

        UserService.checkForItem(vm.sharedState.firebase, user, vm.brand, vm.uid, gallery)

        .then(function (data) {
          if (data.exists()) {
            if (gallery === 'collection') {
              vm.owned = true
            } else if (gallery === 'wishlist') {
              vm.wanted = true
            }
          } else {
            if (data.exists()) {
              if (gallery === 'collection') {
                vm.owned = false
              } else if (gallery === 'wishlist') {
                vm.wanted = false
              }
            }
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

        UserService.modifyCollection(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.itemData, 'add')
        UserService.updateQuantity(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.itemData, 1)
        vm.owned = true
      },

      removeFromCollection () {
        var vm = this
        var user = vm.sharedState.firebase.auth().currentUser

        if (user === null || user === undefined) {
          alert('Not logged in')
          return
        }

        UserService.modifyCollection(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.itemData, 'remove')
        vm.owned = false
      },

      addToWishlist () {
        var vm = this
        var user = vm.sharedState.firebase.auth().currentUser

        if (user === null || user === undefined) {
          alert('Not logged in')
          return
        }

        UserService.modifyWishlist(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.itemData, 'add')
        vm.wanted = true
      },
      removeFromWishlist () {
        var vm = this
        var user = vm.sharedState.firebase.auth().currentUser

        if (user === null || user === undefined) {
          alert('Not logged in')
          return
        }

        UserService.modifyWishlist(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.itemData, 'remove')
        vm.wanted = false
      }
    }
  }
</script>
