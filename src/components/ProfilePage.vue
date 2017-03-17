<template>
<div class="content container">

    <div class="row">
      
      <div class=preContent id="userStuff">
      
        <div class="col s4">
          <div class=userCollectionWishlistBox>
            <h5>{{username}}'s Stuff</h5>
            <a v-on:click="collectionDisplay" class="waves-effect waves-light btn">Collection</a>            
            <a v-on:click="wishlistDisplay"class="waves-effect waves-light btn">Wishlist</a>
          </div>
        </div>

        <div class="col s12">
          <form>  

            <div class="input-field col s4">
              <input type=text name=filterSearch placeholder="Filter Search">
            </div>

            <div id="brand-selector" class="input-field col s4">
              <select v-model="selectedBrand" class="browser-default">
                <option v-for="option in brandOptions[gallery]" v-bind:value="option">
                  {{option}}
                </option>
              </select>
            </div>

            <div id="sort-selector" class="input-field col s4">
              <select class="browser-default">
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>
          
          </form>
        </div>      
    </div>
      
    <div v-if="dataLoaded" class="userMainContent row">
      <div v-for="(obj, brand) in displayedItems">

      <CirclePop v-for="(item, key) in obj"
                 v-bind:item="item" 
                 v-on:remove="deleteItem(key)"
                 :key="key">
      </CirclePop>

      </div>
    </div>
  </div>
</div>
</template>

<script>
  import CirclePop from '@/components/ProfileComponents/CirclePop'
  import store from '../services/storage'
  import UserService from '../services/userservice'

  export default {
    components: { CirclePop },
    name: 'ProfilePage',
    data () {
      return {
        sharedState: store,
        selectedBrand: '',
        username: store.state.auth.user.displayName,
        dataLoaded: false,
        gallery: 'collection',
        items: [],
        wishlist: [],
        displayedItems: {},
        displayedBrands: [],
        brandOptions: ['All Brands']
      }
    },
    created () {
      this.fetchItems('collection')
      this.fetchItems('wishlist')
    },
    watch: {
      selectedBrand: function (value) {
        console.log('in watch function')
        console.log('value ' + value)
        var vm = this
        var list

        if (vm.gallery === 'collection') {
          list = vm.items
        } else if (vm.gallery === 'wishlist') {
          list = vm.wishlist
        }

        if (value === 'All Brands') {
          for (var prop in vm.items) {
            console.log(prop)
            console.log(vm.items[prop])
            vm.$set(vm.displayedItems, prop, list[prop])
          }
        } else {
          vm.displayedItems = {}
          vm.$set(vm.displayedItems, value, list[value])
        }

        if (vm.displayedItems !== undefined) {
          vm.dataLoaded = true
        } else {
          vm.dataLoaded = false
        }
        console.log(vm.displayedItems)
      }
    },
    methods: {
      deleteItem: function (itemUid) {
        console.log('in this function')
        // var userService = new UserService()
        // userService.deleteItemDB(this.sharedState.firebase, itemUid)
        var firebase = this.sharedState.firebase
        var user = firebase.auth().currentUser
        console.log('/users/' + user.uid + '/pops/' + itemUid)

        // delete from database
        /* firebase.database().ref('/users/' + user.uid + '/pops/' + this.selectedBrand + '/' + itemUid).set(null) */
        UserService.deleteItemDB(firebase, this.selectedBrand, itemUid)

        // remove from view
        this.$delete(this.items, itemUid)
      },
      fetchItems (type) {
        var vm = this
        var fetch = UserService.getItems(vm.sharedState.firebase, 'pops', type)
        if (fetch !== null) {
          var list
          if (vm.brandOptions[type] === undefined) {
            vm.brandOptions[type] = []
          }
          if (type === 'collection') {
            list = vm.items
          } else if (type === 'wishlist') {
            list = vm.wishlist
          }
          fetch.on('child_added', function (data) {
            console.log('child data\nkey: ' + data.key + '\ndata: ' + JSON.stringify(data.val()))
            list[data.key] = data.val()
            vm.brandOptions[type].push(data.key)
          })

          fetch.on('child_changed', function (data) {
            console.log('child changed\nkey: ' + data.key + '\ndata: ' + JSON.stringify(data.val()))
            list[data.key] = data.val()
          })
        }
      },
      collectionDisplay () {
        this.gallery = 'collection'
        this.selectedBrand = this.brandOptions[this.gallery][0]
      },
      wishlistDisplay () {
        this.gallery = 'wishlist'
        this.selectedBrand = this.brandOptions[this.gallery][0]
      }
    }
}
</script>
