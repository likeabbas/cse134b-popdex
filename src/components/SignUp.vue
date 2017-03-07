<template>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class="container modal-container">
        <h4>Sign up, it's easy!</h4>
        <form>
          <input type=text placeholder="Email Address" name=email><br>
          <input type=text placeholder=Username name=username><br>
          <input type=text placeholder=Password name=password><br>
          <input type=text placeholder="Retype Password" name=retypedPassword><br>
        </form>
        <button class="waves-effect waves-light btn" v-on:click="signingUp(); $emit('close')">Sign Up</button>
      </div>
    </div>
  </div>
  
</template>


<script>
  function signingUp (event) {
    console.log('gay')
    // Routing to the profile page
  }

  export default {
    name: 'SignUp',
    methods: {
      signingUp: signingUp
    }
  }
</script>
