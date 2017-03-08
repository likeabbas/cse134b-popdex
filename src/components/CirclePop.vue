<template>
<div class="col s4">
          <div class=circle>
            <img alt="" v-bind:src="defaultImg" width=150 height=150> 
            <p class="userItemName">{{item.name}}</p>
            <p class="topTextCircle">{{item.brand}}</p>
            <p class=bottomTextCirlce>{{item.price}}</p>
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
