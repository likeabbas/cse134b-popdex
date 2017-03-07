<template>
   <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class="container modal-container">
        <h4>Welcome Back to PopDex!</h4>
        <form>
        <input v-model:email="email" type="email" placeholder="Email Address" name=username><br>
        <input v-model:text="password" type="password" placeholder="Password" name=password><br>
        </form>
        <a class="waves-effect waves-light btn" v-on:click="googleLogin">Google Sign In</a>
        <a class="waves-effect waves-light btn" v-on:click="loggingIn">Log In</a>
        <a class="waves-effect waves-light btn">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../storage'
  import LoginService from '../service'
  function googleLogin () {
    var vm = this
    var provider = new vm.sharedState.firebase.auth.GoogleAuthProvider()
    vm.sharedState.firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        console.log('successfully logged in google')
        vm.sharedState.state.auth.credential = result.credential
        vm.sharedState.state.auth.user = result.user
      }).catch(function (error) {
        alert(error.message)
        /* var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential; */
      })
  }

  function loggingIn () {
    var fb = this.sharedState.firebase
    var auth = this.sharedState.state.auth
    var vm = this

    var loginService = new LoginService()
    if (!loginService.validateEmail(this.email)) {
      alert('Email address not valid!')
      return
    }
    if (!loginService.passwordSecurity(this.password)) {
      alert('Password does not meet security requirements')
      return
    }

    fb.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(function (data) {
        console.log('Succesfully logged in')
        console.log(data)
        vm.sharedState.state.auth.email = vm.email
        vm.sharedState.state.auth.user = fb.auth().currentUser
        vm.$emit('close')
      }).catch(function (error) {
        auth.message = error.message
        auth.hasErrors = true
        alert(error.message)
      })
  }

  export default {
    name: 'Login',
    data: function () {
      return {
        sharedState: store,
        email: '',
        password: '',
        firebase: store.firebase
      }
    },
    methods: {
      loggingIn: loggingIn,
      googleLogin: googleLogin
    }
  }
</script>
