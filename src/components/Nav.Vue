<template >
  <div>

  <nav>
    <div id="header" class="nav-wrapper">
    
          <a href="#" class="brand-logo">PopDex!&nbsp;&nbsp;<small>The Definitive Guide</small></a>

          <ul v-if="!isAuthenticated" class="right hide-on-med-and-down">
            <li><a v-on:click="showLoginModal = true" >Login</a></li>
            <li><a v-on:click="showSignUpModal = true">Signup</a></li>
          </ul>

          <ul v-else class="right hide-on-med-and-down">
            <li>Hello {{this.sharedState.state.auth.user.displayName}}</li>
            <li><router-link to="/"><span v-on:click="signOut($event)">Sign Out</span></router-link></li>
          </ul>

    </div>
  </nav>

  <div id="navigator">
    <div>
      <router-link class="routerblack" to="/guide">The Guide</router-link>
    </div>

    <div v-on:click="goToMyStuff">My Stuff</div>
    <div v-on:click="news()">News</div>
  </div>

  <SignUp v-if="showSignUpModal" @close="showSignUpModal = false"></SignUp>
  <Login v-if="showLoginModal" @close="showLoginModal = false"></Login>

</div>
</template>

<script>
import SignUp from './SignUp'
import store from '../services/storage'
import Login from './Login'
import router from '../router/index'
import UserService from '../services/userservice'

export default {
  name: 'nav',
  components: { SignUp, Login },
  data () {
    return {
      showSignUpModal: false,
      showLoginModal: false,
      showSignOutModal: false,
      sharedState: store,
      router: router,
      loadUserItems: true
    }
  },
  computed: {
    isAuthenticated: function () {
      var vm = this
      vm.sharedState.firebase.auth()
      .onAuthStateChanged(function (user) {
        if (user !== null) {
          vm.sharedState.state.auth.user = user
          vm.sharedState.state.userlink = user.uid
          if (vm.loadUserItems) {
            vm.fetchUserItems('wishlist')
            vm.fetchUserItems('collection')
            vm.loadUserItems = false
          }
        } else {
          vm.sharedState.state.auth.user = null
          vm.sharedState.state.userlink = null
          vm.sharedState.state.user.collection = []
          vm.sharedState.state.user.wishlist = []
          vm.sharedState.state.user.brandOptions =
            {'collection': ['All Brands'], 'wishlist': ['All Brands']}
          vm.loadUserItems = true
        }
      })
      return (vm.sharedState.state.auth.user !== null)
    }
  },

  watch: {
    showSignUpModal: function (val) {}
  },

  methods: {

    goToMyStuff: function (event) {
      if (!this.isAuthenticated) {
        this.showLoginModal = true
        return
      }
      router.push({name: 'ProfilePage', params: {id: this.sharedState.state.userlink}})
    },
    fetchUserItems (type) {
      var vm = this
      var fetch = UserService.getItems(vm.sharedState.firebase, 'pops', type)
      if (fetch !== null) {
        var list
        if (type === 'collection') {
          list = vm.sharedState.state.user.collection
        } else if (type === 'wishlist') {
          list = vm.sharedState.state.user.wishlist
        }
        var brandOptions = vm.sharedState.state.user.brandOptions[type]
        fetch.on('child_added', function (data) {
          var objList = Object.keys(data.val()).map(function (key, idx) {
            var obj = data.val()[key]
            obj['uid'] = key
            obj['brand'] = data.key
            return obj
          })
          list[data.key] = objList
          vm.sharedState.state.user.brandOptions[type].push(data.key)
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
        fetch.on('child_removed', function (data) {
          // need to remove from brand options and items
          if (type === 'collection') {
            list = vm.sharedState.state.user.collection
          } else if (type === 'wishlist') {
            list = vm.sharedState.state.user.wishlist
          }
          var i = 0
          for (; i < brandOptions.length; i++) {
            if (brandOptions[i] === data.key) {
              break
            }
          }
          brandOptions.splice(i, 1)

          for (i = 0; i < list.length; i++) {
            if (list[data.key][i].uid === data.key) {
              break
            }
          }
          list[data.key].splice(i, 1)
        })
      }
    },
    signOut: function (event) {
      var vm = this

      vm.sharedState.firebase.auth().signOut()
        .then(function () {
          vm.sharedState.state.auth.user = null
        }, function (e) {
          alert(e.message)
        })
    },

    news: function () {
      alert('Stay Tuned for More Features, Coming Soon!')
    }
  }
}

</script>
