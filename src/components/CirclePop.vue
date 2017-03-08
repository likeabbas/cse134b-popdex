<template>
<div class="col s4">
          <div class=circle>
            <img alt="" v-bind:src="defaultImg" width=150 height=150> 
            <p class="userItemName">{{item.name}}</p>
            <p class="topTextCircle">{{item.brand}}</p>
            <p class=bottomTextCirlce>{{item.price}}</p>
            <a v-on:click="$emit('remove')" class="btn waves-effect waves-light btn">Delete Item</a>
          </div>
</div>
</template>

<script>
export default {
  props: ['item', 'uid', 'deleteItemParent'],
  data: function () {
    return {
      defaultImg: this.item.picture_src
    }
  },
  methods: {
    deleteItem: function (itemUid) {
      this.deleteItemParent(itemUid)
    }
  }
}
</script>
