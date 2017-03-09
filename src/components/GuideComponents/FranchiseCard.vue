<template>
<div class="col s4">
  <router-link :to="{name: 'brand', params: {id: brand.brand}}">
  <div class=circle>
    <!--<img alt="" src="img/circle.jpeg" width=150 height=150>-->
    <p class="topTextCircle">{{brand.brand}}</p>
    <p class=bottomTextCirlce>{{brand.numItems}} Pops</p>
  </div>
  </router-link>
 </div>
</template>

<script>
export default {
  props: ['brand']
}
</script>
