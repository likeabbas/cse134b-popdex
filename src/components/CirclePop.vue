<template>
<div class="col s4">
          <div class=circle>
            <img alt="" v-bind:src="item.picture_src" width=150 height=150> 
            <p class="userItemName">{{item.name}}</p>
            <p class=bottomTextCirlce>{{item.price}}</p>
          </div>
</div>
</template>

<script>
export default {
  props: ['item']
}
</script>
