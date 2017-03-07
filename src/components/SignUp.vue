<template>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class="container modal-container">
        <h4>Sign up, it's easy!</h4>
        <form>
          <input v-model:email="tmpAuth.email" type="email" placeholder="Email Address" name=email><br>
          <input v-model:text="tmpAuth.password" placeholder="Password" name=password><br>
          <input v-model:text="tmpAuth.confirmedPass" placeholder="Retype Password" name=retypedPassword><br>
        </form>
        <button class="waves-effect waves-light btn" v-on:click="signingUp()">Sign Up</button>
        <button id="signupClose" ref="signupClose" class="waves-effect waves-light btn" v-on:click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
  
</template>


<script>
  import store from '../storage'
  import LoginService from '../service'

  function signingUp (event) {
    // Routing to the profile page
    console.log(this.tmpAuth)
    var loginService = new LoginService()
    var vm = this
    var auth = vm.tmpAuth
    if (!loginService.validateEmail(vm.tmpAuth.email)) {
      alert('Email address not valid!')
      return
    }
    if (!loginService.validatePassword(vm.tmpAuth.password, vm.tmpAuth.confirmedPass)) {
      alert('Passwords are invalid or do not match.')
      return
    }
    vm.sharedState.firebase.auth().createUserWithEmailAndPassword(auth.email, auth.password)
      .then(function (data) {
        console.log('Successfully created user with email and password')
        vm.sharedState.state.auth.user = vm.sharedState.firebase.auth().currentUser
        console.log('current user: ' + vm.sharedState.state.auth.user)
      }).catch(function (error) {
        console.log('error in sign up')
        vm.sharedState.state.auth.message = error.message
        vm.sharedState.state.auth.hasErrors = true
        alert(error.message)
      })
    vm.$emit('close')
  }

  export default {
    name: 'SignUp',
    methods: {
      signingUp: signingUp
    },
    data: function () {
      return {
        sharedState: store,
        tmpAuth: {
          user: null,
          email: '',
          password: '',
          confirmedPass: '',
          message: '',
          hasErrors: false
        }
      }
    }
  }
</script>
