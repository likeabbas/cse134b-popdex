<template>
<div class="content container">

    <div class="row">
      
      <div class=preContent id="userStuff">
      
        <div class="col s4">
          <div class=userCollectionWishlistBox>
            <h5>{{username}}'s Stuff</h5>
            <a class="waves-effect waves-light btn">Wish List</a>            
            <a class="waves-effect waves-light btn">Collection</a>
          </div>
        </div>

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
                  <option v-for="option in brandOptions" v-bind:value="option">
                    {{option}}
                  </option>
                </select>
                <span>Selected: {{selectedBrand}}</span>
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
      <CirclePop v-for="(item, index) in items" v-bind:item="item" 
                 v-bind:uid="item.uid" 
                 v-bind:deleteItemParent="deleteItem"
                 v-on:remove="deleteItem(index, item.uid)"
                 :key="item.uid">
      </CirclePop>
    </div>

    </div>

  </div>
</template>

<script>
  import CirclePop from '@/components/CirclePop'
  import store from '../storage'
  import UserService from '../userservice'

  export default {
    components: { CirclePop },
    name: 'ProfilePage',
    data () {
      return {
        sharedState: store,
        selectedBrand: '',
        username: store.state.auth.user.displayName,
        dataLoaded: true,
        items: {}
      }
    },
    computed: {
      brandOptions: function () {
        return ['All Brands', 'Adventure Time', 'TMNT']
      }
    },
    watch: {
      selectedBrand: function (oldvalue, newvalue) {
        console.log('in watch function')
        console.log('oldValue ' + oldvalue)
        console.log('newValue ' + newvalue)
        var userService = new UserService()
        var vm = this
        userService.getPops(this.sharedState.firebase).then(function (data) {
          console.log('got the pops\n' + JSON.stringify(data.val()))
          var pops = data.val()
          vm.items = Object.keys(pops).map(function (key) {
            var pop = pops[key]; pop.uid = key; return pop
          })
          console.log('items\n' + JSON.stringify(vm.items))
        })
      }
    },
    methods: {
      deleteItem: function (index, itemUid) {
        console.log('in this function')
        // var userService = new UserService()
        // userService.deleteItemDB(this.sharedState.firebase, itemUid)
        var firebase = this.sharedState.firebase
        var user = firebase.auth().currentUser
        console.log('/users/' + user.uid + '/pops/' + itemUid)
        firebase.database().ref('/users/' + user.uid + '/pops/' + itemUid).set(null)
        this.items.splice(index, 1)
      }
    }

      /* methods: {
        brandChange: function () {
          console.log('brand changed to ' + this.selectedBrand)
          if (this.selectedBrand === 'TMNT') {
            this.items.push({
              name: 'John Doe',
              price: '$15',
              brand: 'Hell',
              img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Penguins_walking_-Moltke_Harbour,_South_Georgia,_British_overseas_territory,_UK-8.jpg/220px-Penguins_walking_-Moltke_Harbour,_South_Georgia,_British_overseas_territory,_UK-8.jpg'
            })
          }
        }
      } */
}
</script>
