<template>
  <div class="content container" style="margin-top: 50px">
    <div class="row" style="margin: auto">
      
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

      <div class="col s3" style="margin-top: 60px; font-size: 20p; margin-left: 80px">
        <br><br><br><br>

        <table>
          <tr>
            <td>Market Price</td>
            <td style="font-style: italic">{{item.price}}</td>
          </tr>
          <tr>
            <td>Edition Size</td>
            <td style="font-style: italic">{{item.edition}}</td>
          </tr>
          <tr v-if="owned">
            <td>Quantity</td>
            <td>{{item.quantity}}</td>
            <td><button class="btn" v-on:click="showUpdateQuantityModal = true">Update</button></td>
          </tr>
        </table>
      </div>
    </div>
  <UpdateQuantity v-bind:item="item" v-bind:brand="brand" v-bind:uid="uid" v-if="showUpdateQuantityModal" @close="showUpdateQuantityModal = false"></UpdateQuantity>
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
        sharedState: store,
        showUpdateQuantityModal: false
      }
    },
    created () {
      this.checkOwned()
    },
    watch: {
      showUpdateQuantityModal: function (val) {}
    },
    methods: {

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

        UserService.modifyCollection(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.item, 'add')
        UserService.updateQuantity(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.item, 1)
        vm.owned = true
      },

      removeFromCollection () {
        var vm = this
        var user = vm.sharedState.firebase.auth().currentUser

        if (user === null || user === undefined) {
          alert('Not logged in')
          return
        }

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

        UserService.modifyWishlist(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.item, 'add')
      }
    }
  }
</script>
