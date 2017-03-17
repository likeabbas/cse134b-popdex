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

<<<<<<< HEAD
        <!--<div class="col s8">
          <form>
            <p>
              <input type="checkbox" id="check1" />
              <label for="test5">You</label>
            </p>
              <p>
              <input type="checkbox" id="check2" />
              <label for="test5">There</label>
            </p>
              <p>
              <input type="checkbox" id="check3" />
              <label for="test5">Hey</label>
            </p>
          </form></div> -->
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
=======
        <div class="col s12">
          <form>  
>>>>>>> cba623cc50363ff07a96f883ea0dd74ac2868cf1

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
        selectedBrand: '',
        username: store.state.auth.user.displayName,
        dataLoaded: false,
        gallery: 'collection',
        items: [],
        wishlist: [],
        displayedItems: [],
        displayedBrands: [],
        brandOptions: {'collection': [], 'wishlist': []},
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
        console.log('in watch function')
        console.log('value ' + value)
        var vm = this
        var list
        if (value === 'Brands') {
          vm.displayedItems = []
          return
        }
        if (vm.gallery === 'collection') {
          list = vm.items
        } else if (vm.gallery === 'wishlist') {
          list = vm.wishlist
        }

        if (value === 'All Brands') {
          for (var prop in list) {
            console.log(prop)
            vm.displayedItems.concat(list[prop])
          }
        } else {
          var objs = vm.sortItems(list[value])
          vm.displayedItems = objs
        }

        if (vm.displayedItems !== undefined) {
          vm.dataLoaded = true
        } else {
          vm.dataLoaded = false
        }
        console.log(vm.displayedItems)
      },
      sortSelect: function (value) {
        var vm = this
        vm.displayedItems = vm.sortItems(vm.displayedItems)
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
              return obj
            })
            list[data.key] = objList
            vm.brandOptions[type].push(data.key)
          })

          fetch.on('child_changed', function (data) {
            var objList = Object.keys(data.val()).map(function (key, idx) {
              var obj = data.val()[key]
              obj['uid'] = key
              return obj
            })
            list[data.key] = objList
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
      }
    }
}
</script>
