<template>
<div>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class="container modal-container">
        <h4>Update Item Quantity</h4>
        <form>
          <input v-model:text="newQuantity" id="inputQuantity" ref="inputQuantity" type="text" placeholder="Quantity" name=quantity><br>
        </form>
        <button class="waves-effect waves-light btn modalBtn" v-on:click="updateQuantity()">Update</button>
        <button id="updateModalClose"  class="waves-effect waves-light btn modalBtn" v-on:click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import store from '../../services/storage'
  import UserService from '../../services/userservice'

  export default {
    name: 'UpdateQuantity',
    props: ['brand', 'item', 'uid'],
    data () {
      return {
        sharedState: store,
        newQuantity: 1
      }
    },
    methods: {
      updateQuantity () {
        var vm = this
        var user = vm.sharedState.firebase.auth().currentUser
        var quantity = this.$refs.inputQuantity.value
        if (!isNaN(quantity) && parseInt(quantity) > 0) {
          UserService.updateQuantity(vm.sharedState.firebase, user, vm.brand, vm.uid, vm.item, vm.$refs.inputQuantity.value)
        }

        vm.$emit('close')
      }
    }
  }
</script>
