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
        <a class="waves-effect waves-light btn" @click="$emit('close')">Sign Up</a>
      </div>
    </div>
  </div>
  
</template>


<script>
  export default {
    name: 'SignUp'
  }
</script>
