<template>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class="container modal-container">
        <h4>Sign up, it's easy!</h4>
        <form>
          <input v-model:email="tmpAuth.uname" type="text" placeholder="Username" name=uname><br>
          <input v-model:email="tmpAuth.email" type="email" placeholder="Email Address" name=email><br>
          <input v-model:text="tmpAuth.password" placeholder="Password" type="password" name=password><br>
          <input v-model:text="tmpAuth.confirmedPass" placeholder="Retype Password" type="password" name=retypedPassword><br>
        </form>
        <button class="waves-effect waves-light btn modalBtn" v-on:click="signingUp()">Sign Up</button>
        <button id="signupClose" ref="signupClose" class="waves-effect waves-light btn modalBtn" v-on:click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>


<script>
  import store from '../services/storage'
  import LoginService from '../services/service'
  import UserService from '../services/userservice'

  function signingUp (event) {
    // Routing to the profile page
    var vm = this
    var auth = vm.tmpAuth
    if (!LoginService.validateEmail(vm.tmpAuth.email)) {
      alert('Email address not valid!')
      return
    }
    if (!LoginService.validatePassword(vm.tmpAuth.password, vm.tmpAuth.confirmedPass)) {
      alert('Passwords are invalid or do not match.')
      return
    }
    if (!LoginService.validateUsername(vm.tmpAuth.uname)) {
      alert('Username invalid')
      return
    }

    vm.sharedState.firebase.auth()
      .createUserWithEmailAndPassword(auth.email, auth.password)

      .then(function (data) {
        vm.sharedState.state.auth.user = vm.sharedState.firebase.auth().currentUser
        vm.sharedState.state.auth.user.displayName = vm.tmpAuth.uname

        vm.sharedState.state.auth.user.updateProfile({
          displayName: vm.tmpAuth.uname
        })

        .then(function () {
          UserService.writeNewUserAccount(vm.sharedState.state.auth.user,
                                       vm.sharedState.firebase)
          vm.sharedState.state.auth.user
        })

        .catch(function (error) {
          alert(error.message)
        })
      })

      .catch(function (error) {
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
          uname: '',
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
