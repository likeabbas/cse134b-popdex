<template>
   <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class="container modal-container">
        <h4>Welcome Back to PopDex!</h4>
        <form>
        <input v-model:email="email" type="email" placeholder="Email Address" name=username><br>
        <input v-model:text="password" type="password" placeholder="Password" name=password><br>
        </form>
        <a class="waves-effect waves-light btn modalBtn" v-on:click="googleLogin">Google Sign In</a>
        <a class="waves-effect waves-light btn modalBtn" v-on:click="loggingIn">Log In</a>
        <button id="loginClose" ref="loginClose" class="waves-effect waves-light btn modalBtn" v-on:click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../services/storage'
  import LoginService from '../services/service'
  function googleLogin () {
    var vm = this
    var firebase = vm.sharedState.firebase
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        vm.sharedState.state.auth.credential = result.credential
        vm.sharedState.state.auth.user = result.user
        vm.$emit('close')
      }).catch(function (error) {
        alert(error.message)
      })
  }

  function loggingIn () {
    var vm = this
    var fb = vm.sharedState.firebase
    var auth = vm.sharedState.state.auth

    if (!LoginService.validateEmail(vm.email)) {
      alert('Email address not valid!')
      return
    }
    if (!LoginService.passwordSecurity(vm.password)) {
      alert('Password does not meet security requirements')
      return
    }

    fb.auth().signInWithEmailAndPassword(vm.email, vm.password)
      .then(function (data) {
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
