<template>
  <div>
  <nav>
    <div id="header" class="nav-wrapper">
    
          <a href="#" class="brand-logo">PopDex!&nbsp;&nbsp;<small>The Definitive Guide!</small></a>
          <ul v-if="isAuthenticated" class="right hide-on-med-and-down">
            <li><a v-on:click="showLoginModal = true" >Login</a></li>
            <li><a v-on:click="showSignUpModal = true">Signup</a></li>
          </ul>
    </div>
  </nav>

  <div id="navigator">
    <a href="">The Guide</a>
    <a href="">My Stuff</a>
    <a href="">News</a>
  </div>
  <SignUp v-if="showSignUpModal" @close="showSignUpModal = false"></SignUp>
  <Login v-if="showLoginModal" @close="showLoginModal = false"></Login>
</div>
</template>

<script>
import SignUp from './SignUp'
import store from '../storage'
import Login from './Login'
export default {
  name: 'nav',
  components: { SignUp, Login },
  data () {
    return {
      showSignUpModal: false,
      showLoginModal: false,
      sharedState: store
    }
  },
  computed: {
    isAuthenticated: function () {
      this.sharedState.firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.sharedState.state.auth.user = user
        } else this.sharedState.state.auth.user = null
      }.bind(this))
      return (this.sharedState.state.auth.user !== null)
    }
  },
  watch: {
    showSignUpModal: function (val) {
      console.log(this.sharedState.state.auth)
    }
  }
}

</script>
