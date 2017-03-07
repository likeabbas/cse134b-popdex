<template>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class="container modal-container">
        <h4>Sign up, it's easy!</h4>
        <form>
          <input v-model:email="tmpAuth.email" type="email" placeholder="Email Address" name=email><br>
          <input v-model:text="tmpAuth.user" placeholder=Username name=username><br>
          <input v-model:text="tmpAuth.password" placeholder=Password name=password><br>
          <input v-model:text="tmpAuth.confirmedPass" placeholder="Retype Password" name=retypedPassword><br>
        </form>
        <button class="waves-effect waves-light btn" v-on:click="signingUp()">Sign Up</button>
        <button class="waves-effect waves-light btn" v-on:click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
  
</template>


<script>
  import store from '../storage'
  function validateEmail (email) {
    if (email.length > 0) {
      return true
    }
    return false
  }

  function validatePassword (pass, confirmed) {
    if (pass.length > 0 && pass === confirmed) {
      return true
    }
    return false
  }
  function validateUsername (uname) {
    if (uname.length > 0) {
      return true
    }
    return false
  }
  function signingUp (event) {
    // Routing to the profile page
    console.log(this.tmpAuth)
    var vm = this
    var auth = vm.tmpAuth
    if (!validateEmail(vm.tmpAuth.email)) {
      alert('Email address not valid!')
      return
    }
    if (!validatePassword(vm.tmpAuth.password, vm.tmpAuth.confirmedPass)) {
      alert('Passwords are invalid or do not match.')
      return
    }
    if (!validateUsername(vm.tmpAuth.user)) {
      alert('Invalid username')
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
          userName: '',
          hasErrors: false
        }
      }
    }
  }
</script>
