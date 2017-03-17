<template>
<div class="col s4">
  <router-link :to="{name: 'brand', params: {id: brand.brand}}">
  <div class=circle>
    <p class="topTextCircle franchiseTopText franchiseText">{{brand.brand}} ({{brand.numItems}})</p>
  </div>
  </router-link>
 </div>
</template>

<script>
export default {
  props: ['brand']
}
</script>
