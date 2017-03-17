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
                  <option disabled value="">Brands</option>
                  <option v-for="option in brandOptions[gallery]" v-bind:value="option">
                    {{option}}
                  </option>
                </select>
              </div>

              <div id="sort-selector" class="input-field col s4">
                <select v-model="sortSelect" class="browser-default">
                  <option disabled value="">Sort By</option>
                  <option v-for="(option, index) in sortOptions" 
                          v-bind:value="index"
                          value="price">
                    {{option[0]}}
                  </option>
                </select>
              </div>
          </form>
          </div>
    </div>
      
    <div v-if="dataLoaded" class="userMainContent row">

      <CirclePop v-for="(item, index) in displayedItems"
                 v-bind:item="item" 
                 v-on:remove="deleteItem(index)"
                 :key="item.uid">
      </CirclePop>

    </div>

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
        selectedBrand: 'All Brands',
        username: store.state.auth.user.displayName,
        dataLoaded: false,
        gallery: 'collection',
        items: [],
        wishlist: [],
        displayedItems: [],
        displayedBrands: [],
        brandOptions: {'collection': ['All Brands'], 'wishlist': ['All Brands']},
        sortOptions: [['Name (A-Z)', {attr: 'name', ascending: true}],
                      ['Name (Z-A)', {attr: 'name', ascending: false}]],
        sortSelect: 0
      }
    },
    created () {
      this.fetchItems('collection')
      this.fetchItems('wishlist')
    },
    watch: {
      selectedBrand: function (value) {
        this.itemUpdate()
      },
      sortSelect: function (value) {
        var vm = this
        vm.displayedItems = vm.sortItems(vm.displayedItems)
      }
    },
    methods: {
      deleteItem: function (index) {
        var vm = this
        console.log('in delete')
        // var userService = new UserService()
        // userService.deleteItemDB(this.sharedState.firebase, itemUid)
        /* var firebase = this.sharedState.firebase
        var user = firebase.auth().currentUser */

        // delete from database
        /* firebase.database().ref('/users/' + user.uid + '/pops/' + this.selectedBrand + '/' + itemUid).set(null) */
        var item = vm.displayedItems[index]
        UserService.deleteItemDB(vm.sharedState.firebase, item.brand, vm.gallery, item.uid)

        // remove from view
        vm.displayedItems.splice(index, 1)
      },
      fetchItems (type) {
        var vm = this
        var fetch = UserService.getItems(vm.sharedState.firebase, 'pops', type)
        if (fetch !== null) {
          var list
          if (type === 'collection') {
            list = vm.items
          } else if (type === 'wishlist') {
            list = vm.wishlist
          }
          fetch.on('child_added', function (data) {
            console.log('child data\nkey: ' + data.key + '\ndata: ' + JSON.stringify(data.val()))
            var objList = Object.keys(data.val()).map(function (key, idx) {
              var obj = data.val()[key]
              obj['uid'] = key
              obj['brand'] = data.key
              return obj
            })
            list[data.key] = objList
            vm.brandOptions[type].push(data.key)
          })

          fetch.on('child_changed', function (data) {
            var objList = Object.keys(data.val()).map(function (key, idx) {
              var obj = data.val()[key]
              obj['uid'] = key
              obj['brand'] = data.key
              return obj
            })
            list[data.key] = objList
          })
        }
      },
      collectionDisplay () {
        this.gallery = 'collection'
        this.selectedBrand = this.brandOptions[this.gallery][0]
        this.itemUpdate()
      },
      wishlistDisplay () {
        this.gallery = 'wishlist'
        this.selectedBrand = this.brandOptions[this.gallery][0]
        this.itemUpdate()
      },
      sortItems (list) {
        var vm = this
        var sortOption = vm.sortOptions[vm.sortSelect][1]['attr']
        var ascending = vm.sortOptions[vm.sortSelect][1]['ascending']

        if (sortOption === 'name') {
          return list.sort(function (a, b) {
            if (ascending) {
              return a.name.localeCompare(b.name)
            } else {
              return b.name.localeCompare(a.name)
            }
          })
        }
      },
      itemUpdate () {
        var vm = this
        var list
        if (vm.gallery === 'collection') {
          list = vm.items
        } else if (vm.gallery === 'wishlist') {
          list = vm.wishlist
        }

        if (vm.selectedBrand === 'All Brands') {
          vm.displayedItems = []
          for (var prop in list) {
            for (var idx = 0; idx < list[prop].length; idx++) {
              console.log(list[prop][idx])
              vm.displayedItems.push(list[prop][idx])
            }
          }
          // console.log(vm.displayedItems)
        } else {
          vm.displayedItems = list[vm.selectedBrand]
        }

        if (vm.displayedItems !== undefined) {
          vm.displayedItems = vm.sortItems(vm.displayedItems)
          vm.dataLoaded = true
        } else {
          vm.dataLoaded = false
        }
        console.log(vm.displayedItems)
      }
    }
}
</script>
