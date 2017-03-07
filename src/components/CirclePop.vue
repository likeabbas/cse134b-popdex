<template>
<div class="col s4">
          <div class=circle>
            <img alt="" :src="item.img" width=150 height=150> 
            <p class="topTextCircle">{{item.name}}</p>
            <p class=bottomTextCirlce>{{item.price}}</p>
          </div>
</div>
</template>

<script>
export default {
  props: ['item']
}
</script>
