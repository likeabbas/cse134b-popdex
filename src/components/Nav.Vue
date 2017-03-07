<template>
  <div>
  <nav>
    <div id="header" class="nav-wrapper">
    
          <a href="#" class="brand-logo">PopDex!&nbsp;&nbsp;<small>The Definitive Guide!</small></a>
          <ul class="right hide-on-med-and-down">
            <li><a >Login</a></li>
            <li><a @click="showSignUpModal = true">Signup</a></li>
          </ul>
    </div>
  </nav>

  <div id="navigator">
    <a href="">The Guide</a>
    <a href="">My Stuff</a>
    <a href="">News</a>
  </div>
  <SignUp v-if="showSignUpModal" @close="showSignUpModal = false"></SignUp>
</div>

</template>

<script>
import SignUp from './SignUp'

export default {
  name: 'nav',
  components: { SignUp },
  data () {
    return {
      showSignUpModal: false,
      showLogInModal: false
    }
  }
}
</script>
