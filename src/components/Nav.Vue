<template>
  <div>
  <nav>
    <div id="header" class="nav-wrapper">
    
          <a href="#" class="brand-logo">PopDex!&nbsp;&nbsp;<small>The Definitive Guide!</small></a>
          <ul v-if="!isAuthenticated" class="right hide-on-med-and-down">
            <li><a v-on:click="showLoginModal = true" >Login</a></li>
            <li><a v-on:click="showSignUpModal = true">Signup</a></li>
          </ul>
          <ul v-else class="right hide-on-med-and-down">
            <li>Hello {{this.sharedState.state.auth.user.email}}</li>
            <li><a v-on:click="showSignOutModal = true">Sign Out</a></li>
          </ul>
    </div>
  </nav>

  <div id="navigator">
    <div href="">The Guide</div>
    <div v-on:click="goToMyStuff">My Stuff</div>
    <div href="">News</div>
  </div>
  <SignUp v-if="showSignUpModal" @close="showSignUpModal = false"></SignUp>
  <Login v-if="showLoginModal" @close="showLoginModal = false"></Login>
</div>
</template>

<script>
import SignUp from './SignUp'
import store from '../storage'
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
      this.sharedState.firebase.auth().onAuthStateChanged(function (user) {
        console.log('onAuthStateChanged')
        if (user) {
          this.sharedState.state.auth.user = user
          this.sharedState.state.userlink =
            this.sharedState.state.auth.user.uid
        } else {
          this.sharedState.state.auth.user = null
          this.shared.state.userlink = null
        }
      }.bind(this))
      return (this.sharedState.state.auth.user !== null)
    }
  },
  watch: {
    showSignUpModal: function (val) {
      console.log(this.sharedState.state.auth)
    }
  },
  methods: {
    goToMyStuff: function (event) {
      if (!this.isAuthenticated) {
        this.showLoginModal = true
        return
      }
      console.log(this.sharedState.state.auth)
      router.push({name: 'ProfilePage', params: {id: this.sharedState.state.userlink}})
    }
  }
}

</script>
