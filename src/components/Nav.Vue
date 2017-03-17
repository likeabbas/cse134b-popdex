<template >
  <div>

  <nav>
    <div id="header" class="nav-wrapper">
    
          <a href="#" class="brand-logo">PopDex!&nbsp;&nbsp;<small>The Definitive Guide!</small></a>

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
      <router-link to="/guide">The Guide</router-link>
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

export default {
  name: 'nav',
  components: { SignUp, Login },
  data () {
    return {
      showSignUpModal: false,
      showLoginModal: false,
      showSignOutModal: false,
      sharedState: store,
      router: router
    }
  },

  computed: {
    isAuthenticated: function () {
      var vm = this
      vm.sharedState.firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          vm.sharedState.state.auth.user = user
          vm.sharedState.state.userlink =
          vm.sharedState.state.auth.user.uid
        } else {
          vm.sharedState.state.auth.user = null
          vm.sharedState.state.userlink = null
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
