<template>
<div class="col s4">
  <div class=circle style="text-align:center">

    <router-link class="routerblack" 
      :brandName="item.brand"
      :item="item"
      :to="{name: 'item', params: {itemId: item.uid, brandName: item.brand, item: item, brand: item.brand, uid: item.uid}}"
      >

    <img alt="" v-bind:src="defaultImg" width=150 height=150> 
    <p class="userItemName">{{item.name}}</p>
    <p class="topTextCircle">{{item.brand}}</p>
    <p class=bottomTextCirlce>{{item.price}}</p>

    </router-link>
    
    <a v-on:click="$emit('remove')" class="btn waves-effect waves-light btn">Delete Item</a>
  </div>
</div>
</template>

<script>
export default {
  props: ['item'],
  data: function () {
    return {
      defaultImg: this.item.picture_src
    }
  }
}
</script>
