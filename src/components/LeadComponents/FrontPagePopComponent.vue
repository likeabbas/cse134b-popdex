<template>
  <div class="col s4">
    <div class="frontPagePopFrame">
      <div class=imageCropper><img alt="" :src="item.picture_src" width="266" height="200" class="circle"></div>
      <div class=frontPagePopFrameText>
        <p class=frontPagePopUniverse>{{item.brand}}</p>
        <p class=frontPagePopName>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FrontPagePopComponent',
    props: ['item']
  }
</script>
